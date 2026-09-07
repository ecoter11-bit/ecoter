'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@ecoter/ui'
import { Container } from '@/components/layout'
import { slideUp } from '@/components/motion/variants'
import { HeroMesh } from './HeroMesh'

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_45%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
        aria-hidden="true"
      >
        <HeroMesh />
      </div>

      <Container className="relative py-24 lg:py-36">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={slideUp} className="mb-5 text-brand-600 overline">
            Formazione Professionale Accreditata
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={slideUp}
            className="mb-6 font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 sm:text-5xl lg:text-6xl"
          >
            La formazione che mette{' '}
            <span className="text-brand-600">la tua azienda in regola.</span>
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-pretty text-neutral-600"
          >
            Attestati validi ai fini di legge su sicurezza D.Lgs.&nbsp;81/08,
            ambiente e sistemi di gestione. Formazione in aula, online o
            direttamente in azienda — sempre aggiornata alle normative vigenti.
          </motion.p>

          <motion.div
            variants={slideUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/corsi"
              className={cn(
                // `default` alone renders unstyled here — the shadcn --color-primary
                // alias doesn't resolve in this app's Turbopack build (pre-existing,
                // confirmed sitewide, see CtaFinaleSection for the same
                // workaround). Overriding with the brand scale directly.
                buttonVariants({ variant: 'default' }),
                'h-12 gap-2 bg-brand-600 px-8 text-base font-semibold text-white hover:bg-brand-700'
              )}
            >
              Esplora i corsi
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
