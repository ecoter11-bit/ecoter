'use client'

import { motion } from 'framer-motion'
import {
  Search,
  NotebookPen,
  Users,
  Award,
  type LucideIcon,
} from 'lucide-react'
import { IconCircle } from '@ecoter/ui'
import { Container } from '@/components/layout'
import {
  slideUp,
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

type Step = {
  step: string
  icon: LucideIcon
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    step: '01',
    icon: Search,
    title: 'Analisi del fabbisogno',
    description:
      'Ascoltiamo te o la tua organizzazione per capire ruoli, mansioni e obblighi normativi da coprire.',
  },
  {
    step: '02',
    icon: NotebookPen,
    title: 'Piano formativo',
    description:
      'Costruiamo un piano su misura: corsi, modalità e calendario coerenti con le esigenze rilevate.',
  },
  {
    step: '03',
    icon: Users,
    title: 'Erogazione',
    description:
      'Eroghiamo la formazione in aula, online, in house o blended, con docenti qualificati.',
  },
  {
    step: '04',
    icon: Award,
    title: 'Attestati',
    description:
      'Rilasciamo attestati validi ai fini di legge, con registri e documentazione a supporto.',
  },
]

export function AziendeComeLavoriamoSection() {
  return (
    <section
      aria-labelledby="come-lavoriamo-heading"
      className="border-y border-neutral-200 bg-neutral-50"
    >
      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={slideUp} className="mb-14 text-center">
            <p className="mb-3 text-brand-700 overline">Il percorso</p>
            <h2
              id="come-lavoriamo-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Come lavoriamo
            </h2>
          </motion.div>

          <div className="relative grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {/* Connector line — desktop only */}
            <div
              className="absolute inset-x-[12.5%] top-7 hidden h-px bg-neutral-200 lg:block"
              aria-hidden="true"
            />

            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  variants={slideUpGentle}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 mb-5">
                    <IconCircle
                      color="brand"
                      icon={<Icon aria-hidden="true" />}
                      className="shadow-sm"
                    />
                    <span
                      className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-amber-400 text-caption font-bold text-brand-900"
                      aria-hidden="true"
                    >
                      {step.step}
                    </span>
                  </div>

                  <h3 className="mb-2 font-heading text-lg font-bold text-neutral-950">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {step.description}
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
