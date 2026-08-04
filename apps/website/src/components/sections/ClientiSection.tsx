'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout'
import {
  slideUp,
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

/**
 * Nomi come testo — nessun logo di terzi: non ne abbiamo i diritti d'uso.
 * Eventuali loghi vanno sostituiti qui solo quando forniti dal cliente con
 * autorizzazione esplicita.
 */
const CLIENTI = [
  "Autostrade per l'Italia",
  'Enel',
  'Engie',
  'BBT',
  'Comune di Bologna',
  'AIMAG',
  'Amplia',
]

export function ClientiSection() {
  return (
    <section aria-labelledby="clienti-heading" className="bg-white">
      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={slideUp} className="mb-10 text-center">
            <p className="mb-3 text-brand-700 overline">Hanno scelto ECO-TER</p>
            <h2
              id="clienti-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Aziende, gestori di infrastrutture ed enti pubblici
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {CLIENTI.map((cliente) => (
              <motion.div
                key={cliente}
                variants={slideUpGentle}
                className="flex h-20 shrink-0 grow-0 basis-[calc(50%-0.5rem)] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-25 px-4 text-center font-heading text-sm font-semibold text-neutral-700 sm:basis-[calc(33.333%-0.667rem)] lg:basis-[calc(25%-0.75rem)]"
              >
                {cliente}
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={slideUp}
            className="mt-6 text-center text-xs text-neutral-600"
          >
            Selezione di realtà tra i clienti storici del gruppo ECO-TER.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}
