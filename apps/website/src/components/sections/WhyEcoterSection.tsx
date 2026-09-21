'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Award, BookOpen, Globe, Wrench, type LucideIcon } from 'lucide-react'
import { IconCircle } from '@ecoter/ui'
import { Container } from '@/components/layout'
import {
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

type Reason = {
  icon: LucideIcon
  title: string
  description: string
}

const REASONS: Reason[] = [
  {
    icon: Award,
    title: 'Esperienza comprovata',
    description:
      'Team di docenti specializzati e costantemente aggiornati sulle normative vigenti in sicurezza, qualità e gestione ambientale.',
  },
  {
    icon: BookOpen,
    title: 'Conformità garantita',
    description:
      'Ogni corso è progettato nel rispetto di D.Lgs. 81/08, Accordo Stato-Regioni 2025, D.Lgs. 152/06 e delle normative di riferimento del settore.',
  },
  {
    icon: Globe,
    title: 'Massima flessibilità',
    description:
      'Aula, online, blended, in house. Adattiamo orari, modalità e contenuti alle esigenze operative della tua organizzazione.',
  },
  {
    icon: Wrench,
    title: 'Approccio pratico',
    description:
      'Casi reali, esercitazioni pratiche e strumenti concreti — applicabili fin dal primo giorno in azienda, non solo teoria.',
  },
]

export function WhyEcoterSection() {
  return (
    <section
      aria-labelledby="perche-heading"
      className="relative isolate overflow-hidden bg-neutral-950"
    >
      {/*
        Foto decorativa a tutta larghezza (`alt=""`: l'ufficio tecnico non
        aggiunge informazione alle quattro ragioni che gli stanno sopra).
        `fill` + `object-cover` la lasciano coprire la sezione a qualsiasi
        rapporto d'aspetto — l'originale è 2000×668, quindi sotto ~900px di
        viewport resta la banda centrale, quella con il tavolo e i due tecnici.

        Niente `priority`, a differenza della vetrina «Corsi in evidenza»:
        questa è la quarta sezione della home e non è mai visibile al primo
        paint, quindi il preload eager si porterebbe via banda dall'LCP vero
        senza esserlo. Il lazy loading di default di `next/image` è quello
        giusto qui — non "allinearlo" a FeaturedCoursesSection copiando il
        `priority`.
      */}
      <Image
        src="/images/perche-ecoter.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/*
        Velatura di leggibilità. `neutral-950/80` — uno stop più forte del
        `/75` della vetrina «Corsi in evidenza», e il motivo è misurato: questa
        foto ha luminanza relativa mediana 0.40 contro 0.32 (p90 0.76), cioè
        molta più superficie chiara sotto al testo, ed è fittissima di
        dettaglio (monitor accesi, scale, scrivanie bianche) che a velatura
        leggera continuerebbe a leggersi attraverso i caratteri sottili del
        titolo. Il pixel peggiore è bianco pieno — `rgb(255,255,255)` a
        (1325,99), il soffitto in controluce: `neutral-950` (`#313132`) all'80%
        lo porta a `rgb(90,90,91)`, e lì sopra il testo misura bianco 6.9:1,
        `neutral-100` 6.0:1, `brand-100` 6.0:1 — tutti AA abbondante per testo
        normale. Il margine serve perché `object-cover` ritaglia in modo
        diverso a ogni viewport: qualunque punto della foto può finire sotto al
        testo. Non scendere sotto l'80% senza rifare il conto sul pixel
        peggiore.
      */}
      <div className="absolute inset-0 -z-10 bg-neutral-950/80" />

      <Container className="section-padding relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerContainer} className="mb-14 text-center">
            <p className="mb-3 text-brand-100 overline">Perché sceglierci</p>
            <h2
              id="perche-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-white lg:text-4xl"
            >
              Perché ECOTER Academy
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-neutral-100">
              Quattro ragioni concrete per affidarci la formazione della tua
              organizzazione.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((reason) => {
              const Icon = reason.icon
              return (
                /* `shadow-lg` da ferme perché le card galleggino sulla foto
                   invece di appoggiarcisi, e `hover:shadow-xl` uno stop sopra
                   — con l'`hover:shadow-md` di prima l'ombra sarebbe *calata*
                   al passaggio del mouse. Fondo `bg-white` pieno, mai
                   traslucido: così il testo `neutral-950` / `neutral-600` e i
                   cerchietti `IconCircle color="brand"` restano sui contrasti
                   già validati su bianco, qualunque cosa passi sotto la card
                   al variare del ritaglio della foto. */
                <motion.div
                  key={reason.title}
                  variants={slideUpGentle}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-xl"
                >
                  <IconCircle
                    color="brand"
                    icon={<Icon aria-hidden="true" />}
                    className="mb-5 transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="mb-2.5 font-heading text-base font-bold text-neutral-950">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {reason.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
