import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation'
import type { ContactFormErrors } from '@/lib/validation'
import {
  sendContactEmail,
  ContactEmailNotConfiguredError,
} from '@/lib/contact/send-contact-email'
import { getSiteSettings } from '@/lib/content/settings'

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

  const result = contactFormSchema.safeParse(payload)
  if (!result.success) {
    const errors: ContactFormErrors = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0]
      if (typeof field === 'string' && !(field in errors)) {
        errors[field as keyof ContactFormErrors] = issue.message
      }
    }
    return NextResponse.json(
      { ok: false, message: 'Controlla i campi evidenziati.', errors },
      { status: 400 }
    )
  }

  const { website: honeypot, ...values } = result.data

  if (honeypot) {
    // Caught by the honeypot — return success so the bot doesn't adapt its behavior, but skip delivery entirely.
    return NextResponse.json({ ok: true })
  }

  try {
    await sendContactEmail(values)
  } catch (error) {
    console.error('[contact] Invio email fallito:', error)

    if (error instanceof ContactEmailNotConfiguredError) {
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
