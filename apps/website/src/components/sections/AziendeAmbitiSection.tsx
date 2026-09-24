'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  HardHat,
  Leaf,
  HeartHandshake,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { IconCircle, type IconCircleColor } from '@ecoter/ui'
import type { CategoryWithCount } from '@/types'
import { Container } from '@/components/layout'
import { areaHref } from '@/lib/catalog'
import {
  slideUp,
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

const iconMap: Record<string, LucideIcon> = {
  HardHat,
  Leaf,
  HeartHandshake,
}

/* Same macro-category → colore mapping di `categoryIconColor` (lib/category-ui.ts) e dei Badge (Decision 018). */
const colorMap: Record<string, IconCircleColor> = {
  sicurezza: 'blue',
  ambiente: 'brand',
  'benessere-psico-sociale': 'amber',
}

type Props = {
  categories: CategoryWithCount[]
}

export function AziendeAmbitiSection({ categories }: Props) {
  return (
    <section aria-labelledby="ambiti-heading" className="bg-white">
      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={slideUp} className="mb-14 text-center">
            <p className="mb-3 text-brand-700 overline">Ambiti coperti</p>
            <h2
              id="ambiti-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Tre aree, un unico interlocutore
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-neutral-600">
              Copriamo l&apos;intero fabbisogno formativo della tua azienda,
              dalla sicurezza obbligatoria alla gestione ambientale e al
              benessere delle persone.
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = iconMap[category.icon] ?? HardHat
              const color = colorMap[category.slug] ?? 'brand'

              return (
                <motion.div key={category.slug} variants={slideUpGentle}>
                  <Link
                    href={areaHref(category.slug)}
                    className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                  >
                    <IconCircle
                      color={color}
                      icon={<Icon aria-hidden="true" />}
                      className="mb-5 transition-transform duration-300 group-hover:scale-110"
                    />
                    <h3 className="mb-2.5 font-heading text-lg font-bold text-neutral-950">
                      {category.name}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-neutral-600">
                      {category.description}
                    </p>
                    <span className="mt-6 flex items-center gap-1.5 border-t border-neutral-100 pt-5 text-sm font-semibold text-brand-700 transition-all duration-200 group-hover:gap-2.5">
                      Vedi i corsi
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
