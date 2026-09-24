'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CATALOG_PATH, areaHref, subareaHref } from '@/lib/catalog'

type Props = {
  /** Slug delle aree esistenti. */
  areas: string[]
  /** Sotto-aree esistenti con la loro area. */
  subareas: { slug: string; parent: string }[]
}

/** Parametri del vecchio flusso guidato di `/corsi` (passi, modalità, filtri). */
const LEGACY_PARAMS = [
  'step',
  'mode',
  'cat',
  'sub',
  'aud',
  'mod',
  'dur',
  'norm',
  'q',
  'sort',
]

function splitMulti(value: string | null): string[] {
  return (value ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

/**
 * Pagina del nuovo catalogo che corrisponde a un vecchio link: una sola
 * sotto-area → la sua pagina; una sola area → la pagina dell'area. Selezioni
 * multiple o filtri senza equivalente (destinatario, modalità, normativa…)
 * restano su `/corsi`.
 */
function legacyTarget(
  searchParams: URLSearchParams,
  areas: string[],
  subareas: Props['subareas']
): string | null {
  const cats = splitMulti(searchParams.get('cat'))
  const subs = splitMulti(searchParams.get('sub'))

  if (subs.length === 1) {
    const sub = subareas.find((s) => s.slug === subs[0])
    if (
      sub &&
      (cats.length === 0 || (cats.length === 1 && cats[0] === sub.parent))
    ) {
      return subareaHref(sub.parent, sub.slug)
    }
  }

  if (cats.length === 1 && cats[0] && areas.includes(cats[0])) {
    return areaHref(cats[0])
  }

  return null
}

/**
 * Compatibilità con i link del vecchio catalogo (`/corsi?step=3&cat=…&sub=…`),
 * che possono essere ancora in giro: segnalibri, post, pagine già indicizzate.
 *
 * Il reindirizzamento è lato client di proposito: su Netlify la cache di
 * `/corsi` varia solo su pochi parametri tecnici, quindi un redirect lato
 * server basato su `cat`/`sub` rischierebbe di essere scavalcato dalla copia
 * in cache di `/corsi`. Se il vecchio link non ha un equivalente, l'URL viene
 * solo ripulito — con l'API History nativa, che Next integra col router: è il
 * caso (stesso percorso, parametri diversi) in cui `router.replace` in
 * produzione non viene applicato.
 */
export function LegacyCatalogRedirect({ areas, subareas }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const target = legacyTarget(params, areas, subareas)

    if (target) {
      router.replace(target)
      return
    }

    if (LEGACY_PARAMS.some((key) => params.has(key))) {
      window.history.replaceState(null, '', CATALOG_PATH)
    }
  }, [searchParams, router, areas, subareas])

  return null
}
