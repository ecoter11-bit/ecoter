import { z } from 'zod'

export const siteAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  province: z.string(),
  cap: z.string(),
  country: z.string(),
})

export const siteSettingsSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  url: z.string(),
  email: z.string(),
  phone: z.string(),
  address: siteAddressSchema,
  hours: z.string().optional(),
  vatNumber: z.string().optional(),
  /** True while the contact details above are inherited from the parent company and haven't been confirmed as ECOTER Academy's own — surfaced as a visible notice on /contatti, not just a content flag. */
  contactInfoProvisional: z.boolean().default(false),
  contactInfoNote: z.string().optional(),
  social: z.object({
    linkedin: z.string().default(''),
    youtube: z.string().default(''),
  }),
  /** Percorsi interni (`/cookie-policy`, `/privacy-policy`): dal 2026-09-22 l'Academy ha informative proprie e non rimanda più a quelle della casa madre. Restano `z.string()` e non un enum di percorsi fissi perché il campo è il punto in cui si cambia destinazione senza toccare il codice (footer e consensi dei moduli leggono da qui). */
  cookiePolicy: z.string(),
  privacyPolicy: z.string(),
})

export type SiteSettings = z.infer<typeof siteSettingsSchema>
