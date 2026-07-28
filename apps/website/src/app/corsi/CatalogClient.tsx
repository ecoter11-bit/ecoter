'use client'

import { useTransition, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CourseCard } from '@/components/course/CourseCard'
import {
  CatalogToolbar,
  type FilterState,
} from '@/components/catalog/CatalogToolbar'
import { EmptyState } from '@/components/catalog/EmptyState'
import type { Course, CourseModality } from '@/types'
import type { CategoryWithCount } from '@/types'

/* ─── Audience keyword matching ─────────────────────────────────────────── */

type AudienceGroup = { value: string; keywords: string[] }

const AUDIENCE_GROUPS: AudienceGroup[] = [
  { value: 'rspp-aspp', keywords: ['rspp', 'aspp', 'servizio di prevenzione'] },
  { value: 'datori', keywords: ['datori di lavoro'] },
  { value: 'lavoratori', keywords: ['lavoratori', 'dipendenti', 'operatori'] },
  {
    value: 'dirigenti',
    keywords: ['dirigenti', 'preposti', 'responsabili di stabilimento'],
  },
  {
    value: 'qualita',
    keywords: ['qualità', 'quality', 'auditor', 'consulenti di sistema'],
  },
  {
    value: 'alimentare',
    keywords: ['alimentar', 'ristorant', 'catering', 'mense', 'bar,'],
  },
  {
    value: 'squadra-emergenza',
    keywords: ['squadra', 'addetti alla squadra', 'addetti alla prevenzione'],
  },
]

/* ─── Filter & sort logic ────────────────────────────────────────────────── */

function applyFilters(courses: Course[], filters: FilterState): Course[] {
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

  /* category */
  if (filters.category) {
    result = result.filter((c) => c.category === filters.category)
  }

  /* audience */
  if (filters.audience) {
    const group = AUDIENCE_GROUPS.find((g) => g.value === filters.audience)
    if (group) {
      result = result.filter((c) =>
        c.targetAudience.some((a) =>
          group.keywords.some((kw) => a.toLowerCase().includes(kw))
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

  /* normativa */
  if (filters.norm) {
    result = result.filter(
      (c) => c.normativeRef?.includes(filters.norm) ?? false
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
  } else if (filters.sort === 'prezzo-asc') {
    sorted.sort((a, b) => {
      const pa = a.pricing.type === 'fixed' ? a.pricing.amount : Infinity
      const pb = b.pricing.type === 'fixed' ? b.pricing.amount : Infinity
      return pa - pb
    })
  }
  /* 'recente' — already sorted by publishedAt from server */

  return sorted
}

/* ─── Props ──────────────────────────────────────────────────────────────── */

type Props = {
  courses: Course[]
  categories: CategoryWithCount[]
  normativeRefs: string[]
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function CatalogClient({ courses, categories, normativeRefs }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  /* Read filter state from URL — derived at render time, no state sync */
  const filters: FilterState = {
    query: searchParams.get('q') ?? '',
    category: searchParams.get('cat') ?? '',
    audience: searchParams.get('aud') ?? '',
    modality: searchParams.get('mod') ?? '',
    duration: searchParams.get('dur') ?? '',
    sort: searchParams.get('sort') ?? 'recente',
    norm: searchParams.get('norm') ?? '',
  }

  /* Derived filtered list */
  const filteredCourses = useMemo(
    () => applyFilters(courses, filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      courses,
      filters.query,
      filters.category,
      filters.audience,
      filters.modality,
      filters.norm,
      filters.duration,
      filters.sort,
    ]
  )

  const activeCount = [
    filters.query,
    filters.category,
    filters.audience,
    filters.modality,
    filters.duration,
    filters.norm,
  ].filter(Boolean).length

  /* Update a single filter param in URL */
  function handleChange(key: keyof FilterState, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    const paramKey =
      key === 'query'
        ? 'q'
        : key === 'category'
          ? 'cat'
          : key === 'audience'
            ? 'aud'
            : key === 'modality'
              ? 'mod'
              : key === 'duration'
                ? 'dur'
                : key === 'norm'
                  ? 'norm'
                  : key /* sort */

    if (value && value !== 'recente') {
      params.set(paramKey, value)
    } else {
      params.delete(paramKey)
    }

    startTransition(() => {
      router.replace(`/corsi?${params.toString()}`, { scroll: false })
    })
  }

  /* Reset all filters */
  function handleReset() {
    startTransition(() => {
      router.replace('/corsi', { scroll: false })
    })
  }

  return (
    <>
      <CatalogToolbar
        filters={filters}
        categories={categories}
        normativeRefs={normativeRefs}
        activeCount={activeCount}
        isPending={isPending}
        onChange={handleChange}
        onReset={handleReset}
      />

      <section
        aria-label="Catalogo corsi"
        id="catalogo"
        className="bg-neutral-25"
      >
        <div className="container-default py-10">
          {/* Result count */}
          <p
            className="mb-6 text-sm text-neutral-500"
            aria-live="polite"
            aria-atomic="true"
          >
            {filteredCourses.length === 0
              ? 'Nessun corso trovato'
              : filteredCourses.length === 1
                ? '1 corso trovato'
                : `${filteredCourses.length} corsi trovati`}
            {activeCount > 0 && (
              <span className="ml-1.5 text-neutral-400">
                con {activeCount}{' '}
                {activeCount === 1 ? 'filtro attivo' : 'filtri attivi'}
              </span>
            )}
          </p>

          {filteredCourses.length === 0 ? (
            <EmptyState onReset={handleReset} hasFilters={activeCount > 0} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
