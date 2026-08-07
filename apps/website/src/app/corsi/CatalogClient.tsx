'use client'

import { useTransition, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CourseCard } from '@/components/course/CourseCard'
import { CatalogToolbar } from '@/components/catalog/CatalogToolbar'
import { EmptyState } from '@/components/catalog/EmptyState'
import { applyFilters, type FilterState } from '@/lib/catalog-filters'
import type { Course } from '@/types'
import type { CategoryWithCount } from '@/types'

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

  /* Reset all filters — keeps `step`/`mode` so a reset from the guided
     flow's passo 3 stays on the results view (with "modifica selezione"
     still meaningful) instead of dumping the visitor back to passo 1. */
  function handleReset() {
    const params = new URLSearchParams()
    const step = searchParams.get('step')
    const mode = searchParams.get('mode')
    if (step) params.set('step', step)
    if (mode) params.set('mode', mode)
    const qs = params.toString()

    startTransition(() => {
      router.replace(qs ? `/corsi?${qs}` : '/corsi', { scroll: false })
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
                {' '}
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
