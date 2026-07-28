'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { overlayVariants } from '@/components/motion/variants'

type SearchDialogProps = {
  open: boolean
  onClose: () => void
}

const POPULAR_SEARCHES = [
  'Sicurezza sul lavoro',
  'RSPP',
  'Antincendio',
  'ISO 9001',
  'Privacy GDPR',
  'Primo soccorso',
]

const QUICK_LINKS = [
  { label: 'Tutti i corsi', href: '/corsi' },
  { label: 'Calendario corsi', href: '/calendario' },
  { label: 'Soluzioni aziendali', href: '/soluzioni/aziende' },
]

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Render-time reset: clear query when dialog closes (avoids setState-in-effect)
  const [prevOpen, setPrevOpen] = useState(open)
  if (prevOpen !== open) {
    setPrevOpen(open)
    if (!open && query !== '') setQuery('')
  }

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-[60] bg-neutral-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="search-dialog"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.0, 0.0, 0.2, 1.0] }}
            className="fixed top-20 right-4 left-4 z-[61] mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Cerca corsi"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search
                className="h-5 w-5 shrink-0 text-neutral-400"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="search"
                placeholder="Cerca corsi, categorie, argomenti…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-base text-foreground placeholder:text-neutral-400 focus:outline-none"
                aria-label="Termini di ricerca"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="rounded p-1 transition-colors hover:bg-neutral-100"
                  aria-label="Cancella ricerca"
                  type="button"
                >
                  <X className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                </button>
              )}
              <button
                onClick={onClose}
                className="ml-1 rounded-md border border-border px-2 py-1 text-xs text-neutral-500 transition-colors hover:bg-neutral-50"
                aria-label="Chiudi ricerca"
                type="button"
              >
                ESC
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              {query.trim() === '' ? (
                <div className="space-y-5">
                  <section>
                    <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                      <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                      Ricerche popolari
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          type="button"
                          className="rounded-full border border-border px-3 py-1 text-sm text-neutral-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      Link rapidi
                    </p>
                    <ul className="space-y-0.5" role="list">
                      {QUICK_LINKS.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-foreground"
                          >
                            {link.label}
                            <ArrowRight
                              className="h-3.5 w-3.5 text-neutral-400"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Search
                    className="mx-auto mb-3 h-8 w-8 text-neutral-200"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-neutral-500">
                    Ricerca per{' '}
                    <strong className="text-foreground">
                      &ldquo;{query}&rdquo;
                    </strong>
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">
                    Il motore di ricerca sarà disponibile a breve.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border bg-neutral-50 px-4 py-2 text-xs text-neutral-400">
              <span>
                Premi{' '}
                <kbd className="mx-0.5 rounded border border-neutral-200 bg-white px-1 py-0.5 font-mono text-neutral-500">
                  ↵
                </kbd>{' '}
                per cercare
              </span>
              <span>
                <kbd className="mr-0.5 rounded border border-neutral-200 bg-white px-1 py-0.5 font-mono text-neutral-500">
                  ⌘K
                </kbd>{' '}
                per aprire / chiudere
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
