'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import { Container } from '@/components/layout'
import { CourseCard } from '@/components/course/CourseCard'
import {
  slideUp,
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'
import { cn } from '@/lib/utils'
import type { Course } from '@/types'

type Props = {
  /**
   * Vetrina curata, già risolta lato server da `getHomeFeaturedCourses()` —
   * si configura in `content/settings/featured-courses.json` (array ordinato
   * di slug), non qui.
   */
  courses: Course[]
}

export function FeaturedCoursesSection({ courses }: Props) {
  // Vetrina vuota → niente sezione: meglio saltare il blocco che mostrare un
  // titolo su una griglia vuota (il fallback lato server rende il caso raro).
  if (courses.length === 0) return null

  return (
    <section
      aria-labelledby="corsi-evidenza-heading"
      className="relative isolate overflow-hidden bg-neutral-950"
    >
      {/*
        Foto decorativa a tutta larghezza (`alt=""`: non aggiunge informazione
        al testo che la copre). `fill` + `object-cover` la lasciano coprire la
        sezione a qualsiasi rapporto d'aspetto — a 390px resta la banda
        centrale, dove i lavoratori sono in campo.
      */}
      <Image
        src="/images/corsi-in-evidenza.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/*
        Velatura di leggibilità. `neutral-950/75`, non meno: il pixel più
        chiaro della foto è bianco pieno — `rgb(255,255,255)` a (398,61), il
        flare a sinistra — e sotto quel punto il testo bianco misura 5.02:1
        con una velatura al 70% ma 5.87:1 al 75%. Il margine serve perché
        `object-cover` ritaglia in modo diverso a ogni viewport: qualunque
        punto della foto può finire sotto al testo. Contrasti calcolati sul
        pixel peggiore dell'immagine e riverificati sul rendering vero (scan
        degli screenshot in `.qa/corsi-evidenza-sfondo/`, sfondo più chiaro
        misurato `rgb(101,101,101)`): bianco 5.83:1, `neutral-100` 5.05:1,
        `brand-100` 5.13:1 — tutti AA per testo normale. Non scendere sotto il
        75% senza rifare il conto.
      */}
      <div className="absolute inset-0 -z-10 bg-neutral-950/75" />

      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={slideUp} className="mb-14 text-center">
            <p className="mb-3 text-brand-100 overline">I più richiesti</p>
            <h2
              id="corsi-evidenza-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-white lg:text-4xl"
            >
              Corsi in evidenza
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-neutral-100">
              Una selezione dei nostri percorsi, tra obblighi di legge e
              specializzazione professionale.
            </p>
          </motion.div>

          {/* Stessa griglia delle altre liste di CourseCard (catalogo,
              correlati, skeleton): tra 768 e 1023px restano due colonne e la
              terza card va a capo da sola. Provato `md:grid-cols-3` per
              chiudere quel buco: a 768px le card scendono a ~220px e il badge
              di categoria più lungo ("Benessere psico-sociale") esce dalla
              card — meglio la riga spaiata. */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <motion.div key={course.slug} variants={slideUpGentle}>
                {/* Un'ombra da ferme (`shadow-lg`) perché le card galleggino
                    sulla foto invece di appoggiarcisi — ma uno stop sotto
                    l'`hover:shadow-xl` che CourseCard ha già, altrimenti
                    l'hover non avrebbe più nessun gradino da salire. */}
                <CourseCard
                  course={course}
                  showFeaturedBadge={false}
                  className="h-full shadow-lg"
                />
              </motion.div>
            ))}
          </div>

          <motion.div variants={slideUp} className="mt-12 text-center">
            <Link
              href="/corsi"
              className={cn(
                buttonVariants({ variant: 'outline-inverse' }),
                'group/cta h-11 gap-2 px-6 text-sm font-semibold'
              )}
            >
              Vedi tutti i corsi
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
