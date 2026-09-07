import { NextResponse } from 'next/server'
import { orderFormSchema } from '@/lib/validation'
import type { OrderFormErrors } from '@/lib/validation'
import {
  sendOrderEmail,
  OrderEmailNotConfiguredError,
} from '@/lib/order/send-order-email'
import { getCourse, getSiteSettings } from '@/lib/content'

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Richiesta non valida.' },
      { status: 400 }
    )
  }

  const result = orderFormSchema.safeParse(payload)
  if (!result.success) {
    const errors: OrderFormErrors = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0]
      if (typeof field === 'string' && !(field in errors)) {
        errors[field as keyof OrderFormErrors] = issue.message
      }
    }
    return NextResponse.json(
      { ok: false, message: 'Controlla i campi evidenziati.', errors },
      { status: 400 }
    )
  }

  const { website: honeypot, ...values } = result.data

  if (honeypot) {
    // Preso dall'honeypot — rispondiamo ok così il bot non adatta il comportamento, ma non inviamo nulla.
    return NextResponse.json({ ok: true })
  }

  /* Il titolo lo risolve il server dallo slug (validato `^[a-z0-9-]+$` dallo
   * schema): il client non può iniettare nell'oggetto dell'email un titolo
   * arbitrario, e uno slug inesistente viene rifiutato prima dell'invio. */
  const course = getCourse(values.courseSlug)
  if (!course || course.status !== 'published') {
    return NextResponse.json(
      {
        ok: false,
        message: 'Corso non trovato.',
        errors: { courseSlug: 'Seleziona un corso valido' } as OrderFormErrors,
      },
      { status: 400 }
    )
  }

  try {
    await sendOrderEmail(values, { courseTitle: course.title })
  } catch (error) {
    console.error('[order] Invio email fallito:', error)

    if (error instanceof OrderEmailNotConfiguredError) {
      const { email, phone } = getSiteSettings()
      return NextResponse.json(
        {
          ok: false,
          message: `Al momento l'invio non è disponibile — scrivici a ${email} o chiama ${phone}.`,
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        ok: false,
        message:
          'Invio non riuscito. Riprova più tardi o scrivici direttamente via email.',
      },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
