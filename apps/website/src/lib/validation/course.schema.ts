import { z } from 'zod'

const dateString = z.union([
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve essere YYYY-MM-DD'),
  z.date().transform((d) => d.toISOString().slice(0, 10)),
])

export const coursePricingSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('fixed'),
    amount: z.number().positive(),
    currency: z.literal('EUR').default('EUR'),
  }),
  z.object({
    type: z.literal('on-request'),
  }),
])

export const courseModuleSchema = z.object({
  title: z.string().min(1),
  topics: z.array(z.string()).default([]),
  durationHours: z.number().positive().optional(),
})

export const courseSeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
  keywords: z.array(z.string()).default([]),
})

export const courseFrontmatterSchema = z.object({
  title: z.string().min(1, 'Titolo obbligatorio'),
  subtitle: z.string().default(''),
  excerpt: z.string().optional(),
  category: z.string().min(1, 'Categoria obbligatoria'),
  /** Codice di catalogo ECOTER (es. A06, C03): una lettera di area seguita
   * da due cifre. Il prefisso alfabetico è la fonte da cui si deriva la
   * sotto-area dei corsi di sicurezza quando `subcategory` non è
   * esplicitata. */
  code: z.string().optional(),
  /** Sotto-area del catalogo (usata solo dalla categoria `sicurezza`). Se
   * assente viene derivata da `code` / slug — vedi
   * `lib/content/subcategories.ts`. */
  subcategory: z.string().optional(),
  level: z.enum(['base', 'intermedio', 'avanzato']),
  modality: z.array(z.enum(['aula', 'online', 'blended', 'in-house'])).min(1),
  duration: z.object({
    hours: z.number().positive(),
    days: z.number().positive().optional(),
    /** Etichetta mostrata al posto del formato "Xh · N incontri". Serve ai
     * percorsi la cui fonte esprime la durata in incontri e minuti e non in
     * ore: `hours` resta il dato numerico su cui lavorano i filtri,
     * l'ordinamento del catalogo e `courseWorkload` nei dati strutturati. */
    label: z.string().optional(),
  }),
  pricing: coursePricingSchema,
  certification: z.string().optional(),
  targetAudience: z.array(z.string()).default([]),
  objectives: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  curriculum: z.array(courseModuleSchema).default([]),
  instructors: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  downloads: z.array(z.string()).default([]),
  normativeRef: z.array(z.string()).optional(),
  seo: courseSeoSchema.default({ keywords: [] }),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  publishedAt: dateString.optional(),
  updatedAt: dateString.optional(),
})

export type CourseFrontmatter = z.infer<typeof courseFrontmatterSchema>

export const courseWithBodySchema = courseFrontmatterSchema.extend({
  slug: z.string().min(1),
  body: z.string(),
})

export type CourseWithBody = z.infer<typeof courseWithBodySchema>
