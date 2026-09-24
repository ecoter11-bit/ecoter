'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import { Container } from '@/components/layout'
import {
  slideUp,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'
import { cn } from '@/lib/utils'

/**
 * "Corsi in calendario" in home: le prossime edizioni con data.
 *
 * Per ora il calendario è vuoto, quindi la sezione mostra solo titolo,
 * "date in arrivo" e l'invito a scriverci (decisione del 24/09/2026). Resta
 * volutamente sobria, senza pannelli né icone: è un messaggio d'attesa, e
 * l'azione principale della pagina resta la fascia di contatto subito sotto.
 * Quando ci sarà una fonte per le date (il tipo `CourseDate` in
 * `src/types/course.ts` esiste già, i dati no), le card delle edizioni
 * andranno tra il testo e il bottone, come nella vecchia vetrina.
 */
export function CorsiInCalendarioSection() {
  return (
    <section
      aria-labelledby="corsi-calendario-heading"
      className="relative isolate overflow-hidden bg-neutral-950"
    >
      {/*
        Foto decorativa a tutta larghezza (`alt=""`: non aggiunge informazione
        al testo che la copre). `loading="eager"` perché, su schermi alti
        (1440×900, tablet in verticale), la parte alta della sezione è già
        visibile e la foto è l'elemento LCP. Su telefono invece è sotto la
        piega, quindi niente `preload` (la guida di Next 16 lo sconsiglia
        quando l'LCP cambia col viewport).
      */}
      <Image
        src="/images/corsi-in-calendario.jpg"
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/*
        Velatura di leggibilità: `neutral-950/75`, non meno. Il pixel più
        chiaro della foto è bianco pieno (`rgb(255,255,255)` a 398,61) e
        `object-cover` ritaglia in modo diverso a ogni viewport, quindi
        qualunque punto della foto può finire sotto al testo. Nel caso
        peggiore il fondo composto è `rgb(100.5,100.5,101.25)`: bianco
        5.87:1, `neutral-100` 5.09:1, `brand-100` 5.16:1, tutti AA (verificato
        di nuovo sul rendering il 24/09/2026). Non scendere sotto il 75%
        senza rifare il conto.
      */}
      <div className="absolute inset-0 -z-10 bg-neutral-950/75" />

      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p variants={slideUp} className="mb-3 text-brand-100 overline">
            Prossime edizioni
          </motion.p>
          <motion.h2
            id="corsi-calendario-heading"
            variants={slideUp}
            className="font-heading text-3xl font-light tracking-tight text-balance text-white lg:text-4xl"
          >
            Corsi in calendario
          </motion.h2>
          <motion.p
            variants={slideUp}
            className="mx-auto mt-4 max-w-xl text-pretty text-neutral-100"
          >
            <strong className="font-semibold text-white">
              Date in arrivo:
            </strong>{' '}
            le pubblicheremo qui. Nel frattempo scrivici e ti diciamo quando
            parte il corso che ti interessa.
          </motion.p>

          <motion.div variants={slideUp} className="mt-10">
            <Link
              href="/contatti"
              className={cn(
                buttonVariants({ variant: 'outline-inverse' }),
                'group/cta h-11 gap-2 px-6 text-sm font-semibold'
              )}
            >
              Chiedi le prossime date
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
