'use client'

import { useTransition, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CourseCard } from '@/components/course/CourseCard'
import { CatalogToolbar } from '@/components/catalog/CatalogToolbar'
import { EmptyState } from '@/components/catalog/EmptyState'
import { SubcategoryResults } from '@/components/catalog/SubcategoryResults'
import { applyFilters, type FilterState } from '@/lib/catalog-filters'
import { isSubcategoryContext } from '@/lib/subcategory-ui'
import type { Course } from '@/types'
import type { CategoryWithCount, SubcategoryWithCount } from '@/types'

/* ─── Props ──────────────────────────────────────────────────────────────── */

type Props = {
  courses: Course[]
  categories: CategoryWithCount[]
  subcategories: SubcategoryWithCount[]
  normativeRefs: string[]
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function CatalogClient({
  courses,
  categories,
  subcategories,
  normativeRefs,
}: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  /* Raggruppare e filtrare per sotto-area ha senso solo dentro Sicurezza:
     è l'unica categoria sotto-articolata, e in una lista mista i gruppi
     coprirebbero una parte sola dei risultati. Fuori da quel contesto `sub`
     viene ignorato invece di restare un filtro attivo ma senza comando
     visibile (es. un URL costruito a mano con due categorie). */
  const categoryParam = searchParams.get('cat') ?? ''
  const groupBySubcategory = isSubcategoryContext(categoryParam)

  /* Read filter state from URL — derived at render time, no state sync */
  const filters: FilterState = {
    query: searchParams.get('q') ?? '',
    category: categoryParam,
    subcategory: groupBySubcategory ? (searchParams.get('sub') ?? '') : '',
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
      filters.subcategory,
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
    filters.subcategory,
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
          : key === 'subcategory'
            ? 'sub'
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
        subcategories={subcategories}
        showSubcategory={groupBySubcategory}
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
          <h2 className="sr-only">Risultati catalogo</h2>

          {/* Result count */}
          <p
            className="mb-6 text-sm text-muted-foreground"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="font-semibold text-neutral-700">
              {filteredCourses.length === 0
                ? 'Nessun corso trovato'
                : filteredCourses.length === 1
                  ? '1 corso trovato'
                  : `${filteredCourses.length} corsi trovati`}
            </span>
            {activeCount > 0 && (
              <span className="ml-1.5">
                {' '}
                con {activeCount}{' '}
                {activeCount === 1 ? 'filtro attivo' : 'filtri attivi'}
              </span>
            )}
          </p>

          {filteredCourses.length === 0 ? (
            <EmptyState onReset={handleReset} hasFilters={activeCount > 0} />
          ) : groupBySubcategory ? (
            <SubcategoryResults
              courses={filteredCourses}
              subcategories={subcategories}
            />
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
