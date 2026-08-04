'use client'

import { motion } from 'framer-motion'
import {
  Microscope,
  UserCheck,
  Wrench,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { Container } from '@/components/layout'
import {
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

type Valore = {
  icon: LucideIcon
  title: string
  description: string
}

const VALORI: Valore[] = [
  {
    icon: Microscope,
    title: 'Competenza tecnica e scientifica',
    description:
      "Ogni corso nasce dall'esperienza diretta di ECO-TER su sicurezza, ambiente e sistemi di gestione, non da contenuti standardizzati.",
  },
  {
    icon: UserCheck,
    title: 'Docenti specializzati e aggiornati',
    description:
      "I nostri formatori sono professionisti del settore, costantemente aggiornati sull'evoluzione normativa e tecnica.",
  },
  {
    icon: Wrench,
    title: 'Approccio pratico',
    description:
      'Casi reali e strumenti applicabili da subito in azienda, non solo teoria da manuale.',
  },
  {
    icon: ShieldCheck,
    title: 'Affidabilità',
    description:
      'Un percorso strutturato, puntuale e conforme, dalla richiesta di informazioni al rilascio dell’attestato.',
  },
]

export function ValoriSection() {
  return (
    <section
      aria-labelledby="valori-heading"
      className="relative overflow-hidden bg-neutral-25"
    >
      <Container className="section-padding relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerContainer} className="mb-14 text-center">
            <p className="mb-3 text-brand-700 overline">I nostri valori</p>
            <h2
              id="valori-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Cosa guida il nostro modo di fare formazione
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALORI.map((valore) => {
              const Icon = valore.icon
              return (
                <motion.div
                  key={valore.title}
                  variants={slideUpGentle}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-md"
                >
                  <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-brand-600 text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2.5 font-heading text-base font-bold text-neutral-950">
                    {valore.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {valore.description}
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
