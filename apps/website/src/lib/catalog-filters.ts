import type { Course, CourseModality } from '@/types'

/* ─── Audience keyword matching ─────────────────────────────────────────── */

type AudienceGroup = { value: string; keywords: string[] }

export const AUDIENCE_GROUPS: AudienceGroup[] = [
  { value: 'rspp-aspp', keywords: ['rspp', 'aspp', 'servizio di prevenzione'] },
  { value: 'datori', keywords: ['datori di lavoro'] },
  { value: 'lavoratori', keywords: ['lavoratori', 'dipendenti', 'operatori'] },
  {
    value: 'dirigenti',
    keywords: ['dirigenti', 'preposti', 'responsabili di stabilimento'],
  },
]

/* ─── Filter state ───────────────────────────────────────────────────────── */

/**
 * `category`, `audience`, `norm` and `subcategory` accept either a single
 * value or a comma-separated list (multi-select from the guided catalog flow,
 * passo 2). `CatalogToolbar`'s selects only ever write a single value; the
 * guided flow's chip selection is what produces the comma-joined form.
 */
export type FilterState = {
  query: string
  category: string
  /**
   * Sotto-area (drill-down della sola categoria "Sicurezza sul Lavoro"). Le
   * altre categorie non hanno sotto-aree: un corso fuori da `sicurezza` non ha
   * `subcategory` e viene quindi escluso appena questo filtro è valorizzato —
   * comportamento voluto, dato che l'unico modo di valorizzarlo è passare dal
   * drill-down di Sicurezza.
   */
  subcategory: string
  audience: string
  modality: string
  duration: string
  sort: string
  norm: string
}

function splitMulti(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

/* ─── Filter & sort logic ────────────────────────────────────────────────── */

export function applyFilters(
  courses: Course[],
  filters: FilterState
): Course[] {
  let result = courses

  /* text search */
  if (filters.query.trim()) {
    const q = filters.query.toLowerCase().trim()
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.excerpt.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.targetAudience.some((a) => a.toLowerCase().includes(q))
    )
  }

  /* category (multi) */
  if (filters.category) {
    const cats = splitMulti(filters.category)
    result = result.filter((c) => cats.includes(c.category))
  }

  /* sotto-area (multi) */
  if (filters.subcategory) {
    const subs = splitMulti(filters.subcategory)
    result = result.filter(
      (c) => !!c.subcategory && subs.includes(c.subcategory)
    )
  }

  /* audience (multi) */
  if (filters.audience) {
    const auds = splitMulti(filters.audience)
    const groups = AUDIENCE_GROUPS.filter((g) => auds.includes(g.value))
    if (groups.length) {
      result = result.filter((c) =>
        c.targetAudience.some((a) =>
          groups.some((g) =>
            g.keywords.some((kw) => a.toLowerCase().includes(kw))
          )
        )
      )
    }
  }

  /* modality */
  if (filters.modality) {
    result = result.filter((c) =>
      (c.modality as CourseModality[]).includes(
        filters.modality as CourseModality
      )
    )
  }

  /* normativa (multi) */
  if (filters.norm) {
    const norms = splitMulti(filters.norm)
    result = result.filter((c) =>
      norms.some((n) => c.normativeRef?.includes(n) ?? false)
    )
  }

  /* duration bucket */
  if (filters.duration === 'breve') {
    result = result.filter((c) => c.duration.hours < 8)
  } else if (filters.duration === 'medio') {
    result = result.filter(
      (c) => c.duration.hours >= 8 && c.duration.hours <= 24
    )
  } else if (filters.duration === 'intensivo') {
    result = result.filter((c) => c.duration.hours > 24)
  }

  /* sort */
  const sorted = [...result]
  if (filters.sort === 'durata-asc') {
    sorted.sort((a, b) => a.duration.hours - b.duration.hours)
  } else if (filters.sort === 'durata-desc') {
    sorted.sort((a, b) => b.duration.hours - a.duration.hours)
  }
  /* 'recente' — already sorted by publishedAt from server */

  return sorted
}
