'use client'

import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import { Container } from '@/components/layout'
import {
  slideUp,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

export function MissioneAcademySection() {
  return (
    <section aria-labelledby="missione-heading" className="bg-white">
      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-neutral-200 bg-neutral-25 p-8 text-center shadow-sm md:p-12"
        >
          <motion.div
            variants={slideUp}
            className="mb-5 flex size-14 items-center justify-center rounded-full bg-brand-600 text-white"
          >
            <Target className="size-6" aria-hidden="true" />
          </motion.div>

          <motion.p variants={slideUp} className="mb-3 text-brand-700 overline">
            La missione
          </motion.p>

          <motion.h2
            id="missione-heading"
            variants={slideUp}
            className="mb-4 font-heading text-2xl font-light tracking-tight text-balance text-neutral-950 lg:text-3xl"
          >
            Trasferire competenza tecnica, non solo formazione a norma
          </motion.h2>

          <motion.p variants={slideUp} className="text-pretty text-neutral-600">
            ECO-TER Academy eroga formazione per aziende e professionisti in
            aula, online e blended, con attestati validi ai fini di legge. Ogni
            percorso è costruito sulla competenza tecnica e scientifica maturata
            da ECO-TER sul campo, non su contenuti standardizzati.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}
