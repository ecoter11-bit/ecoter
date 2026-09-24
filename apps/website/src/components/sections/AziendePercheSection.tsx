'use client'

import { motion } from 'framer-motion'
import { Microscope, UserCheck, Wrench, type LucideIcon } from 'lucide-react'
import { IconCircle } from '@ecoter/ui'
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
    title: 'Competenza tecnica ECO-TER',
    description:
      "L'esperienza tecnica di ECO-TER su sicurezza, ambiente e sistemi di gestione, attiva dal 2002, è alla base di ogni percorso formativo che progettiamo, per le aziende come per i professionisti.",
  },
  {
    icon: UserCheck,
    title: 'Un unico interlocutore',
    description:
      "Dalla richiesta di informazioni al rilascio dell'attestato, segui l'intero percorso con un solo referente — nessun passaggio disperso tra più fornitori.",
  },
  {
    icon: Wrench,
    title: 'Approccio pratico',
    description:
      'Casi reali e strumenti applicabili da subito sul lavoro, non solo teoria da manuale — pensati per chi deve mettere in pratica quanto appreso.',
  },
]

export function AziendePercheSection() {
  return (
    <section
      aria-labelledby="perche-aziende-heading"
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
            <p className="mb-3 text-brand-700 overline">
              Perché ECO-TER Academy
            </p>
            <h2
              id="perche-aziende-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Il valore per te e per la tua azienda
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALORI.map((valore) => {
              const Icon = valore.icon
              return (
                <motion.div
                  key={valore.title}
                  variants={slideUpGentle}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-md"
                >
                  <IconCircle
                    color="brand"
                    icon={<Icon aria-hidden="true" />}
                    className="mb-5 transition-transform duration-300 group-hover:scale-110"
                  />
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
