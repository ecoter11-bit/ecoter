import { HardHat, HeartHandshake, Leaf, type LucideIcon } from 'lucide-react'
import type { IconCircleColor } from '@ecoter/ui'

/**
 * Icona per area, risolta dal campo `icon` del JSON in `content/categories/`
 * — il contenuto nomina l'icona, la UI la risolve (stesso schema delle
 * sotto-aree, vedi `subcategory-ui.ts`).
 */
export const categoryIcon: Record<string, LucideIcon> = {
  HardHat,
  Leaf,
  HeartHandshake,
}

export const defaultCategoryIcon: LucideIcon = HardHat

/**
 * Area → colore dell'icona (`IconCircle` di `@ecoter/ui`) e delle frecce
 * delle card, stessa mappa dei badge (`categoryBadgeColor` in
 * badge-mappings.ts). MODIFICHE del 29/09/2026: tutto il catalogo sta sul
 * verde della home, quindi le tre aree hanno lo stesso colore (prima
 * Sicurezza blu e Benessere ambra, Decision 018). La mappa resta per area:
 * se un giorno le aree tornassero a distinguersi per colore, si cambia qui.
 */
export const categoryIconColor: Record<string, IconCircleColor> = {
  sicurezza: 'brand',
  ambiente: 'brand',
  'benessere-psico-sociale': 'brand',
}

export const defaultCategoryIconColor: IconCircleColor = 'brand'

/**
 * Testo nel colore dell'area, allo stop che regge AA su bianco: le frecce
 * "Vedi i corsi" / "Esplora" delle card del catalogo (`CatalogCard`)
 * (blue-700 ≈10.5:1, brand-700 ≈6.9:1, amber-700 ≈5.9:1, eco-600 ≈6.6:1,
 * neutral-700 ≈9:1). Stringhe intere per lo scanner di Tailwind.
 */
export const accentTextClass: Record<IconCircleColor, string> = {
  neutral: 'text-neutral-700',
  brand: 'text-brand-700',
  blue: 'text-blue-700',
  eco: 'text-eco-600',
  amber: 'text-amber-700',
}
