'use client'

import { Search, X, SlidersHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { FilterState } from '@/lib/catalog-filters'
import {
  AUDIENCE_OPTIONS,
  MODALITY_OPTIONS,
  DURATION_OPTIONS,
  SORT_OPTIONS,
} from '@/lib/catalog-options'
import type { CategoryWithCount, SubcategoryWithCount } from '@/types'

export type { FilterState }

type Props = {
  filters: FilterState
  categories: CategoryWithCount[]
  subcategories: SubcategoryWithCount[]
  /** Mostra il filtro "Sotto-area": vero solo in contesto Sicurezza, l'unica
   *  categoria sotto-articolata (vedi `isSubcategoryContext`). */
  showSubcategory: boolean
  normativeRefs: string[]
  activeCount: number
  isPending: boolean
  onChange: (key: keyof FilterState, value: string) => void
  onReset: () => void
}

const SEARCH_DEBOUNCE_MS = 280

/**
 * Valore fittizio per lo stato "più sotto-aree attive" del select
 * "Sotto-area". Il drill-down del passo 2 è multi-selezione (`sub=a,b`), un
 * `<select>` nativo no: senza questa opzione il controllo non troverebbe
 * corrispondenza e mostrerebbe il placeholder, dichiarando "nessun filtro"
 * mentre due sono attivi. L'opzione è `disabled`: comunica lo stato, non è
 * una scelta: per cambiare si sceglie una singola sotto-area, per azzerare
 * il placeholder.
 */
const SUBCATEGORY_MULTI = '__multi__'

/**
 * I controlli della toolbar sono `<select>`/`<input>` nativi in versione
 * compatta (h-9), non `Select`/`Input` di `@ecoter/ui` (h-10): qui servono
 * un menu nativo — vedi la nota su `SUBCATEGORY_MULTI` — e una barra sticky
 * bassa. Il *colore* però resta quello del design system: `border-input`
 * (neutral-500, ≈3.95:1) e non `border-neutral-200` (≈1.36:1), perché il
 * bordo a riposo di un controllo è un confine di componente UI e SC 1.4.11
 * chiede ≥3:1. Stessa ragione per il chevron e l'icona lente: neutral-500,
 * non neutral-400 (≈2.56:1).
 */
const selectClass = cn(
  'h-9 rounded-lg border border-input bg-white pl-3 pr-7 text-sm text-neutral-700',
  // Chevron come data URI: niente virgolette e niente spazi letterali nel
  // valore arbitrario — Tailwind estrae il candidato dal *sorgente*, quindi
  // le virgolette escapate del TSX finirebbero nel CSS generato (url()
  // malformata, chevron invisibile) e ogni spazio spezzerebbe la classe in
  // due per clsx/tailwind-merge (che così mangiava anche `bg-white`). Apici
  // → %27, spazi → %20. Colore: neutral-500 (#7A8090, ≈3.95:1), non
  // neutral-400 — è parte del controllo, vale SC 1.4.11.
  'appearance-none bg-[url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%237A8090%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27m6%209%206%206%206-6%27/%3E%3C/svg%3E)] bg-[position:right_0.5rem_center] bg-no-repeat',
  'transition-colors duration-150 hover:border-neutral-600 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-300'
)

export function CatalogToolbar({
  filters,
  categories,
  subcategories,
  showSubcategory,
  normativeRefs,
  activeCount,
  isPending,
  onChange,
  onReset,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const selectedSubcategories = filters.subcategory
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
  const hasMultipleSubcategories = selectedSubcategories.length > 1
  const subcategoryValue = hasMultipleSubcategories
    ? SUBCATEGORY_MULTI
    : filters.subcategory

  /* Local, immediately-responsive search text — decoupled from the URL so
     typing never waits on a router transition. `lastSentQuery` tracks the
     value WE last asked the parent to commit (set synchronously the moment
     we call onChange, not when the prop echo for it arrives) — comparing
     filters.query against that, rather than against the last prop seen,
     means a slow round trip for an older keystroke can't clobber newer
     local typing that happened while it was in flight. Synced during render
     (not in an effect) per React's "adjusting state when a prop changes"
     pattern. Reset/clear update both pieces of state synchronously so their
     own echo is never mistaken for an external change either. */
  const [localQuery, setLocalQuery] = useState(filters.query)
  const [lastSentQuery, setLastSentQuery] = useState(filters.query)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (filters.query !== lastSentQuery) {
    setLastSentQuery(filters.query)
    setLocalQuery(filters.query)
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  function handleQueryChange(value: string) {
    setLocalQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setLastSentQuery(value)
      onChange('query', value)
    }, SEARCH_DEBOUNCE_MS)
  }

  function handleQueryClear() {
    setLocalQuery('')
    setLastSentQuery('')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    onChange('query', '')
  }

  /* Reset clears the query locally in the same tick rather than waiting for
     the URL round trip, so a debounce already in flight can't reintroduce
     the just-cleared text after Reset navigates the URL away from it. */
  function handleReset() {
    setLocalQuery('')
    setLastSentQuery('')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    onReset()
  }

  return (
    <div
      className={cn(
        'sticky top-16 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur-sm',
        isPending && 'opacity-60 transition-opacity duration-150'
      )}
    >
      <div className="container-default py-3">
        {/* Primary row — always visible */}
        <div className="flex items-center gap-2">
          {/* Search input — il minimo su desktop scatta solo in contesto
              Sicurezza, dove la fila porta un select in più: senza, la ricerca
              verrebbe schiacciata a pochi pixel. Fuori da quel contesto la
              toolbar resta esattamente com'era, su una riga sola. */}
          <div
            className={cn(
              'relative min-w-0 flex-1',
              showSubcategory && 'lg:min-w-48'
            )}
          >
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500"
              aria-hidden="true"
            />
            <input
              type="search"
              value={localQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Cerca corsi…"
              aria-label="Cerca corsi"
              className={cn(
                'h-9 w-full rounded-lg border border-input bg-white pr-3 pl-9 text-sm text-neutral-900 placeholder:text-neutral-600',
                'transition-colors duration-150 hover:border-neutral-600 focus:border-brand-600 focus:ring-1 focus:ring-brand-300 focus:outline-none'
              )}
            />
            {localQuery && (
              <button
                type="button"
                onClick={handleQueryClear}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-0.5 text-neutral-600 hover:text-neutral-900"
                aria-label="Cancella ricerca"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Desktop selects — `flex-wrap` + `min-w-0`: quando compare anche
              "Sotto-area" i select vanno a capo invece di comprimere la
              ricerca. */}
          <div className="hidden min-w-0 flex-wrap items-center justify-end gap-2 lg:flex">
            <select
              value={filters.category}
              onChange={(e) => onChange('category', e.target.value)}
              aria-label="Filtra per categoria"
              className={selectClass}
            >
              <option value="">Categoria</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            {showSubcategory && (
              <select
                value={subcategoryValue}
                onChange={(e) => onChange('subcategory', e.target.value)}
                aria-label="Filtra per sotto-area della Sicurezza"
                className={selectClass}
              >
                <option value="">Sotto-area</option>
                {hasMultipleSubcategories && (
                  <option value={SUBCATEGORY_MULTI} disabled>
                    {selectedSubcategories.length} sotto-aree selezionate
                  </option>
                )}
                {subcategories.map((sub) => (
                  <option key={sub.slug} value={sub.slug}>
                    {sub.name} ({sub.courseCount})
                  </option>
                ))}
              </select>
            )}

            <select
              value={filters.audience}
              onChange={(e) => onChange('audience', e.target.value)}
              aria-label="Filtra per destinatario"
              className={selectClass}
            >
              <option value="">Destinatario</option>
              {AUDIENCE_OPTIONS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>

            <select
              value={filters.modality}
              onChange={(e) => onChange('modality', e.target.value)}
              aria-label="Filtra per modalità"
              className={selectClass}
            >
              <option value="">Modalità</option>
              {MODALITY_OPTIONS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            <select
              value={filters.duration}
              onChange={(e) => onChange('duration', e.target.value)}
              aria-label="Filtra per durata"
              className={selectClass}
            >
              <option value="">Durata</option>
              {DURATION_OPTIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>

            <select
              value={filters.sort}
              onChange={(e) => onChange('sort', e.target.value)}
              aria-label="Ordina corsi"
              className={selectClass}
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            {activeCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-lg border border-input px-3 py-1.5 text-xs font-semibold text-neutral-600 transition-all duration-150 hover:border-neutral-600 hover:text-neutral-900"
              >
                <X className="size-3" aria-hidden="true" />
                Reset
                <span className="flex size-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                  {activeCount}
                </span>
              </button>
            )}
          </div>

          {/* Mobile filters toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              'flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-150 lg:hidden',
              mobileOpen || activeCount > 0
                ? 'border-brand-600 bg-brand-50 text-brand-700'
                : 'border-input text-neutral-600 hover:border-neutral-600'
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-filters"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filtri
            {activeCount > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </button>

          {/* Mobile sort (always visible) */}
          <select
            value={filters.sort}
            onChange={(e) => onChange('sort', e.target.value)}
            aria-label="Ordina corsi"
            className={cn(selectClass, 'lg:hidden')}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile expanded filters */}
        {mobileOpen && (
          <div
            id="mobile-filters"
            className="mt-3 grid grid-cols-2 gap-2 border-t border-neutral-100 pt-3 lg:hidden"
          >
            <select
              value={filters.category}
              onChange={(e) => onChange('category', e.target.value)}
              aria-label="Filtra per categoria"
              className={cn(selectClass, 'w-full')}
            >
              <option value="">Categoria</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            {showSubcategory && (
              <select
                value={subcategoryValue}
                onChange={(e) => onChange('subcategory', e.target.value)}
                aria-label="Filtra per sotto-area della Sicurezza"
                className={cn(selectClass, 'w-full')}
              >
                <option value="">Sotto-area</option>
                {hasMultipleSubcategories && (
                  <option value={SUBCATEGORY_MULTI} disabled>
                    {selectedSubcategories.length} sotto-aree selezionate
                  </option>
                )}
                {subcategories.map((sub) => (
                  <option key={sub.slug} value={sub.slug}>
                    {sub.name} ({sub.courseCount})
                  </option>
                ))}
              </select>
            )}

            <select
              value={filters.audience}
              onChange={(e) => onChange('audience', e.target.value)}
              aria-label="Filtra per destinatario"
              className={cn(selectClass, 'w-full')}
            >
              <option value="">Destinatario</option>
              {AUDIENCE_OPTIONS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>

            <select
              value={filters.modality}
              onChange={(e) => onChange('modality', e.target.value)}
              aria-label="Filtra per modalità"
              className={cn(selectClass, 'w-full')}
            >
              <option value="">Modalità</option>
              {MODALITY_OPTIONS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            <select
              value={filters.duration}
              onChange={(e) => onChange('duration', e.target.value)}
              aria-label="Filtra per durata"
              className={cn(selectClass, 'w-full')}
            >
              <option value="">Durata</option>
              {DURATION_OPTIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>

            {normativeRefs.length > 0 && (
              <select
                value={filters.norm}
                onChange={(e) => onChange('norm', e.target.value)}
                aria-label="Filtra per normativa"
                className={cn(selectClass, 'col-span-2 w-full')}
              >
                <option value="">Normativa di riferimento</option>
                {normativeRefs.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            )}

            {activeCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="col-span-2 flex items-center justify-center gap-1.5 rounded-lg border border-input py-2 text-sm font-semibold text-neutral-600 transition-colors duration-150 hover:text-neutral-900"
              >
                <X className="size-3.5" aria-hidden="true" />
                Rimuovi {activeCount} {activeCount === 1 ? 'filtro' : 'filtri'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
