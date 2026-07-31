'use client'

import { motion } from 'framer-motion'
import { Award, BookOpen, Globe, Wrench, type LucideIcon } from 'lucide-react'
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
      'Ogni corso è progettato nel rispetto di D.Lgs. 81/08, ISO 9001, D.M. 02/09/2021 e delle normative di riferimento del settore.',
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
    <section aria-labelledby="perche-heading" className="bg-neutral-25">
      <Container className="section-padding">
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
              className="font-heading text-3xl font-extrabold tracking-tight text-balance text-neutral-950 lg:text-4xl"
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
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-600 hover:shadow-md"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
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
