'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import { cn } from '@/lib/utils'
import { Container } from '@/components/layout'
import { slideUp } from '@/components/motion/variants'
import { HeroMesh } from './HeroMesh'

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export function AziendeHeroSection() {
  return (
    <section
      aria-labelledby="aziende-hero-heading"
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
            Soluzioni Aziendali
          </motion.p>

          <motion.h1
            id="aziende-hero-heading"
            variants={slideUp}
            className="mb-6 font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 sm:text-5xl"
          >
            Formazione su misura per{' '}
            <span className="text-brand-600">la tua azienda.</span>
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="mx-auto max-w-xl text-lg leading-relaxed text-pretty text-neutral-600"
          >
            Analizziamo il fabbisogno formativo della tua organizzazione e
            costruiamo un piano su misura — in azienda, in aula, online o
            blended — con un unico interlocutore dalla richiesta
            all&apos;attestato.
          </motion.p>

          <motion.div variants={slideUp}>
            <Link
              href="/contatti"
              className={cn(
                buttonVariants({ variant: 'default' }),
                'h-12 gap-2 bg-brand-600 px-8 text-base font-semibold text-white hover:bg-brand-700'
              )}
            >
              Richiedi una consulenza
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
