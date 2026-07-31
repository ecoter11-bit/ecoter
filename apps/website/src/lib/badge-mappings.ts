import type { BadgeColor } from '@ecoter/ui'

/**
 * Category → Badge color. Sicurezza/Management share `brand`, Qualità/
 * Ambiente/Sistemi di Gestione share `eco` — the label text (not the color)
 * is what distinguishes them (WCAG 1.4.1, meaning never rests on color
 * alone). See packages/ui/src/badge.stories.tsx "Uso nel catalogo".
 *
 * `eco` on 3/6 categories is a conscious exception to "used sparingly"
 * (root CLAUDE.md, Decision 016) for the teal accent: this is unchanged
 * from the ad-hoc badges CourseCard used before this refactor (same 3
 * categories were already `eco`-tinted), and category identity needs more
 * distinct hues than `neutral`/`brand`/`eco` alone provide across 6
 * categories. Not a regression — a pre-existing tradeoff, now centralized.
 */
export const categoryBadgeColor: Record<string, BadgeColor> = {
  sicurezza: 'brand',
  antincendio: 'warning',
  qualita: 'eco',
  ambiente: 'eco',
  'sistemi-gestione': 'eco',
  management: 'brand',
}

export const categoryBadgeLabel: Record<string, string> = {
  sicurezza: 'Sicurezza',
  antincendio: 'Antincendio',
  qualita: 'Qualità',
  ambiente: 'Ambiente',
  'sistemi-gestione': 'Sistemi di Gestione',
  management: 'Management',
}

export const defaultCategoryBadgeColor: BadgeColor = 'neutral'

/** Level → Badge color, reusing the status palette (base=success, intermedio=warning, avanzato=error). */
export const levelBadgeColor: Record<string, BadgeColor> = {
  base: 'success',
  intermedio: 'warning',
  avanzato: 'error',
}

export const levelBadgeLabel: Record<string, string> = {
  base: 'Base',
  intermedio: 'Intermedio',
  avanzato: 'Avanzato',
}

export const featuredBadgeColor: BadgeColor = 'amber'
export const featuredBadgeLabel = 'In evidenza'
