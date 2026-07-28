'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@ecoter/ui'
import { Container } from '@/components/layout'
import {
  slideUp,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'
import { siteConfig } from '@/config/site'

export function CtaFinaleSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-brand-900 text-white"
    >
      <div className="bg-grid-pattern absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(15,143,120,0.2),transparent)]"
        aria-hidden="true"
      />

      <Container className="section-padding relative text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl"
        >
          <motion.p variants={slideUp} className="mb-4 text-eco-400 overline">
            Inizia ora
          </motion.p>

          <motion.h2
            id="cta-heading"
            variants={slideUp}
            className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-balance lg:text-4xl"
          >
            Pronto a mettere la tua azienda in regola?
          </motion.h2>

          <motion.p
            variants={slideUp}
            className="mb-10 text-lg text-pretty text-brand-200"
          >
            Contattaci per ricevere un preventivo gratuito e personalizzato.
            Rispondiamo entro un giorno lavorativo.
          </motion.p>

          <motion.div
            variants={slideUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contatti"
              className={cn(
                buttonVariants({ variant: 'default' }),
                'h-12 gap-2 bg-eco-500 px-8 text-base font-semibold text-white hover:bg-eco-400'
              )}
            >
              <Mail className="size-4" aria-hidden="true" />
              Richiedi un preventivo
            </Link>

            {siteConfig.phone ? (
              <a
                href={`tel:${siteConfig.phone}`}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-12 gap-2 border-brand-400 bg-transparent px-8 text-base font-semibold text-white hover:border-brand-300 hover:bg-brand-800 hover:text-white'
                )}
              >
                <Phone className="size-4" aria-hidden="true" />
                Chiamaci
              </a>
            ) : (
              <Link
                href="/contatti"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-12 gap-2 border-brand-400 bg-transparent px-8 text-base font-semibold text-white hover:border-brand-300 hover:bg-brand-800 hover:text-white'
                )}
              >
                <Phone className="size-4" aria-hidden="true" />
                Contattaci
              </Link>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
