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

/**
 * Testo nel colore dell'area, allo stop che regge AA su bianco: le frecce
 * "Vedi i corsi" / "Vedi il corso" delle card del catalogo e dei corsi
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

/** Lo stesso colore, solo mentre si passa sopra la card (`group`). */
export const accentGroupHoverTextClass: Record<IconCircleColor, string> = {
  neutral: 'group-hover:text-neutral-700',
  brand: 'group-hover:text-brand-700',
  blue: 'group-hover:text-blue-700',
  eco: 'group-hover:text-eco-600',
  amber: 'group-hover:text-amber-700',
}
