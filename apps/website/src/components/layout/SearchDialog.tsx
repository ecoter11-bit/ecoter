'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CircleX, Search, X } from 'lucide-react'
import {
  buttonVariants,
  Dialog,
  DialogClose,
  DialogPopup,
  DialogTitle,
  Kbd,
} from '@ecoter/ui'
import { cn } from '@/lib/utils'
import { CATALOG_PATH } from '@/lib/catalog'
import { CALENDAR_PATH } from '@/config/nav'
import {
  SEARCH_INDEX_URL,
  prepareSearchIndex,
  searchCourseIndex,
  type PreparedEntry,
  type SearchIndexEntry,
} from '@/lib/course-search'

type SearchDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/* Termini di esempio, uno o due per area: ognuno trova almeno un corso. */
const SUGGESTIONS = [
  'RSPP',
  'Preposti',
  'Carrelli elevatori',
  'Ambienti confinati',
  'Rifiuti',
  'Sportello di ascolto',
]

const QUICK_LINKS = [
  { label: 'Tutti i corsi', href: CATALOG_PATH },
  { label: 'Calendario corsi', href: CALENDAR_PATH },
  { label: 'Domande frequenti', href: '/faq' },
  { label: 'Aziende e professionisti', href: '/soluzioni/aziende' },
]

const MAX_RESULTS = 8

const courseHref = (slug: string) => `${CATALOG_PATH}/${slug}`

/* L'indice si scarica una volta per visita e resta condiviso tra le
   aperture. Se il download fallisce si riprova alla prossima apertura. */
let indexPromise: Promise<PreparedEntry[]> | null = null

function loadSearchIndex(): Promise<PreparedEntry[]> {
  indexPromise ??= fetch(SEARCH_INDEX_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`Indice di ricerca: HTTP ${res.status}`)
      return res.json() as Promise<SearchIndexEntry[]>
    })
    .then(prepareSearchIndex)
    .catch((err: unknown) => {
      indexPromise = null
      throw err
    })
  return indexPromise
}

function countLabel(count: number): string {
  return count === 1 ? '1 corso trovato' : `${count} corsi trovati`
}

const catalogLinkClass =
  'font-semibold text-brand-700 underline underline-offset-4'

/**
 * Ricerca dei corsi dall'header (bottone "Cerca corsi…" e Ctrl/⌘+K).
 *
 * La finestra è il `Dialog` di `@ecoter/ui` (focus intrappolato, Esc, clic
 * fuori, focus che torna al bottone, mai più alta dello schermo). I
 * risultati sono link veri alle schede: Tab ci arriva normalmente, e in più
 * dal campo Freccia giù porta al primo risultato, Frecce su/giù scorrono
 * l'elenco, Invio nel campo apre il primo. Il numero di risultati è
 * annunciato agli screen reader quando si smette di scrivere, non a ogni
 * lettera; come usare le frecce glielo dice la descrizione del campo.
 */
