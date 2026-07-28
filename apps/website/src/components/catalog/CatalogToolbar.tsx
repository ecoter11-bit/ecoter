'use client'

import { Search, X, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { CategoryWithCount } from '@/types'

export type FilterState = {
  query: string
  category: string
  audience: string
  modality: string
  duration: string
  sort: string
  norm: string
}

type Props = {
  filters: FilterState
  categories: CategoryWithCount[]
  normativeRefs: string[]
  activeCount: number
  isPending: boolean
  onChange: (key: keyof FilterState, value: string) => void
  onReset: () => void
}

const AUDIENCE_OPTIONS = [
  { value: 'rspp-aspp', label: 'RSPP / ASPP' },
  { value: 'datori', label: 'Datori di lavoro' },
  { value: 'lavoratori', label: 'Lavoratori' },
  { value: 'dirigenti', label: 'Dirigenti / Preposti' },
  { value: 'qualita', label: 'Responsabili Qualità' },
  { value: 'alimentare', label: 'Settore Alimentare' },
  { value: 'squadra-emergenza', label: 'Squadra Emergenza' },
]

const MODALITY_OPTIONS = [
  { value: 'aula', label: 'In Aula' },
  { value: 'online', label: 'Online' },
  { value: 'blended', label: 'Blended' },
  { value: 'in-house', label: 'In House' },
]

const DURATION_OPTIONS = [
  { value: 'breve', label: 'Breve (< 8h)' },
  { value: 'medio', label: 'Medio (8–24h)' },
  { value: 'intensivo', label: 'Intensivo (> 24h)' },
]

const SORT_OPTIONS = [
  { value: 'recente', label: 'Più recenti' },
  { value: 'durata-asc', label: 'Durata crescente' },
  { value: 'durata-desc', label: 'Durata decrescente' },
  { value: 'prezzo-asc', label: 'Prezzo crescente' },
]

const selectClass = cn(
  'h-9 rounded-lg border border-neutral-200 bg-white pl-3 pr-7 text-sm text-neutral-700',
  "appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239BA2B0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[position:right_0.5rem_center] bg-no-repeat",
  'transition-colors duration-150 hover:border-neutral-300 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-300'
)

export function CatalogToolbar({
  filters,
  categories,
  normativeRefs,
  activeCount,
  isPending,
  onChange,
  onReset,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

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
          {/* Search input */}
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={filters.query}
              onChange={(e) => onChange('query', e.target.value)}
              placeholder="Cerca corsi, normative, temi…"
              aria-label="Cerca corsi"
              className={cn(
                'h-9 w-full rounded-lg border border-neutral-200 bg-white pr-3 pl-9 text-sm text-neutral-900 placeholder:text-neutral-400',
                'transition-colors duration-150 hover:border-neutral-300 focus:border-brand-400 focus:ring-1 focus:ring-brand-300 focus:outline-none'
              )}
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => onChange('query', '')}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-0.5 text-neutral-400 hover:text-neutral-700"
                aria-label="Cancella ricerca"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Desktop selects */}
          <div className="hidden items-center gap-2 lg:flex">
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
                onClick={onReset}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition-all duration-150 hover:border-neutral-300 hover:text-neutral-900"
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
                ? 'border-brand-300 bg-brand-50 text-brand-700'
                : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
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
                onClick={onReset}
                className="col-span-2 flex items-center justify-center gap-1.5 rounded-lg border border-neutral-200 py-2 text-sm font-semibold text-neutral-600 transition-colors duration-150 hover:text-neutral-900"
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
