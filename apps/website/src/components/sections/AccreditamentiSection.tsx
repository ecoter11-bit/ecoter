'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Alert } from '@ecoter/ui'
import { Container } from '@/components/layout'
import {
  slideUp,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

export function AccreditamentiSection() {
  return (
    <section aria-labelledby="accreditamenti-heading" className="bg-neutral-25">
      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p variants={slideUp} className="mb-3 text-brand-700 overline">
            Accreditamenti e certificazioni
          </motion.p>
          <motion.h2
            id="accreditamenti-heading"
            variants={slideUp}
            className="mb-6 font-heading text-2xl font-light tracking-tight text-balance text-neutral-950 lg:text-3xl"
          >
            In fase di aggiornamento
          </motion.h2>

          <motion.div variants={slideUp}>
            <Alert
              tone="warning"
              icon={<AlertTriangle className="size-4" />}
              className="text-left"
            >
              Gli accreditamenti e le certificazioni specifiche di ECOTER
              Academy sono in fase di verifica e verranno pubblicati non appena
              confermati.
            </Alert>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
