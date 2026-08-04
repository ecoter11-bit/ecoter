'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout'
import { slideUp } from '@/components/motion/variants'
import { HeroMesh } from './HeroMesh'

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export function ChiSiamoHeroSection() {
  return (
    <section
      aria-labelledby="chi-siamo-hero-heading"
      className="relative overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_45%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
        aria-hidden="true"
      >
        <HeroMesh />
      </div>

      <Container className="relative py-20 lg:py-28">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={slideUp} className="mb-5 text-brand-600 overline">
            Chi siamo
          </motion.p>

          <motion.h1
            id="chi-siamo-hero-heading"
            variants={slideUp}
            className="mb-6 font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 sm:text-5xl"
          >
            La formazione nasce dall&apos;esperienza di{' '}
            <span className="text-brand-600">ECO-TER.</span>
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="mx-auto max-w-xl text-lg leading-relaxed text-pretty text-neutral-600"
          >
            Dal 2002 affianchiamo aziende e professionisti su sicurezza,
            ambiente e sistemi di gestione. ECOTER Academy porta in aula la
            stessa competenza tecnica maturata sul campo.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}
