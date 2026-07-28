'use client'

import { motion } from 'framer-motion'
import {
  Search,
  MessageSquare,
  CalendarCheck,
  type LucideIcon,
} from 'lucide-react'
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
    title: 'Trova il corso',
    description:
      'Cerca nel catalogo per area tematica o usa il wizard per identificare il percorso obbligatorio per la tua figura professionale.',
  },
  {
    step: '02',
    icon: MessageSquare,
    title: 'Richiedi informazioni',
    description:
      'Contattaci via form, email o telefono. Risponderemo rapidamente con un preventivo personalizzato per la tua organizzazione.',
  },
  {
    step: '03',
    icon: CalendarCheck,
    title: 'Organizza la formazione',
    description:
      'Scegli data, luogo e modalità. Gestiamo la logistica: in aula, online o direttamente in azienda con i tuoi collaboratori.',
  },
]

export function ComeFunzionaSection() {
  return (
    <section
      aria-labelledby="come-funziona-heading"
      className="border-y border-neutral-200 bg-neutral-50"
    >
      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={slideUp} className="mb-12 text-center">
            <p className="mb-3 text-brand-500 overline">Processo semplice</p>
            <h2
              id="come-funziona-heading"
              className="font-heading text-3xl font-extrabold tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Come funziona
            </h2>
          </motion.div>

          <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {/* Connector line — desktop only */}
            <div
              className="absolute inset-x-[16.7%] top-6 hidden h-px bg-neutral-200 md:block"
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
                  <div className="relative z-10 mb-6">
                    <div className="flex size-12 items-center justify-center rounded-full border-2 border-brand-500 bg-white shadow-sm">
                      <Icon
                        className="size-5 text-brand-600"
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-brand-900"
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
