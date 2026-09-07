import { z } from 'zod'

/**
 * Sotto-area di catalogo — un livello sotto la categoria, oggi usato solo da
 * "Sicurezza sul Lavoro" (53 corsi, troppi per una lista piatta). Le altre
 * categorie restano volutamente senza sotto-aree: `parent` esiste proprio
 * perché il modello resti generico se un domani ne servissero altrove.
 */
export const subcategorySchema = z.object({
  slug: z.string().min(1, 'Slug obbligatorio'),
  /** Slug della categoria a cui appartiene (es. `sicurezza`). */
  parent: z.string().min(1, 'Categoria padre obbligatoria'),
  name: z.string().min(1, 'Nome obbligatorio'),
  description: z.string().min(1, 'Descrizione obbligatoria'),
  /** Nome dell'icona lucide, risolto lato UI (come per le categorie). */
  icon: z.string().min(1, 'Icona obbligatoria'),
  order: z.number().int().nonnegative(),
})

export type SubcategoryData = z.infer<typeof subcategorySchema>
