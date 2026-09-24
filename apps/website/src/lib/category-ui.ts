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
 * Area → colore dell'icona (`IconCircle` di `@ecoter/ui`), stessa mappa della
 * Decision 018 usata dai badge (`categoryBadgeColor` in badge-mappings.ts):
 * Sicurezza → blu, Ambiente → verde brand, Benessere psico-sociale → ambra.
 */
export const categoryIconColor: Record<string, IconCircleColor> = {
  sicurezza: 'blue',
  ambiente: 'brand',
  'benessere-psico-sociale': 'amber',
}

export const defaultCategoryIconColor: IconCircleColor = 'brand'
