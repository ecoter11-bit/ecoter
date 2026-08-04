import { z } from 'zod'

/**
 * Shared by the client form (pre-submit validation, one field at a time on
 * blur) and the `/api/contatti` route handler (full-payload validation on
 * POST) — one schema, so client and server can never silently disagree
 * about what's valid.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Inserisci il tuo nome completo')
    .max(100, 'Nome troppo lungo'),
  company: z.string().trim().max(150, 'Nome azienda troppo lungo').optional(),
  email: z
    .string()
    .trim()
    .min(1, "L'email è obbligatoria")
    .email('Inserisci un indirizzo email valido'),
  phone: z
    .string()
    .trim()
    .max(30, 'Numero di telefono troppo lungo')
    .optional(),
  courseInterest: z.string().trim().max(150).optional(),
  message: z
    .string()
    .trim()
    .min(10, 'Il messaggio deve contenere almeno 10 caratteri')
    .max(2000, 'Messaggio troppo lungo (massimo 2000 caratteri)'),
  privacyConsent: z.boolean().refine((value) => value === true, {
    message: 'Devi accettare la privacy policy per procedere',
  }),
  /**
   * Honeypot — a field real users never see or fill (`display:none`,
   * `tabIndex={-1}`, `aria-hidden`) but naive bots that autofill every
   * input will. Deliberately unconstrained here (any string parses) — the
   * route handler checks it *after* a successful parse and fakes success
   * without sending the email, rather than rejecting with a validation
   * error that would tell an adaptive bot which field to leave alone.
   */
  website: z.string().optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

/** Per-field errors keyed by `ContactFormValues` field name, as returned by the API and consumed by the client form. */
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>
