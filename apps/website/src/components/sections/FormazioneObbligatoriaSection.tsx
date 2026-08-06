'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldCheck, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@ecoter/ui'
import { Container } from '@/components/layout'
import {
  slideUp,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

const OBBLIGHI: string[] = [
  'Lavoratori, preposti e dirigenti (D.Lgs. 81/08)',
  'Addetti antincendio (D.M. 02/09/2021)',
  'RSPP e ASPP (Accordo Stato-Regioni)',
  'Operatori alimentari HACCP (Reg. CE 852/2004)',
]

export function FormazioneObbligatoriaSection() {
  return (
    <section aria-labelledby="obbligatoria-heading" className="bg-brand-50">
      <Container className="section-padding">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="overflow-hidden rounded-2xl border border-brand-100 bg-white p-8 md:p-12"
          >
            <div className="lg:flex lg:items-center lg:gap-12">
              <div className="flex-1">
                <motion.p
                  variants={slideUp}
                  className="mb-4 text-brand-600 overline"
                >
                  Sei in regola?
                </motion.p>
                <motion.h2
                  id="obbligatoria-heading"
                  variants={slideUp}
                  className="mb-4 font-heading text-2xl font-light tracking-tight text-balance text-neutral-950 md:text-3xl"
                >
                  Formazione obbligatoria: trova il tuo percorso in pochi click
                </motion.h2>
                <motion.p
                  variants={slideUp}
                  className="mb-6 text-pretty text-neutral-600"
                >
                  La normativa prevede percorsi formativi diversi a seconda
                  della figura professionale, del settore ATECO e del livello di
                  rischio dell&apos;azienda. Filtra il catalogo per normativa e
                  trova subito il percorso corretto.
                </motion.p>

                <motion.ul
                  variants={staggerContainer}
                  className="mb-8 space-y-2"
                  aria-label="Esempi di formazione obbligatoria"
                >
                  {OBBLIGHI.map((item) => (
                    <motion.li
                      key={item}
                      variants={slideUp}
                      className="flex items-start gap-3 text-sm text-neutral-600"
                    >
                      <ShieldCheck
                        className="mt-0.5 size-4 shrink-0 text-brand-600"
                        aria-hidden="true"
                      />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div variants={slideUp}>
                  <Link
                    href="/corsi"
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      'h-12 gap-2 bg-brand-600 px-8 text-base font-semibold text-white hover:bg-brand-700'
                    )}
                  >
                    Trova il corso per normativa
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              </div>

              <motion.div
                variants={slideUp}
                className="mt-10 hidden shrink-0 lg:mt-0 lg:block"
                aria-hidden="true"
              >
                <div className="flex size-40 items-center justify-center rounded-full bg-brand-50 ring-1 ring-brand-100">
                  <ShieldCheck className="size-20 text-brand-600" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
