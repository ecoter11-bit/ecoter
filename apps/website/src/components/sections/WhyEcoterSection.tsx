'use client'

import { motion } from 'framer-motion'
import { Award, BookOpen, Globe, Wrench, type LucideIcon } from 'lucide-react'
import { IconCircle } from '@ecoter/ui'
import { Container } from '@/components/layout'
import {
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

type Reason = {
  icon: LucideIcon
  title: string
  description: string
}

const REASONS: Reason[] = [
  {
    icon: Award,
    title: 'Esperienza comprovata',
    description:
      'Team di docenti specializzati e costantemente aggiornati sulle normative vigenti in sicurezza, qualità e gestione ambientale.',
  },
  {
    icon: BookOpen,
    title: 'Conformità garantita',
    description:
      'Ogni corso è progettato nel rispetto di D.Lgs. 81/08, Accordo Stato-Regioni 2025, D.Lgs. 152/06 e delle normative di riferimento del settore.',
  },
  {
    icon: Globe,
    title: 'Massima flessibilità',
    description:
      'Aula, online, blended, in house. Adattiamo orari, modalità e contenuti alle esigenze operative della tua organizzazione.',
  },
  {
    icon: Wrench,
    title: 'Approccio pratico',
    description:
      'Casi reali, esercitazioni pratiche e strumenti concreti — applicabili fin dal primo giorno in azienda, non solo teoria.',
  },
]

export function WhyEcoterSection() {
  return (
    <section
      aria-labelledby="perche-heading"
      className="relative overflow-hidden bg-neutral-25"
    >
      {/* Decorative pill/dash motif (parent-brand accent) — one sober touch,
       * sitewide, tucked behind the heading and hidden below lg so it never
       * competes with text on small screens. */}
      <div
        className="pointer-events-none absolute top-28 right-0 hidden -rotate-6 lg:flex lg:gap-2.5"
        aria-hidden="true"
      >
        <span className="h-3.5 w-10 rounded-full bg-amber-100" />
        <span className="h-3.5 w-16 rounded-full bg-amber-300" />
        <span className="h-3.5 w-8 rounded-full bg-brand-200" />
        <span className="h-3.5 w-20 rounded-full bg-brand-100" />
        <span className="h-3.5 w-12 rounded-full bg-eco-100" />
      </div>

      <Container className="section-padding relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerContainer} className="mb-14 text-center">
            <p className="mb-3 text-brand-700 overline">Perché sceglierci</p>
            <h2
              id="perche-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Perché ECOTER Academy
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-neutral-600">
              Quattro ragioni concrete per affidarci la formazione della tua
              organizzazione.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((reason) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.title}
                  variants={slideUpGentle}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-md"
                >
                  <IconCircle
                    color="brand"
                    icon={<Icon aria-hidden="true" />}
                    className="mb-5 transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="mb-2.5 font-heading text-base font-bold text-neutral-950">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {reason.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
