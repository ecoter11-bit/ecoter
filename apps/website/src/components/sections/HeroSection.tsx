'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import { Container } from '@/components/layout'
import { AreaLinkTile } from '@/components/catalog/AreaLinkTile'
import { slideUp } from '@/components/motion/variants'
import { areaHref } from '@/lib/catalog'
import {
  categoryIcon,
  categoryIconColor,
  defaultCategoryIcon,
  defaultCategoryIconColor,
} from '@/lib/category-ui'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'
import { HeroMesh } from './HeroMesh'

/** Il minimo di un'area che serve ai bottoni: niente descrizioni né SEO nel bundle client. */
export type HeroArea = Pick<Category, 'slug' | 'name' | 'icon'>

type Props = {
  /** Aree formative, nell'ordine del catalogo (`getAllCategories()`). */
  areas: HeroArea[]
}

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export function HeroSection({ areas }: Props) {
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

      <Container className="relative py-20 lg:py-32">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.p variants={slideUp} className="mb-5 text-brand-600 overline">
            Formazione Professionale Accreditata
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={slideUp}
            className="mx-auto mb-6 max-w-3xl font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 sm:text-5xl lg:text-6xl"
          >
            La formazione che mette{' '}
            <span className="text-brand-600">la tua azienda in regola.</span>
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-pretty text-neutral-600"
          >
            Attestati validi ai fini di legge su sicurezza D.Lgs.&nbsp;81/08,
            ambiente e benessere psico-sociale. Formazione in aula, online o
            direttamente in azienda — sempre aggiornata alle normative vigenti.
          </motion.p>

          {/*
            Un ingresso per area, dritto ai suoi corsi. Sono tre scelte alla
            pari, non tre azioni principali in gara: per questo riquadri
            chiari col colore dell'area nell'icona (`AreaLinkTile`), non tre
            bottoni pieni. Sotto `lg` vanno in colonna: a tre per riga su un
            tablet "Benessere psico-sociale" andrebbe a capo in tre righe.
          */}
          <motion.ul
            variants={slideUp}
            role="list"
            aria-label="Aree formative"
            className="mx-auto grid max-w-md gap-3 text-left lg:max-w-5xl lg:grid-cols-3"
          >
            {areas.map((area) => (
              <li key={area.slug}>
                <AreaLinkTile
                  href={areaHref(area.slug)}
                  label={area.name}
                  icon={categoryIcon[area.icon] ?? defaultCategoryIcon}
                  color={
                    categoryIconColor[area.slug] ?? defaultCategoryIconColor
                  }
                />
              </li>
            ))}
          </motion.ul>

          {/* Uscita verso la casa madre: azione secondaria, in una nuova
              scheda. Stesso avviso per screen reader del link nel footer. */}
          <motion.div variants={slideUp} className="mt-8">
            <a
              href={siteConfig.parentSite}
              target="_blank"
              rel="noopener"
              className={cn(
                buttonVariants({ variant: 'outline-brand' }),
                'h-11 gap-2 px-6 text-sm font-semibold'
              )}
            >
              Sito del gruppo ECO-TER
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only">
                {' '}
                (si apre in una nuova scheda, sito ECO-TER Srl)
              </span>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
