'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import { Container } from '@/components/layout'
import { AreaLinkTile } from '@/components/catalog/AreaLinkTile'
import { slideUp } from '@/components/motion/variants'
import { areaHref } from '@/lib/catalog'
import { categoryIcon, defaultCategoryIcon } from '@/lib/category-ui'
import { CALENDAR_PATH } from '@/config/nav'
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

      <Container className="relative pt-6 pb-20 lg:pt-8 lg:pb-32">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/*
            Uscita verso la casa madre in alto a destra (MODIFICHE del
            29/09/2026; prima era sotto i bottoni della hero). Sta nel flusso
            della pagina e non sopra il titolo: sul telefono non copre nulla,
            e viene letta per prima come si vede per prima. Bordo verde di 2px
            e scritta semibold come prima; nuova scheda, con lo stesso avviso
            per screen reader del link nel footer.
          */}
          <motion.div
            variants={slideUp}
            className="mb-8 flex justify-end lg:mb-14"
          >
            <a
              href={siteConfig.parentSite}
              target="_blank"
              rel="noopener"
              className={cn(
                buttonVariants({ variant: 'outline-brand' }),
                'h-11 gap-2 border-2 px-4 text-base font-semibold sm:px-5'
              )}
            >
              Visita il sito di ECO-TER
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only">
                {' '}
                (si apre in una nuova scheda, sito ECO-TER Srl)
              </span>
            </a>
          </motion.div>

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
            "Scopri i nostri corsi" dice dove portano i bottoni (richiesta di
            Davide del 24/09/2026: "chiarire che i bottoni portano ai
            corsi"). È un h2 perché introduce il gruppo di link, e dà il nome
            alla lista (`aria-labelledby`): con lo screen reader si sente
            "Scopri i nostri corsi, elenco, 3 voci" prima delle aree.
          */}
          <motion.h2
            id="hero-corsi-heading"
            variants={slideUp}
            className="mb-4 font-heading text-lg font-semibold text-balance text-neutral-950 sm:text-xl"
          >
            Scopri i nostri corsi
          </motion.h2>

          {/*
            Un ingresso per area, dritto ai suoi corsi: tre bottoni verdi
            pieni (`AreaLinkTile`), ben staccati dallo sfondo e con la scritta
            grande (MODIFICHE del 24/09/2026). Sotto `lg` vanno in colonna; da
            `lg` in su tre per riga, su una fila larga fino a `max-w-6xl`
            perché "Benessere psico-sociale" a 18px stia su una riga.
          */}
          <motion.ul
            variants={slideUp}
            role="list"
            aria-labelledby="hero-corsi-heading"
            className="mx-auto grid max-w-md gap-3 text-left lg:max-w-6xl lg:grid-cols-3 lg:gap-4"
          >
            {areas.map((area) => (
              <li key={area.slug}>
                <AreaLinkTile
                  href={areaHref(area.slug)}
                  label={area.name}
                  icon={categoryIcon[area.icon] ?? defaultCategoryIcon}
                />
              </li>
            ))}
          </motion.ul>

          {/*
            "Calendario corsi" (MODIFICHE del 29/09/2026) al posto di "Visita
            il catalogo": stesso posto e stesso verde pieno dei bottoni delle
            aree, verso il calendario delle prossime edizioni (per ora "date
            in arrivo"). Il bordo di 2px è dello stesso verde del fondo, anche
            all'hover: trasparente lascerebbe vedere un filo di pagina (il
            `Button` ha `bg-clip-padding`). `px-4` sotto `sm` perché a 320px
            stia nei 288px utili.
          */}
          <motion.div variants={slideUp} className="mt-10">
            <Link
              href={CALENDAR_PATH}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'h-14 gap-2.5 border-2 border-primary px-4 text-lg font-semibold hover:border-brand-700 sm:px-8'
              )}
            >
              Calendario corsi
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
