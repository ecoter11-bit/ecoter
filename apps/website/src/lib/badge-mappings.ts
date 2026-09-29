import { Building2, Monitor, Combine, Home } from 'lucide-react'
import type { BadgeColor } from '@ecoter/ui'

/**
 * Category → Badge color. MODIFICHE del 29/09/2026: tutto il catalogo sta
 * sul verde della home, quindi le tre aree usano `brand` (prima, con la
 * palette per area della Decision 018, Sicurezza era `blue` e Benessere
 * psico-sociale `amber`). Le aree restano distinte dal testo del badge, mai
 * dal solo colore (WCAG 1.4.1). Stessa scelta in `categoryIconColor`
 * (category-ui.ts).
 */
export const categoryBadgeColor: Record<string, BadgeColor> = {
  sicurezza: 'brand',
  ambiente: 'brand',
  'benessere-psico-sociale': 'brand',
}

export const categoryBadgeLabel: Record<string, string> = {
  sicurezza: 'Sicurezza',
  ambiente: 'Ambiente',
  'benessere-psico-sociale': 'Benessere psico-sociale',
}

export const defaultCategoryBadgeColor: BadgeColor = 'neutral'

/**
 * Level → Badge color. Ordinal progression, not status — same neutral hue,
 * increasing depth per step (see packages/ui/src/badge.tsx). Previously
 * reused the status palette (base=success, intermedio=warning,
 * avanzato=error), which read "Avanzato" as an alert; do not revert to that.
 */
export const levelBadgeColor: Record<string, BadgeColor> = {
  base: 'level-1',
  intermedio: 'level-2',
  avanzato: 'level-3',
}

export const levelBadgeLabel: Record<string, string> = {
  base: 'Base',
  intermedio: 'Intermedio',
  avanzato: 'Avanzato',
}

/** Verde anche "In evidenza" (29/09/2026): nella scheda del corso era l'ultimo badge giallo del catalogo. */
export const featuredBadgeColor: BadgeColor = 'brand'
export const featuredBadgeLabel = 'In evidenza'

/** Modality → icon/label, shared by CourseCard and the course detail page's meta rows. */
export const modalityIcon: Record<
  string,
  React.ComponentType<{
    className?: string
    'aria-hidden'?: boolean | 'true' | 'false'
  }>
> = {
  aula: Building2,
  online: Monitor,
  blended: Combine,
  'in-house': Home,
}

export const modalityLabel: Record<string, string> = {
  aula: 'In Aula',
  online: 'Online',
  blended: 'Blended',
  'in-house': 'In House',
}
