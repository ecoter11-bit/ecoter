'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import type { Faq } from '@/types'
import { Container } from '@/components/layout'
import {
  slideUp,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'
import { cn } from '@/lib/utils'

const FAQS: Faq[] = [
  {
    id: 'faq-1',
    question:
      'I corsi ECOTER Academy sono riconosciuti dalle autorità competenti?',
    answer:
      'Sì. Tutti i corsi sono progettati nel rispetto dei requisiti normativi vigenti (D.Lgs. 81/08, Accordo Stato-Regioni, ISO, D.M. 02/09/2021). Al termine di ogni percorso viene rilasciato un attestato di frequenza valido ai fini di legge.',
  },
  {
    id: 'faq-2',
    question: 'È possibile organizzare la formazione direttamente in azienda?',
    answer:
      "Il servizio in house è tra i più richiesti: i nostri docenti si recano nella vostra sede e svolgono il corso con il personale, adattando contenuti e orari alle esigenze operative dell'azienda.",
  },
  {
    id: 'faq-3',
    question: "Come ottengo l'attestato di partecipazione?",
    answer:
      "Al termine del corso, dopo aver verificato la presenza e superato eventuali verifiche di apprendimento previste dalla normativa, riceverai l'attestato. Per i corsi online il processo è automatizzato; per quelli in aula viene consegnato fisicamente o inviato via email in PDF.",
  },
  {
    id: 'faq-4',
    question:
      'Qual è la differenza tra formazione in aula e formazione online?',
    answer:
      'La formazione in aula consente interazione diretta con il docente ed è obbligatoria per alcune tipologie di corsi (es. antincendio con parte pratica). La formazione online (FAD) è flessibile e accessibile da qualsiasi dispositivo; è ammessa dalla normativa per la maggior parte dei percorsi teorici.',
  },
]

export function FaqPreviewSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section aria-labelledby="faq-heading" className="bg-white">
      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={slideUp} className="mb-10 text-center">
            <p className="mb-3 text-brand-700 overline">Domande frequenti</p>
            <h2
              id="faq-heading"
              className="font-heading text-3xl font-extrabold tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Hai domande?
            </h2>
          </motion.div>

          <motion.div
            variants={slideUp}
            className="divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200"
          >
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id
              const btnId = `faq-btn-${faq.id}`
              const answerId = `faq-answer-${faq.id}`

              return (
                <div key={faq.id}>
                  <button
                    id={btnId}
                    type="button"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className={cn(
                      'flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition',
                      'focus-visible:outline-inset hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600',
                      isOpen && 'bg-neutral-50'
                    )}
                  >
                    <span className="font-medium text-neutral-950">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'size-5 shrink-0 text-neutral-400 transition-transform duration-200',
                        isOpen && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.0, 0.0, 0.2, 1.0],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-neutral-600">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>

          <motion.div variants={slideUp} className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
            >
              Tutte le domande frequenti
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
