'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  HardHat,
  HeartHandshake,
  Leaf,
  Settings2,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Checkbox, IconCircle, type IconCircleColor } from '@ecoter/ui'
import { cn } from '@/lib/utils'
import { applyFilters, type FilterState } from '@/lib/catalog-filters'
import { AUDIENCE_OPTIONS } from '@/lib/catalog-options'
import type { Course, CategoryWithCount } from '@/types'

export type GuidedMode = 'argomento' | 'ruolo' | 'normativa'

const categoryIcon: Record<string, LucideIcon> = {
  HardHat,
  Leaf,
  Settings2,
  HeartHandshake,
}

/** Mirrors `categoryBadgeColor` (badge-mappings.ts) so the same category reads
 * the same hue here as everywhere else (CourseCard, badges) — narrowed to
 * `IconCircleColor` since IconCircle doesn't support Badge's extra semantic
 * colors (success/warning/error). */
const categoryIconColor: Record<string, IconCircleColor> = {
  sicurezza: 'blue',
  ambiente: 'brand',
  'sistemi-di-gestione': 'eco',
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
  normativeRefs: string[]
}

/** Passo 2 del flusso guidato — selezione multipla di opzioni in base alla modalità scelta al passo 1. */
export function StepSelection({
  mode,
  courses,
  categories,
  normativeRefs,
}: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

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
          }))
        : normativeRefs.map((n) => ({
            value: n,
            label: n,
            icon: FileText,
            color: 'brand' as const,
          }))

  const selected = new Set(splitMulti(searchParams.get(meta.urlParam) ?? ''))

  const filters: FilterState = {
    ...EMPTY_FILTERS,
    [meta.paramKey]: [...selected].join(','),
  }
  const count = applyFilters(courses, filters).length

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
    params.set('step', '2')
    params.set('mode', mode)

    startTransition(() => {
      router.replace(`/corsi?${params.toString()}`, { scroll: false })
    })
  }

  const resultsHref = (() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('step', '3')
    params.set('mode', mode)
    return `/corsi?${params.toString()}`
  })()

  const gridCols =
    mode === 'argomento'
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : 'sm:grid-cols-2 lg:grid-cols-3'

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

        <fieldset className="mb-28 border-0 p-0 lg:mb-8">
          <legend className="sr-only">
            {meta.title}: opzioni selezionabili
          </legend>
          <div className={cn('grid gap-4', gridCols)}>
            {options.map((opt) => {
              const isChecked = selected.has(opt.value)
              const Icon = opt.icon
              return (
                <Checkbox
                  key={opt.value}
                  checked={isChecked}
                  onCheckedChange={() => toggle(opt.value)}
                  label={
                    <span className="flex flex-1 items-center gap-3">
                      <IconCircle size="sm" color={opt.color} icon={<Icon />} />
                      <span className="flex-1 text-sm font-semibold text-neutral-900">
                        {opt.label}
                      </span>
                      {typeof opt.meta === 'number' && (
                        <span className="text-xs font-medium text-neutral-600">
                          {opt.meta}
                        </span>
                      )}
                    </span>
                  }
                  labelClassName={cn(
                    // scroll-mb-24 — clears the sticky "Mostra i corsi" bar
                    // (~65-73px tall) so a keyboard-focused card near the
                    // bottom of a long list (es. normativa) never lands
                    // hidden underneath it.
                    'w-full scroll-mb-24 items-center gap-3 rounded-2xl border border-neutral-500 bg-white p-4',
                    'transition-all duration-200 hover:border-brand-600 hover:bg-brand-50/40',
                    'has-[[data-checked]]:border-brand-600 has-[[data-checked]]:bg-brand-50 has-[[data-checked]]:ring-1 has-[[data-checked]]:ring-brand-300'
                  )}
                />
              )
            })}
          </div>
        </fieldset>
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
