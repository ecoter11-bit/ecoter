import {
  BadgeCheck,
  Forklift,
  TriangleAlert,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { IconCircleColor } from '@ecoter/ui'
import { SUBCATEGORIZED_CATEGORY } from '@/lib/content/subcategory-mapping'

/**
 * Icona per sotto-area, risolta dal campo `icon` del JSON in
 * `content/subcategories/` — stesso schema usato dalle categorie: il
 * contenuto nomina l'icona, la UI la risolve (i componenti lucide non sono
 * serializzabili attraverso il confine server → client).
 */
export const subcategoryIcon: Record<string, LucideIcon> = {
  Users,
  BadgeCheck,
  Forklift,
  Zap,
  TriangleAlert,
}

export const defaultSubcategoryIcon: LucideIcon = Users

/**
 * Tutte le sotto-aree condividono l'azzurro della categoria padre
 * (`categoryBadgeColor.sicurezza`): sono un livello di dettaglio dentro
 * Sicurezza, non nuove macro-aree, e differenziarne il colore le farebbe
 * leggere come categorie di pari rango.
 */
export const subcategoryIconColor: IconCircleColor = 'blue'

function splitMulti(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

/**
 * Vero quando la selezione di categoria è esattamente e soltanto
 * "Sicurezza sul Lavoro" — l'unico contesto in cui ha senso mostrare il
 * drill-down per sotto-area (passo 2), raggruppare i risultati e offrire il
 * filtro "Sotto-area" in toolbar. Con più categorie selezionate, o con
 * un'altra categoria, il catalogo resta piatto come prima.
 */
export function isSubcategoryContext(categoryFilter: string): boolean {
  const cats = splitMulti(categoryFilter)
  return cats.length === 1 && cats[0] === SUBCATEGORIZED_CATEGORY
}
