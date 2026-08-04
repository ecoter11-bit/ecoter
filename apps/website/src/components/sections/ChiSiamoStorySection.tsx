'use client'

import { motion } from 'framer-motion'
import { Building2, Calendar, MapPin } from 'lucide-react'
import { Container } from '@/components/layout'
import {
  slideUp,
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

const FATTI = [
  { icon: Calendar, label: 'Attiva dal 2002' },
  { icon: MapPin, label: 'Pianoro (Bologna)' },
  { icon: Building2, label: 'Ingegneria e servizi HSE' },
]

export function ChiSiamoStorySection() {
  return (
    <section
      aria-labelledby="storia-heading"
      className="relative overflow-hidden bg-neutral-25"
    >
      <Container className="section-padding relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={slideUp} className="mb-8 text-center">
            <p className="mb-3 text-brand-700 overline">La nostra storia</p>
            <h2
              id="storia-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              ECOTER Academy è parte di ECO-TER
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mb-10 flex flex-wrap items-center justify-center gap-3"
            role="group"
            aria-label="Dati principali di ECO-TER Srl"
          >
            {FATTI.map((fatto) => {
              const Icon = fatto.icon
              return (
                <motion.span
                  key={fatto.label}
                  variants={slideUpGentle}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700"
                >
                  <Icon
                    className="size-4 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  {fatto.label}
                </motion.span>
              )
            })}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="space-y-5 text-pretty text-neutral-600"
          >
            <motion.p variants={slideUp}>
              <strong className="font-semibold text-neutral-950">
                ECO-TER Srl
              </strong>{' '}
              è una società di ingegneria e servizi con sede a Pianoro, in
              provincia di Bologna, attiva dal 2002. Opera su sicurezza sul
              lavoro, ambiente, igiene industriale, ingegneria e sistemi di
              gestione, con una specializzazione su grandi opere
              infrastrutturali e impiantistiche.
            </motion.p>
            <motion.p variants={slideUp}>
              <strong className="font-semibold text-neutral-950">
                ECOTER Academy
              </strong>{' '}
              è la divisione formazione del gruppo: lo stesso team tecnico che
              segue cantieri, verifiche e sistemi di gestione porta in aula
              un&apos;esperienza maturata direttamente sul campo, non solo
              teoria da manuale.
            </motion.p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
