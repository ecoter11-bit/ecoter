'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@ecoter/ui'
import { Container } from '@/components/layout'
import { slideUp } from '@/components/motion/variants'

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
      className="relative overflow-hidden bg-brand-900 text-white"
    >
      <div className="bg-grid-pattern absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(84,119,191,0.3),transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 bottom-0 size-96 translate-x-1/3 translate-y-1/3 rounded-full bg-eco-500/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-24 lg:py-36">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={slideUp} className="mb-5 text-eco-400 overline">
            Formazione Professionale Accreditata
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={slideUp}
            className="mb-6 font-heading text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
          >
            La formazione che mette{' '}
            <span className="text-eco-300">la tua azienda in regola.</span>
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-pretty text-brand-200"
          >
            Attestati validi ai fini di legge su sicurezza D.Lgs.&nbsp;81/08,
            qualità ISO, antincendio e ambiente. Formazione in aula, online o
            direttamente in azienda — sempre aggiornata alle normative vigenti.
          </motion.p>

          <motion.div
            variants={slideUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/corsi"
              className={cn(
                buttonVariants({ variant: 'default' }),
                'h-12 gap-2 bg-eco-500 px-8 text-base font-semibold text-white hover:bg-eco-400 focus-visible:ring-eco-300'
              )}
            >
              Esplora i corsi
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/wizard"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'h-12 gap-2 border-brand-400 bg-transparent px-8 text-base font-semibold text-white hover:border-brand-300 hover:bg-brand-800 hover:text-white'
              )}
            >
              <ClipboardList className="size-4" aria-hidden="true" />
              Trova il corso obbligatorio
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
