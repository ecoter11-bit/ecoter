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
    <section aria-labelledby="cta-heading" className="bg-brand-50">
      <Container className="section-padding text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl"
        >
          <motion.p variants={slideUp} className="mb-4 text-brand-600 overline">
            Inizia ora
          </motion.p>

          <motion.h2
            id="cta-heading"
            variants={slideUp}
            className="mb-4 font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
          >
            Pronto a mettere la tua azienda in regola?
          </motion.h2>

          <motion.p
            variants={slideUp}
            className="mb-10 text-lg text-pretty text-neutral-600"
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
                'h-12 gap-2 bg-brand-600 px-8 text-base font-semibold text-white hover:bg-brand-700'
              )}
            >
              <Mail className="size-4" aria-hidden="true" />
              Richiedi un preventivo
            </Link>

            {siteConfig.phone ? (
              <a
                href={`tel:${siteConfig.phone}`}
                className={cn(
                  buttonVariants({ variant: 'outline-brand' }),
                  'h-12 gap-2 px-8 text-base font-semibold'
                )}
              >
                <Phone className="size-4" aria-hidden="true" />
                Chiamaci
              </a>
            ) : (
              <Link
                href="/contatti"
                className={cn(
                  buttonVariants({ variant: 'outline-brand' }),
                  'h-12 gap-2 px-8 text-base font-semibold'
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
