import { Building2, Monitor, Combine, Home } from 'lucide-react'
import type { BadgeColor } from '@ecoter/ui'

/**
 * Category → Badge color, mapped onto the Decision 018 macro-category
 * palette (`@ecoter/tokens` `categoryColors`). Since 2.3 the catalog slugs
 * match the 4 macro-categories 1:1 — no more consolidation needed here:
 *
 * - sicurezza               → `blue`  (D.Lgs. 81/08, RSPP/ASPP, antincendio, primo soccorso)
 * - ambiente                → `brand` (the rebrand's green)
 * - sistemi-di-gestione     → `eco`   (ISO 9001/14001/45001, audit interni)
 * - benessere-psico-sociale → `amber` (stress lavoro-correlato, mindfulness, counseling)
 *
 * `amber` is shared with `featuredBadgeColor` below — a
 * benessere-psico-sociale course marked "in evidenza" renders two amber
 * badges side by side. Label text (never color alone, WCAG 1.4.1) keeps
 * both badges distinguishable regardless. See
 * packages/ui/src/badge.stories.tsx "Uso nel catalogo".
 */
export const categoryBadgeColor: Record<string, BadgeColor> = {
  sicurezza: 'blue',
  ambiente: 'brand',
  'sistemi-di-gestione': 'eco',
  'benessere-psico-sociale': 'amber',
}

export const categoryBadgeLabel: Record<string, string> = {
  sicurezza: 'Sicurezza',
  ambiente: 'Ambiente',
  'sistemi-di-gestione': 'Sistemi di Gestione',
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

export const featuredBadgeColor: BadgeColor = 'amber'
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
