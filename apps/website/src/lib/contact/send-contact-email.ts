import type { ContactFormValues } from '@/lib/validation'

export type SendContactEmailResult = { delivered: boolean }

/** Thrown when `RESEND_API_KEY` / `CONTACT_TO_EMAIL` are missing in production — a lead must never be silently dropped there, unlike the dev stub below. */
export class ContactEmailNotConfiguredError extends Error {
  constructor() {
    super('RESEND_API_KEY / CONTACT_TO_EMAIL non configurate in produzione.')
    this.name = 'ContactEmailNotConfiguredError'
  }
}

function buildEmailBody(values: ContactFormValues): string {
  const lines = [
    `Nome: ${values.name}`,
    values.company ? `Azienda: ${values.company}` : null,
    `Email: ${values.email}`,
    values.phone ? `Telefono: ${values.phone}` : null,
    values.courseInterest
      ? `Corso/area di interesse: ${values.courseInterest}`
      : null,
    '',
    'Messaggio:',
    values.message,
  ].filter((line): line is string => line !== null)

  return lines.join('\n')
}

/**
 * Delivery is optional in dev only: without `RESEND_API_KEY` +
 * `CONTACT_TO_EMAIL` set, a submission still validates and returns success,
 * it's just logged instead of emailed — the form works end-to-end locally
 * with zero external config (see .env.example). In production the same gap
 * throws `ContactEmailNotConfiguredError` instead, so a real lead is never
 * silently dropped. Resend is imported dynamically, only when a key is
 * actually configured, so the package never loads in the "not configured"
 * path.
 *
 * Swapping providers means changing the body of this one function — SMTP,
 * a CRM webhook, whatever — nothing else in the request path (the route
 * handler, the schema, the form) is Resend-specific.
 */
export async function sendContactEmail(
  values: ContactFormValues
): Promise<SendContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !toEmail) {
    if (process.env.NODE_ENV === 'production') {
      throw new ContactEmailNotConfiguredError()
    }
    console.warn(
      '[contact] RESEND_API_KEY / CONTACT_TO_EMAIL non configurate — richiesta validata ma non inviata via email.',
      { name: values.name, email: values.email }
    )
    return { delivered: false }
  }

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from:
      process.env.CONTACT_FROM_EMAIL ??
      'ECOTER Academy <onboarding@resend.dev>',
    to: toEmail,
    replyTo: values.email,
    subject: `Nuova richiesta informazioni da ${values.name}`,
    text: buildEmailBody(values),
  })

  if (error) {
    throw new Error(`Invio email fallito: ${error.message}`)
  }

  return { delivered: true }
}
