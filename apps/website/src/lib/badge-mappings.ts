import type { BadgeColor } from '@ecoter/ui'

/**
 * Category → Badge color, mapped onto the Decision 018 macro-category
 * palette (`@ecoter/tokens` `categoryColors`) rather than the old ad-hoc
 * brand/warning split. Current catalog slugs (6) map onto the 4
 * macro-categories the real restructuring — slug renaming/consolidation —
 * is out of scope here, see 2.3):
 *
 * - sicurezza, antincendio → `blue`   (macro: sicurezza)
 * - ambiente                → `brand` (macro: ambiente — the rebrand's green)
 * - qualita, sistemi-gestione → `eco` (macro: sistemi-di-gestione, teal)
 * - management              → `amber` (stand-in for benessere-psico-sociale
 *   until 2.3 introduces that category; oro/ambra per the rebrand)
 *
 * `amber` is shared with `featuredBadgeColor` below — a Management course
 * marked "in evidenza" renders two amber badges side by side. Pre-existing
 * risk class (this file already accepted `eco` on 3/6 categories for the
 * same reason: 4 hues across 6 slugs can't stay fully distinct until 2.3
 * collapses the slugs to match the 4 macro-categories) — label text (never
 * color alone, WCAG 1.4.1) keeps both badges distinguishable regardless.
 * See packages/ui/src/badge.stories.tsx "Uso nel catalogo".
 */
export const categoryBadgeColor: Record<string, BadgeColor> = {
  sicurezza: 'blue',
  antincendio: 'blue',
  qualita: 'eco',
  ambiente: 'brand',
  'sistemi-gestione': 'eco',
  management: 'amber',
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
