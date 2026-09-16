'use client'

import Link from 'next/link'
import { useRef, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  HardHat,
  HeartHandshake,
  Leaf,
  ListFilter,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import { Button, Checkbox, IconCircle, type IconCircleColor } from '@ecoter/ui'
import { cn } from '@/lib/utils'
import { applyFilters, type FilterState } from '@/lib/catalog-filters'
import { AUDIENCE_OPTIONS } from '@/lib/catalog-options'
import { categoryBadgeLabel } from '@/lib/badge-mappings'
import {
  defaultSubcategoryIcon,
  isSubcategoryContext,
  subcategoryIcon,
  subcategoryIconColor,
} from '@/lib/subcategory-ui'
import type { Course, CategoryWithCount, SubcategoryWithCount } from '@/types'

export type GuidedMode = 'argomento' | 'ruolo' | 'normativa'

const categoryIcon: Record<string, LucideIcon> = {
  HardHat,
  Leaf,
  HeartHandshake,
}

/** Mirrors `categoryBadgeColor` (badge-mappings.ts) so the same category reads
 * the same hue here as everywhere else (CourseCard, badges) — narrowed to
 * `IconCircleColor` since IconCircle doesn't support Badge's extra semantic
 * colors (success/warning/error/level-1/level-2/level-3). */
const categoryIconColor: Record<string, IconCircleColor> = {
  sicurezza: 'blue',
  ambiente: 'brand',
  'benessere-psico-sociale': 'amber',
}

const MODE_META: Record<
  GuidedMode,
  {
    paramKey: 'category' | 'audience' | 'norm'
    urlParam: 'cat' | 'aud' | 'norm'
    title: string
    hint: string
  }
> = {
  argomento: {
    paramKey: 'category',
    urlParam: 'cat',
    title: 'Per argomento',
    hint: 'Scegli una o più aree tematiche.',
  },
  ruolo: {
    paramKey: 'audience',
    urlParam: 'aud',
    title: 'Per figura professionale',
    hint: 'Scegli uno o più ruoli.',
  },
  normativa: {
    paramKey: 'norm',
    urlParam: 'norm',
    title: 'Per normativa',
    hint: 'Scegli una o più normative di riferimento.',
  },
}

const EMPTY_FILTERS: FilterState = {
  query: '',
  category: '',
  subcategory: '',
  audience: '',
  modality: '',
  duration: '',
  sort: 'recente',
  norm: '',
}

function splitMulti(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

type Option = {
  value: string
  label: string
  icon: LucideIcon
  color: IconCircleColor
  meta?: number
}

type Props = {
  mode: GuidedMode
  courses: Course[]
  categories: CategoryWithCount[]
  subcategories: SubcategoryWithCount[]
  normativeRefs: string[]
}

/** Passo 2 del flusso guidato — selezione multipla di opzioni in base alla modalità scelta al passo 1. */
export function StepSelection({
  mode,
  courses,
  categories,
  subcategories,
  normativeRefs,
}: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  /* Il bottone "Tutta la <categoria>" si smonta appena lo si usa (esiste solo
     con almeno una sotto-area attiva): senza spostare il focus finirebbe sul
     <body> e il Tab successivo ripartirebbe dall'inizio pagina (WCAG 2.4.3).
     Lo riportiamo sul riepilogo, che è anche il testo che si aggiorna. */
  const subSummaryRef = useRef<HTMLParagraphElement>(null)

  const meta = MODE_META[mode]

  const options: Option[] =
    mode === 'argomento'
      ? categories.map((c) => ({
          value: c.slug,
          label: c.name,
          icon: categoryIcon[c.icon] ?? HardHat,
          color: categoryIconColor[c.slug] ?? 'brand',
          meta: c.courseCount,
        }))
      : mode === 'ruolo'
        ? AUDIENCE_OPTIONS.map((a) => ({
            value: a.value,
            label: a.label,
            icon: Users,
            color: 'brand' as const,
            meta: applyFilters(courses, { ...EMPTY_FILTERS, audience: a.value })
              .length,
          }))
        : normativeRefs.map((n) => ({
            value: n,
            label: n,
            icon: FileText,
            color: 'brand' as const,
            meta: applyFilters(courses, { ...EMPTY_FILTERS, norm: n }).length,
          }))

  const selected = new Set(splitMulti(searchParams.get(meta.urlParam) ?? ''))
  const subSelected = new Set(splitMulti(searchParams.get('sub') ?? ''))

  /* Il drill-down per sotto-area compare solo quando la scelta è "Sicurezza
     sul Lavoro" e nient'altro: è l'unica categoria abbastanza grande (51
     corsi) da giustificarlo, e mescolarla ad altre renderebbe il conteggio
     ambiguo. Le altre aree restano una scelta diretta, come prima. */
  const showSubcategories =
    mode === 'argomento' && isSubcategoryContext([...selected].join(','))

  /* Nome della categoria padre preso dal contenuto, con lo stesso fallback
     usato dalla pagina di dettaglio (`categoryBadgeLabel`) invece di una
     stringa fissa: se la categoria viene rinominata, il testo la segue. */
  const parentSlug = subcategories[0]?.parent
  const parentCategoryName =
    categories.find((c) => c.slug === parentSlug)?.name ??
    (parentSlug ? (categoryBadgeLabel[parentSlug] ?? parentSlug) : '')

  const filters: FilterState = {
    ...EMPTY_FILTERS,
    [meta.paramKey]: [...selected].join(','),
    subcategory: showSubcategories ? [...subSelected].join(',') : '',
  }
  const count = applyFilters(courses, filters).length

  function commit(params: URLSearchParams) {
    params.set('step', '2')
    params.set('mode', mode)

    startTransition(() => {
      router.replace(`/corsi?${params.toString()}`, { scroll: false })
    })
  }

  function toggle(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    const next = new Set(selected)
    if (next.has(value)) {
      next.delete(value)
    } else {
      next.add(value)
    }
    if (next.size) {
      params.set(meta.urlParam, [...next].join(','))
    } else {
      params.delete(meta.urlParam)
    }

    /* Le sotto-aree valgono solo dentro "Sicurezza e basta": appena la
       selezione cambia forma vanno rimosse, altrimenti resterebbe nell'URL un
       filtro non più visibile capace di azzerare i risultati. */
    if (mode !== 'argomento' || !isSubcategoryContext([...next].join(','))) {
      params.delete('sub')
    }

    commit(params)
  }

  function toggleSubcategory(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    const next = new Set(subSelected)
    if (next.has(value)) {
      next.delete(value)
    } else {
      next.add(value)
    }
    if (next.size) {
      params.set('sub', [...next].join(','))
    } else {
      params.delete('sub')
    }

    commit(params)
  }

  function clearSubcategories() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('sub')
    commit(params)
    subSummaryRef.current?.focus()
  }

  const resultsHref = (() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('step', '3')
    params.set('mode', mode)
    return `/corsi?${params.toString()}`
  })()

  /* Le colonne seguono il numero di opzioni, per non lasciare mai l'ultima
     riga con una sola card spaiata: 3 aree passano da 1 a 3 colonne saltando
     il gradino a 2, 4 ruoli fanno 2×2 e poi 4 in fila, e le normative —
     lista lunga e di lunghezza variabile — restano sul 2/3 di prima. */
  const gridCols =
    options.length === 3
      ? 'md:grid-cols-3'
      : options.length === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3'

  // scroll-mb-24 — clears the sticky "Mostra i corsi" bar (~65-73px tall) so a
  // keyboard-focused card near the bottom of a long list (es. normativa) never
  // lands hidden underneath it.
  const cardClass = cn(
    'w-full scroll-mb-24 items-center gap-3 rounded-2xl border border-neutral-500 bg-white p-4',
    'transition-all duration-200 hover:border-brand-600 hover:bg-brand-50/40',
    'has-[[data-checked]]:border-brand-600 has-[[data-checked]]:bg-brand-50 has-[[data-checked]]:ring-1 has-[[data-checked]]:ring-brand-300'
  )

  function optionLabel(opt: Option) {
    const Icon = opt.icon
    return (
      <span className="flex flex-1 items-center gap-3">
        <IconCircle size="sm" color={opt.color} icon={<Icon />} />
        <span className="flex-1 text-sm font-semibold text-neutral-900">
          {opt.label}
        </span>
        {typeof opt.meta === 'number' && (
          <span className="text-xs font-medium text-neutral-600">
            <span aria-hidden="true">{opt.meta}</span>
            <span className="sr-only">
              {opt.meta === 1 ? '1 corso' : `${opt.meta} corsi`}
            </span>
          </span>
        )}
      </span>
    )
  }

  return (
    <section
      aria-labelledby="step2-heading"
      className="border-b border-neutral-200 bg-neutral-50"
    >
      <div className="container-default py-12 lg:py-16">
        <Link
          href="/corsi"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors duration-150 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Torna a &ldquo;Come vuoi cercare?&rdquo;
        </Link>

        <div className="mb-8">
          <p className="mb-3 text-brand-700 overline">Passo 2 di 3</p>
          <h2
            id="step2-heading"
            className="font-heading text-2xl font-bold text-balance text-neutral-950 lg:text-3xl"
          >
            {meta.title}
          </h2>
          <p className="mt-2 text-neutral-600">{meta.hint}</p>
        </div>

        <fieldset
          className={cn(
            'border-0 p-0',
            showSubcategories ? 'mb-8' : 'mb-28 lg:mb-8'
          )}
        >
          <legend className="sr-only">
            {meta.title}: opzioni selezionabili
          </legend>
          <div className={cn('grid gap-4', gridCols)}>
            {options.map((opt) => (
              <Checkbox
                key={opt.value}
                checked={selected.has(opt.value)}
                onCheckedChange={() => toggle(opt.value)}
                label={optionLabel(opt)}
                labelClassName={cardClass}
              />
            ))}
          </div>
        </fieldset>

        {/* ─── Drill-down Sicurezza: solo quando è l'unica categoria scelta ── */}
        {showSubcategories && (
          <fieldset
            className={cn(
              'rounded-2xl border border-neutral-200 bg-white p-5 lg:p-6',
              'mb-28 lg:mb-8'
            )}
          >
            <legend className="flex items-center gap-2 px-1 font-heading text-sm font-bold text-neutral-950">
              <ListFilter
                className="size-4 text-brand-600"
                aria-hidden="true"
              />
              Affina per area della Sicurezza
            </legend>

            <div className="mt-3 mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <p
                ref={subSummaryRef}
                tabIndex={-1}
                className="text-sm text-neutral-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
              >
                {subSelected.size === 0 ? (
                  <>
                    Stai vedendo tutta la {parentCategoryName}:{' '}
                    <span className="font-medium text-neutral-900">
                      {count} corsi
                    </span>
                    . Scegli una o più aree per restringere.
                  </>
                ) : (
                  <>
                    <span className="font-medium text-neutral-900">
                      {subSelected.size}{' '}
                      {subSelected.size === 1
                        ? 'area selezionata'
                        : 'aree selezionate'}
                    </span>{' '}
                    su {subcategories.length}.
                  </>
                )}
              </p>

              {subSelected.size > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSubcategories}
                  className="shrink-0"
                >
                  <X aria-hidden="true" />
                  Tutta la {parentCategoryName}
                </Button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {subcategories.map((sub) => (
                <Checkbox
                  key={sub.slug}
                  checked={subSelected.has(sub.slug)}
                  onCheckedChange={() => toggleSubcategory(sub.slug)}
                  label={optionLabel({
                    value: sub.slug,
                    label: sub.name,
                    icon: subcategoryIcon[sub.icon] ?? defaultSubcategoryIcon,
                    color: subcategoryIconColor,
                    meta: sub.courseCount,
                  })}
                  labelClassName={cardClass}
                />
              ))}
            </div>
          </fieldset>
        )}
      </div>

      {/* Sticky action bar — always visible so "Mostra i corsi" stays reachable on long lists (es. normativa) */}
      <div
        className={cn(
          'sticky bottom-0 z-20 border-t border-neutral-200 bg-white/95 backdrop-blur-sm',
          isPending && 'opacity-60 transition-opacity duration-150'
        )}
      >
        <div className="container-default flex items-center justify-between gap-4 py-4">
          <p
            className="text-sm text-neutral-600"
            aria-live="polite"
            aria-atomic="true"
          >
            {selected.size > 0 && (
              <span className="mr-1.5 font-medium text-neutral-900">
                {selected.size}{' '}
                {selected.size === 1 ? 'selezionato' : 'selezionati'}
              </span>
            )}
            {count === 0
              ? 'Nessun corso corrisponde'
              : count === 1
                ? '1 corso trovato'
                : `${count} corsi trovati`}
          </p>
          <Link
            href={resultsHref}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Mostra i corsi ({count})
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
