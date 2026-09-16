/**
 * Static option lists shared between `CatalogToolbar` (single-value refine
 * selects, passo 3) and `StepSelection` (multi-select chips, passo 2) — one
 * source of truth for labels/values so the two pickers never drift apart.
 */

export const AUDIENCE_OPTIONS = [
  { value: 'rspp-aspp', label: 'RSPP / ASPP' },
  { value: 'datori', label: 'Datori di lavoro' },
  { value: 'lavoratori', label: 'Lavoratori' },
  { value: 'dirigenti', label: 'Dirigenti / Preposti' },
]

export const MODALITY_OPTIONS = [
  { value: 'aula', label: 'In Aula' },
  { value: 'online', label: 'Online' },
  { value: 'blended', label: 'Blended' },
  { value: 'in-house', label: 'In House' },
]

export const DURATION_OPTIONS = [
  { value: 'breve', label: 'Breve (< 8h)' },
  { value: 'medio', label: 'Medio (8–24h)' },
  { value: 'intensivo', label: 'Intensivo (> 24h)' },
]

export const SORT_OPTIONS = [
  { value: 'recente', label: 'Più recenti' },
  { value: 'durata-asc', label: 'Durata crescente' },
  { value: 'durata-desc', label: 'Durata decrescente' },
]
