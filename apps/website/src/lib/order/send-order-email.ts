import type { OrderFormValues } from '@/lib/validation'

export type SendOrderEmailResult = { delivered: boolean }

/** Destinatario di default delle richieste corso. Sovrascrivibile con `ORDER_TO_EMAIL` (es. per una casella di test in preview). */
export const DEFAULT_ORDER_TO_EMAIL = 'academy@eco-ter.com'

/** Sollevata quando `RESEND_API_KEY` manca in produzione — una richiesta d'acquisto non può essere persa in silenzio, a differenza dello stub di sviluppo qui sotto. */
export class OrderEmailNotConfiguredError extends Error {
  constructor() {
    super('RESEND_API_KEY non configurata in produzione.')
    this.name = 'OrderEmailNotConfiguredError'
  }
}

type OrderContext = {
  /** Titolo risolto dallo slug lato server (mai preso dal client), usato in oggetto e corpo. */
  courseTitle: string
}

/** Intestatario della fattura: ragione sociale per un'azienda, nome e cognome per un privato. */
export function orderClientName(values: OrderFormValues): string {
  return (
    (values.clientType === 'azienda' ? values.companyName : values.fullName) ??
    '—'
  )
}

export function buildOrderSubject(
  values: OrderFormValues,
  { courseTitle }: OrderContext
): string {
  return `Richiesta corso: ${courseTitle} — ${orderClientName(values)}`
}

function line(label: string, value: string | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? `${label}: ${trimmed}` : null
}

export function buildOrderEmailBody(
  values: OrderFormValues,
  { courseTitle }: OrderContext
): string {
  const isCompany = values.clientType === 'azienda'

  const lines = [
    'CORSO RICHIESTO',
    `Titolo: ${courseTitle}`,
    `Slug: ${values.courseSlug}`,
    `Partecipanti: ${values.participants}`,
    '',
    'DATI DI FATTURAZIONE',
    `Tipo cliente: ${isCompany ? 'Azienda' : 'Privato'}`,
    line('Ragione sociale', values.companyName),
    line('Nome e cognome', values.fullName),
    line('Partita IVA', values.vatNumber),
    line('Codice fiscale', values.taxCode),
    line('Codice SDI', values.sdiCode),
    line('PEC', values.pec),
    `Indirizzo: ${values.billingStreet}`,
    `CAP / Città / Provincia: ${values.billingCap} ${values.billingCity} (${values.billingProvince.toUpperCase()})`,
    '',
    'RECAPITI',
    `Email: ${values.email}`,
    `Telefono: ${values.phone}`,
    line('Persona di riferimento', values.referent),
    '',
    'NOTE',
    values.notes?.trim() ? values.notes.trim() : '—',
    '',
    `Consenso privacy: ${values.privacyConsent ? 'sì' : 'no'}`,
    '',
    'Richiesta inviata dal form /ottieni-corso del sito ECO-TER Academy. Nessun pagamento è stato incassato: contattare il cliente per il seguito.',
  ].filter((entry): entry is string => entry !== null)

  return lines.join('\n')
}

/**
 * Stessa strategia di `send-contact-email.ts`: senza `RESEND_API_KEY` la
 * richiesta viene validata e loggata invece che inviata (stub di sviluppo,
 * il form funziona end-to-end in locale senza configurazione esterna), mentre
 * in produzione la stessa mancanza solleva `OrderEmailNotConfiguredError` —
 * così una richiesta reale non sparisce. Il destinatario viene da
 * `ORDER_TO_EMAIL` e ricade su `academy@eco-ter.com`. Resend è importato
 * dinamicamente, solo quando una chiave è davvero configurata.
 */
export async function sendOrderEmail(
  values: OrderFormValues,
  context: OrderContext
): Promise<SendOrderEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.ORDER_TO_EMAIL || DEFAULT_ORDER_TO_EMAIL

  const subject = buildOrderSubject(values, context)
  const text = buildOrderEmailBody(values, context)

  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new OrderEmailNotConfiguredError()
    }
    console.warn(
      `[order] RESEND_API_KEY non configurata — richiesta validata ma non inviata a ${toEmail}.\n${subject}\n${text}`
    )
    return { delivered: false }
  }

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from:
      process.env.CONTACT_FROM_EMAIL ??
      'ECO-TER Academy <onboarding@resend.dev>',
    to: toEmail,
    replyTo: values.email,
    subject,
    text,
  })

  if (error) {
    throw new Error(`Invio email fallito: ${error.message}`)
  }

  return { delivered: true }
}