export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<PreparedEntry[] | null>(null)
  const [loadFailed, setLoadFailed] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!open || index) return
    let cancelled = false
    loadSearchIndex().then(
      (loaded) => {
        if (cancelled) return
        setIndex(loaded)
        setLoadFailed(false)
      },
      () => {
        if (!cancelled) setLoadFailed(true)
      }
    )
    return () => {
      cancelled = true
    }
  }, [open, index])

  const trimmed = query.trim()
  const results = useMemo(
    () => (index && trimmed ? searchCourseIndex(index, trimmed) : []),
    [index, trimmed]
  )
  const shown = results.slice(0, MAX_RESULTS)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!trimmed) setAnnouncement('')
      else if (!index)
        setAnnouncement(
          loadFailed
            ? 'Non riesco a caricare l’elenco dei corsi.'
            : 'Carico i corsi…'
        )
      else if (results.length === 0)
        setAnnouncement(`Nessun corso trovato per ${trimmed}.`)
      else if (results.length > MAX_RESULTS)
        setAnnouncement(
          `${countLabel(results.length)}, mostrati i primi ${MAX_RESULTS}.`
        )
      else setAnnouncement(`${countLabel(results.length)}.`)
    }, 500)
    return () => clearTimeout(timer)
  }, [trimmed, index, loadFailed, results.length])

  const close = () => onOpenChange(false)

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const first = shown[0]
    if (!first) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      listRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    } else if (event.key === 'Enter') {
      event.preventDefault()
      close()
      router.push(courseHref(first.entry.slug))
    }
  }

  function onListKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    const links = Array.from(
      listRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []
    )
    const current = links.indexOf(document.activeElement as HTMLAnchorElement)
    if (current === -1) return
    let next: HTMLElement | null | undefined
    if (event.key === 'ArrowDown') next = links[current + 1]
    else if (event.key === 'ArrowUp')
      next = current === 0 ? inputRef.current : links[current - 1]
    else if (event.key === 'Home') next = links[0]
    else if (event.key === 'End') next = links[links.length - 1]
    else return
    event.preventDefault()
    next?.focus()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) setQuery('')
      }}
    >
      <DialogPopup placement="center" initialFocus={inputRef}>
        <DialogTitle className="sr-only">Cerca corsi</DialogTitle>

        {/* Campo: il focus si vede come filetto `--ring` sotto la riga. */}
        <div className="flex shrink-0 items-center gap-2 border-b-2 border-neutral-200 py-2 pr-2 pl-4 transition-colors has-[input:focus-visible]:border-ring">
          <Search
            className="size-5 shrink-0 text-neutral-500"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Titolo, codice o argomento…"
            aria-label="Cerca corsi"
            aria-describedby="search-dialog-help"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="go"
            className="min-w-0 flex-1 bg-transparent py-1.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
                'text-neutral-500'
              )}
              aria-label="Cancella la ricerca"
            >
              <CircleX className="size-4" aria-hidden="true" />
            </button>
          )}
          {/* Chiusura: su touch una X (niente tasto Esc da premere), da `sm`
              il tasto "Esc", con "Esc" anche nel nome accessibile (WCAG
              2.5.3: chi usa i comandi vocali dice quello che vede). */}
          <DialogClose
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon-lg' }),
              'text-neutral-600 sm:hidden'
            )}
            aria-label="Chiudi la ricerca"
          >
            <X className="size-5" aria-hidden="true" />
          </DialogClose>
          <DialogClose
            className={cn(
              buttonVariants({ variant: 'outline', size: 'xs' }),
              'hidden text-neutral-600 sm:inline-flex'
            )}
          >
            Esc<span className="sr-only"> – chiudi la ricerca</span>
          </DialogClose>
        </div>

        <p id="search-dialog-help" className="sr-only">
          Scrivi per cercare tra i corsi. Freccia giù porta ai risultati, Invio
          apre il primo.
        </p>

        <div className="max-h-96 min-h-0 flex-auto overflow-y-auto p-2 sm:p-3">
          {trimmed === '' ? (
            <div className="space-y-5 p-2">
              <section aria-labelledby="search-suggestions-heading">
                <h3
                  id="search-suggestions-heading"
                  className="mb-2.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  Prova a cercare
                </h3>
                <ul role="list" className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((term) => (
                    <li key={term}>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery(term)
                          inputRef.current?.focus()
                        }}
                        className="rounded-full border border-border px-3 py-1 text-sm text-neutral-700 transition-colors hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="search-links-heading">
                <h3
                  id="search-links-heading"
                  className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  Link rapidi
                </h3>
                <ul role="list" className="space-y-0.5">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={close}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-foreground"
                      >
                        {link.label}
                        <ArrowRight
                          className="size-3.5 text-neutral-400"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ) : !index ? (
            <div className="px-3 py-8 text-center text-sm text-neutral-600">
              {loadFailed ? (
                <p>
                  Non riesco a caricare l&apos;elenco dei corsi. Riprova tra
                  poco, oppure{' '}
                  <Link
                    href={CATALOG_PATH}
                    onClick={close}
                    className={catalogLinkClass}
                  >
                    sfoglia il catalogo
                  </Link>
                  .
                </p>
              ) : (
                <p>Carico i corsi…</p>
              )}
            </div>
          ) : results.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-neutral-600">
              <p className="text-neutral-800">
                Nessun corso trovato per{' '}
                <strong className="text-neutral-950">
                  &ldquo;{trimmed}&rdquo;
                </strong>
                .
              </p>
              <p className="mt-1">
                Prova con un&apos;altra parola, oppure{' '}
                <Link
                  href={CATALOG_PATH}
                  onClick={close}
                  className={catalogLinkClass}
                >
                  sfoglia il catalogo
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
              <h3
                id="search-results-heading"
                className="px-3 pt-1 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
              >
                {countLabel(results.length)}
              </h3>
              <ul
                ref={listRef}
                role="list"
                aria-labelledby="search-results-heading"
                onKeyDown={onListKeyDown}
                className="space-y-0.5"
              >
                {shown.map(({ entry }) => (
                  <li key={entry.slug}>
                    <Link
                      href={courseHref(entry.slug)}
                      onClick={close}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-neutral-50"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm leading-snug font-semibold text-neutral-950">
                          {entry.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-neutral-600">
                          {[
                            entry.code,
                            entry.categoryName,
                            entry.subcategoryName,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                      </span>
                      <ArrowRight
                        className="size-4 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length > shown.length && (
                <p className="px-3 pt-2 pb-1 text-xs text-neutral-600">
                  Sono i primi {shown.length} di {results.length}: aggiungi una
                  parola per restringere, oppure{' '}
                  <Link
                    href={CATALOG_PATH}
                    onClick={close}
                    className={catalogLinkClass}
                  >
                    sfoglia il catalogo
                  </Link>
                  .
                </p>
              )}
            </>
          )}
        </div>

        <p role="status" className="sr-only">
          {announcement}
        </p>

        {/* Legenda dei tasti, da `sm` in su (su touch non serve), solo con
            i tasti che in quel momento fanno qualcosa. Nascosta ai lettori
            di schermo: per loro c'è la descrizione del campo. */}
        <div
          className="hidden shrink-0 items-center gap-4 border-t border-border bg-neutral-50 px-4 py-2 text-xs text-muted-foreground sm:flex"
          aria-hidden="true"
        >
          {shown.length > 0 && (
            <>
              <span>
                <Kbd>↑</Kbd> <Kbd>↓</Kbd> per scegliere
              </span>
              <span>
                <Kbd>Invio</Kbd> per aprire
              </span>
            </>
          )}
          <span>
            <Kbd>Esc</Kbd> per chiudere
          </span>
        </div>
      </DialogPopup>
    </Dialog>
  )
}
