import {
  BadgeCheck,
  Forklift,
  TriangleAlert,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'

/**
 * Icona per sotto-area, risolta dal campo `icon` del JSON in
 * `content/subcategories/` — stesso schema usato dalle categorie: il
 * contenuto nomina l'icona, la UI la risolve (i componenti lucide non sono
 * serializzabili attraverso il confine server → client).
 *
 * Il colore delle card di sotto-area è quello dell'area padre (vedi
 * `categoryCardColor` in `category-ui.ts`): sono un livello di dettaglio
 * dentro Sicurezza, non nuove macro-aree, e un colore proprio le farebbe
 * leggere come categorie di pari rango.
 */
export const subcategoryIcon: Record<string, LucideIcon> = {
  Users,
  BadgeCheck,
  Forklift,
  Zap,
  TriangleAlert,
}

export const defaultSubcategoryIcon: LucideIcon = Users
