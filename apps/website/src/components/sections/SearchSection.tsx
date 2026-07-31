'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout'
import {
  slideUp,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

const SUGGESTED: string[] = [
  'Sicurezza lavoratori',
  'Antincendio rischio medio',
  'RSPP modulo A',
  'Auditor ISO 9001',
]

export function SearchSection() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      router.push(`/corsi?q=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <section
      aria-label="Cerca un corso di formazione"
      className="border-b border-neutral-200 bg-neutral-50"
    >
      <Container className="py-12 lg:py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl"
        >
          <motion.p
            variants={slideUp}
            className="mb-3 text-center text-sm font-medium text-neutral-600"
          >
            Cerca nel catalogo
          </motion.p>

          <motion.form variants={slideUp} onSubmit={handleSubmit} role="search">
            <label htmlFor="homepage-search" className="sr-only">
              Cerca un corso di formazione
            </label>
            <div className="relative flex items-center">
              <Search
                className="pointer-events-none absolute left-4 size-5 shrink-0 text-neutral-400"
                aria-hidden="true"
              />
              <input
                id="homepage-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Es. sicurezza lavoratori, antincendio, ISO 9001…"
                className="w-full rounded-xl border border-neutral-200 bg-white py-4 pr-28 pl-12 text-base text-neutral-900 shadow-sm transition outline-none placeholder:text-neutral-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="submit"
                className="absolute right-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
              >
                Cerca
              </button>
            </div>
          </motion.form>

          <motion.div
            variants={slideUp}
            className="mt-4 flex flex-wrap items-center gap-2"
          >
            <span className="text-xs text-neutral-500">
              Ricerche frequenti:
            </span>
            {SUGGESTED.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQuery(s)
                  router.push(`/corsi?q=${encodeURIComponent(s)}`)
                }}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 transition hover:border-brand-600 hover:text-brand-600"
              >
                {s}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
