import { z } from 'zod'

export const categorySeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
  keywords: z.array(z.string()).default([]),
})

export const categorySchema = z.object({
  slug: z.string().min(1, 'Slug obbligatorio'),
  name: z.string().min(1, 'Nome obbligatorio'),
  description: z.string().min(1, 'Descrizione obbligatoria'),
  longDescription: z.string().optional(),
  icon: z.string().min(1, 'Icona obbligatoria'),
  image: z.string().optional(),
  order: z.number().int().nonnegative(),
  featured: z.boolean().default(false),
  seo: categorySeoSchema.default({ keywords: [] }),
})

export type CategoryData = z.infer<typeof categorySchema>
