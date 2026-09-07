'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { StepModeCards } from './StepModeCards'
import { StepSelection, type GuidedMode } from './StepSelection'
import { CatalogClient } from '@/app/corsi/CatalogClient'
import type { Course, CategoryWithCount, SubcategoryWithCount } from '@/types'

type Props = {
  courses: Course[]
  categories: CategoryWithCount[]
  subcategories: SubcategoryWithCount[]
  normativeRefs: string[]
}

const VALID_MODES: GuidedMode[] = ['argomento', 'ruolo', 'normativa']
const FILTER_PARAMS = ['q', 'cat', 'sub', 'aud', 'mod', 'dur', 'norm']

const MODE_LABEL: Record<GuidedMode, string> = {
  argomento: 'Per argomento',
  ruolo: 'Per figura professionale',
  normativa: 'Per normativa',
}

/**
 * Orchestra il flusso guidato a 3 passi di `/corsi`. Lo step vive nell'URL
 * (`?step=1|2|3`) insieme a modalità e selezione — deep-linkabile e
 * condivisibile. Se `step` manca ma sono già presenti parametri di filtro
 * (link interni pre-esistenti tipo `/corsi?cat=sicurezza`), si salta
 * direttamente al passo 3 invece di intercettarli sulla schermata "Come vuoi
 * cercare?".
 */
export function GuidedCatalog({
  courses,
  categories,
  subcategories,
  normativeRefs,
}: Props) {
  const searchParams = useSearchParams()

  const stepParam = searchParams.get('step')
  const modeParam = searchParams.get('mode')
  const mode = VALID_MODES.includes(modeParam as GuidedMode)
    ? (modeParam as GuidedMode)
    : null

  const hasFilterParams = FILTER_PARAMS.some((k) => searchParams.get(k))

  const step =
    stepParam === '3'
      ? 3
      : stepParam === '2' && mode
        ? 2
        : stepParam === '1'
          ? 1
          : hasFilterParams
            ? 3
            : 1

  if (step === 1) {
    return <StepModeCards />
  }

  if (step === 2 && mode) {
    return (
      <StepSelection
        mode={mode}
        courses={courses}
        categories={categories}
        subcategories={subcategories}
        normativeRefs={normativeRefs}
      />
    )
  }

  const editSelectionHref = (() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('step', '2')
    return `/corsi?${params.toString()}`
  })()

  return (
    <>
      <div className="border-b border-neutral-100 bg-white">
        <div className="container-default flex flex-wrap items-center gap-x-4 gap-y-1 py-3 text-sm">
          <span className="text-neutral-600">Passo 3 di 3</span>
          {mode && (
            <>
              <span className="text-neutral-300" aria-hidden="true">
                ·
              </span>
              <span className="font-medium text-neutral-700">
                {MODE_LABEL[mode]}
              </span>
              <Link
                href={editSelectionHref}
                className="flex items-center gap-1 font-medium text-brand-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Modifica selezione
              </Link>
            </>
          )}
          <Link
            href="/corsi"
            className="ml-auto font-medium text-neutral-600 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Ricomincia
          </Link>
        </div>
      </div>

      <CatalogClient
        courses={courses}
        categories={categories}
        subcategories={subcategories}
        normativeRefs={normativeRefs}
      />
    </>
  )
}
