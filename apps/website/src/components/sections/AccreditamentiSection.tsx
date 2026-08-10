'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
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
            Il nostro ente accreditatore
          </motion.h2>

          <motion.div
            variants={slideUp}
            className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm md:p-10"
          >
            {/* Logo su sfondo nero: tile scuro (neutral-950, l'ink di brand)
                per evitare un riquadro nero "a caso" su pagina chiara. */}
            <div className="mb-5 inline-flex rounded-xl border border-neutral-800 bg-neutral-950 p-3">
              <Image
                src="/brand/af24-associazione-formatori.png"
                alt="Logo Associazione Formatori 24 (AF24)"
                width={600}
                height={600}
                className="size-24 rounded-md sm:size-28"
              />
            </div>

            <p className="font-heading text-lg font-semibold text-neutral-950">
              Associazione Formatori 24 (AF24)
            </p>
            {/* Numero/dettaglio di accreditamento da confermare con Davide
                prima di aggiungerlo: qui resta solo l'affermazione fattuale
                concordata, senza date o codici non verificati. */}
            <p className="mt-2 max-w-md text-sm text-pretty text-neutral-600">
              ECOTER Academy opera come ente di formazione accreditato.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
