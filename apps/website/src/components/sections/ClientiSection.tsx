'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout'
import { cn } from '@/lib/utils'
import {
  slideUp,
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

type Cliente = {
  name: string
  /** File in `public/clienti/`. */
  src: string
  /** Misure intrinseche del file (per SVG: il `viewBox`). */
  width: number
  height: number
  /**
   * Correzione ottica dell'altezza, perché i marchi sembrino tutti della
   * stessa grandezza. `lg`: marchi quasi quadrati (cerchio, marchio sopra la
   * scritta). `md`: scritte sottili o con molto spazio intorno, e il PNG del
   * Comune di Bologna, che oltre i 48px sarebbe sfocato sugli schermi ad
   * alta densità (il file è alto 106px). `xs`: scritte molto piene e larghe.
   */
  size?: 'xs' | 'md' | 'lg'
}

/**
 * Clienti (MODIFICHE del 30/09/2026: i marchi al posto dei nomi; tolta BBT,
 * aggiunti Magni, La Doria, Enel Green Power, IMA, CNA e STRABAG).
 *
 * I marchi sono i file ufficiali, presi il 30/09/2026 dai siti delle aziende
 * o da Wikimedia Commons, senza ritocchi: unica eccezione Amplia, che sul suo
 * sito ha solo la versione bianca, qui nel colore del testo del sito. L'uso
 * dei marchi è una scelta di ECO-TER: se un cliente chiede di toglierlo,
 * basta eliminarlo da questa lista (e il file da `public/clienti/`).
 */
const CLIENTI: Cliente[] = [
  {
    name: "Autostrade per l'Italia",
    src: '/clienti/autostrade-per-l-italia.svg',
    width: 220,
    height: 54,
  },
  { name: 'Enel', src: '/clienti/enel.svg', width: 78, height: 29, size: 'md' },
  { name: 'Engie', src: '/clienti/engie.svg', width: 383, height: 138 },
  {
    name: 'Comune di Bologna',
    src: '/clienti/comune-di-bologna.png',
    width: 210,
    height: 106,
    size: 'md',
  },
  { name: 'AIMAG', src: '/clienti/aimag.svg', width: 268, height: 74 },
  {
    name: 'Amplia Infrastructures',
    src: '/clienti/amplia.svg',
    width: 331,
    height: 285,
    size: 'lg',
  },
  {
    name: 'Magni Telescopic Handlers',
    src: '/clienti/magni.svg',
    width: 160,
    height: 53,
  },
  {
    name: 'La Doria',
    src: '/clienti/la-doria.svg',
    width: 229,
    height: 131,
    size: 'lg',
  },
  {
    name: 'Enel Green Power',
    src: '/clienti/enel-green-power.svg',
    width: 284,
    height: 142,
    size: 'md',
  },
  { name: 'IMA', src: '/clienti/ima.svg', width: 63, height: 16, size: 'xs' },
  {
    name: 'CNA',
    src: '/clienti/cna.png',
    width: 159,
    height: 159,
    size: 'lg',
  },
  {
    name: 'STRABAG',
    src: '/clienti/strabag.svg',
    width: 722,
    height: 283,
    size: 'md',
  },
]

/** Altezza del marchio per taglia (stringhe intere per lo scanner di Tailwind). */
const logoHeight = {
  xs: 'h-6 sm:h-7',
  base: 'h-9 sm:h-10',
  md: 'h-10 sm:h-12',
  lg: 'h-14 sm:h-16',
} as const

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

          {/* Riquadri tutti uguali, marchio centrato e contenuto nel
              riquadro (`object-contain`), all'altezza della sua taglia
              (`logoHeight`); se così sarebbe più largo del
              riquadro, si rimpicciolisce restando proporzionato. */}
          <ul
            role="list"
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
          >
            {CLIENTI.map((cliente) => (
              <motion.li
                key={cliente.name}
                variants={slideUpGentle}
                className="flex h-24 items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 sm:h-28 sm:px-8"
              >
                <Image
                  src={cliente.src}
                  alt={cliente.name}
                  width={cliente.width}
                  height={cliente.height}
                  unoptimized
                  className={cn(
                    'w-auto max-w-full object-contain',
                    logoHeight[cliente.size ?? 'base']
                  )}
                />
              </motion.li>
            ))}
          </ul>

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
