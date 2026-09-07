import { z } from 'zod'

/**
 * "Ottieni corso" — richiesta d'acquisto con dati di fatturazione, inviata via
 * email a `ORDER_TO_EMAIL`. Nessun pagamento online: qui si raccolgono solo i
 * dati necessari a emettere la fattura e a ricontattare il cliente.
 *
 * Come `contact.schema.ts`, è condiviso tra form client (validazione
 * pre-submit) e route handler `/api/ottieni-corso` (validazione del payload
 * completo) — un solo schema, così client e server non possono divergere.
 */

export const CLIENT_TYPES = ['azienda', 'privato'] as const
export type ClientType = (typeof CLIENT_TYPES)[number]

/** Campi obbligatori solo per un tipo di cliente: dichiarati opzionali qui e imposti in `superRefine`, così la regola condizionale sta in un punto solo. */
const conditional = (max: number, message: string) =>
  z.string().trim().max(max, message).optional()

const baseOrderSchema = z.object({
  /** Slug del corso richiesto. Il pattern non è cosmetico: lo slug finisce in un `join()` verso `content/courses/<slug>.mdx` lato server. */
  courseSlug: z
    .string()
    .trim()
    .min(1, 'Seleziona il corso da acquistare')
    .max(150, 'Slug corso troppo lungo')
    .regex(/^[a-z0-9-]+$/, 'Corso non valido'),
  clientType: z.enum(CLIENT_TYPES, {
    message: 'Seleziona se sei un’azienda o un privato',
  }),

  // Intestazione fattura — quale dei due sia obbligatorio dipende da clientType.
  companyName: conditional(150, 'Ragione sociale troppo lunga'),
  fullName: conditional(100, 'Nome troppo lungo'),
  vatNumber: conditional(20, 'Partita IVA troppo lunga'),
  taxCode: conditional(20, 'Codice fiscale troppo lungo'),

  // Fatturazione elettronica — serve almeno uno dei due per un'azienda.
  sdiCode: conditional(7, 'Il codice SDI ha 7 caratteri'),
  pec: conditional(150, 'Indirizzo PEC troppo lungo'),

  // Indirizzo di fatturazione — sempre obbligatorio.
  billingStreet: z
    .string()
    .trim()
    .min(3, 'Inserisci via e numero civico')
    .max(150, 'Indirizzo troppo lungo'),
  billingCap: z
    .string()
    .trim()
    .regex(/^\d{5}$/, 'Il CAP è composto da 5 cifre'),
  billingCity: z
    .string()
    .trim()
    .min(2, 'Inserisci la città')
    .max(100, 'Città troppo lunga'),
  billingProvince: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{2}$/, 'Sigla provincia di 2 lettere (es. BO)'),

  // Recapiti.
  email: z
    .string()
    .trim()
    .min(1, 'L’email è obbligatoria')
    .max(150, 'Email troppo lunga')
    .email('Inserisci un indirizzo email valido'),
  phone: z
    .string()
    .trim()
    .min(6, 'Inserisci un numero di telefono valido')
    .max(30, 'Numero di telefono troppo lungo'),
  /** Persona di riferimento: chiesta solo alle aziende (per un privato coincide con l'intestatario). */
  referent: conditional(100, 'Nome del referente troppo lungo'),

  participants: z
    .string()
    .trim()
    .min(1, 'Indica il numero di partecipanti')
    .regex(/^\d{1,3}$/, 'Inserisci un numero da 1 a 999')
    .refine((value) => Number(value) >= 1, 'Almeno un partecipante'),
  notes: z.string().trim().max(2000, 'Note troppo lunghe').optional(),

  privacyConsent: z.boolean().refine((value) => value === true, {
    message: 'Devi accettare la privacy policy per procedere',
  }),
  /**
   * Honeypot — stesso meccanismo di `contact.schema.ts`: campo invisibile ai
   * veri utenti, deliberatamente non vincolato qui. Il route handler lo
   * controlla *dopo* un parse riuscito e finge il successo senza inviare
   * nulla, invece di rispondere con un errore che direbbe a un bot adattivo
   * quale campo lasciare vuoto.
   */
  website: z.string().optional(),
})

const VAT_PATTERN = /^\d{11}$/
/** Persona fisica: 16 caratteri alfanumerici. Le società hanno un CF di 11 cifre (spesso uguale alla P.IVA), quindi entrambi i formati sono validi. */
const TAX_CODE_PATTERN = /^([A-Za-z0-9]{16}|\d{11})$/
const SDI_PATTERN = /^[A-Za-z0-9]{7}$/
const PEC_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const orderFormSchema = baseOrderSchema.superRefine((values, ctx) => {
  const required = (
    field: keyof typeof values,
    value: string | undefined,
    message: string
  ) => {
    if (!value) {
      ctx.addIssue({ code: 'custom', path: [field], message })
      return false
    }
    return true
  }

  if (values.clientType === 'azienda') {
    if (
      required(
        'companyName',
        values.companyName,
        'Inserisci la ragione sociale'
      ) &&
      values.companyName!.length < 2
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['companyName'],
        message: 'Ragione sociale troppo corta',
      })
    }

    if (
      required('vatNumber', values.vatNumber, 'Inserisci la partita IVA') &&
      !VAT_PATTERN.test(values.vatNumber!)
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['vatNumber'],
        message: 'La partita IVA è composta da 11 cifre',
      })
    }

    if (
      required(
        'referent',
        values.referent,
        'Indica la persona di riferimento'
      ) &&
      values.referent!.length < 2
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['referent'],
        message: 'Nome del referente troppo corto',
      })
    }

    // Fatturazione elettronica: SDI *oppure* PEC, almeno uno.
    if (!values.sdiCode && !values.pec) {
      ctx.addIssue({
        code: 'custom',
        path: ['sdiCode'],
        message: 'Inserisci il codice SDI oppure la PEC',
      })
    }
  } else {
    if (
      required('fullName', values.fullName, 'Inserisci nome e cognome') &&
      values.fullName!.length < 2
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['fullName'],
        message: 'Nome troppo corto',
      })
    }

    if (!values.taxCode) {
      ctx.addIssue({
        code: 'custom',
        path: ['taxCode'],
        message: 'Inserisci il codice fiscale',
      })
    }
  }

  // Formati dei campi facoltativi: verificati solo se valorizzati.
  if (values.taxCode && !TAX_CODE_PATTERN.test(values.taxCode)) {
    ctx.addIssue({
      code: 'custom',
      path: ['taxCode'],
      message: 'Codice fiscale non valido (16 caratteri, o 11 cifre)',
    })
  }

  if (values.sdiCode && !SDI_PATTERN.test(values.sdiCode)) {
    ctx.addIssue({
      code: 'custom',
      path: ['sdiCode'],
      message: 'Il codice SDI ha 7 caratteri alfanumerici',
    })
  }

  if (values.pec && !PEC_PATTERN.test(values.pec)) {
    ctx.addIssue({
      code: 'custom',
      path: ['pec'],
      message: 'Inserisci un indirizzo PEC valido',
    })
  }
})

export type OrderFormValues = z.infer<typeof orderFormSchema>

/** Errori per campo, chiavi = nomi dei campi di `OrderFormValues`: restituiti dall'API e consumati dal form. */
export type OrderFormErrors = Partial<Record<keyof OrderFormValues, string>>
