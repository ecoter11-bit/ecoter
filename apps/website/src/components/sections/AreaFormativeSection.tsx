'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  HardHat,
  Leaf,
  Settings2,
  HeartHandshake,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import type { CategoryWithCount } from '@/types'
import { Container } from '@/components/layout'
import {
  slideUp,
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  HardHat,
  Leaf,
  Settings2,
  HeartHandshake,
}

/*
 * Category-specific color data — full static strings for Tailwind scanner.
 * Mapped onto the Decision 018 macro-category palette, same mapping as
 * badge-mappings.ts categoryBadgeColor (sicurezza → blue, ambiente →
 * brand/verde, sistemi-di-gestione → eco/teal, benessere-psico-sociale →
 * amber/oro). `topBarClass` is a decorative, aria-hidden accent line — a
 * Tailwind class (not an inline hex) so it stays token-driven, using each
 * color's canonical brand stop (no text sits on it, so the AA-safe stop
 * isn't required here).
 */
const categoryStyles: Record<
  string,
  {
    iconBg: string
    iconText: string
    iconHoverBg: string
    ctaText: string
    topBarClass: string
  }
> = {
  sicurezza: {
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-700',
    iconHoverBg: 'group-hover:bg-blue-600',
    ctaText: 'text-blue-700',
    topBarClass: 'bg-blue-500',
  },
  ambiente: {
    iconBg: 'bg-brand-50',
    iconText: 'text-brand-700',
    iconHoverBg: 'group-hover:bg-brand-600',
    ctaText: 'text-brand-700',
    topBarClass: 'bg-brand-500',
  },
  'sistemi-di-gestione': {
    iconBg: 'bg-eco-50',
    iconText: 'text-eco-700',
    iconHoverBg: 'group-hover:bg-eco-600',
    ctaText: 'text-eco-700',
    topBarClass: 'bg-eco-500',
  },
  'benessere-psico-sociale': {
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-700',
    iconHoverBg: 'group-hover:bg-amber-700',
    ctaText: 'text-amber-700',
    topBarClass: 'bg-amber-400',
  },
}

const defaultStyle = {
  iconBg: 'bg-brand-50',
  iconText: 'text-brand-700',
  iconHoverBg: 'group-hover:bg-brand-600',
  ctaText: 'text-brand-700',
  topBarClass: 'bg-brand-500',
}

type Props = {
  categories: CategoryWithCount[]
}

export function AreaFormativeSection({ categories }: Props) {
  return (
    <section aria-labelledby="aree-heading" className="bg-white">
      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={slideUp} className="mb-14 text-center">
            <p className="mb-3 text-brand-700 overline">Catalogo formativo</p>
            <h2
              id="aree-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Le aree formative
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-neutral-600">
              Quattro macro-aree che coprono l&apos;intero panorama della
              formazione professionale obbligatoria e specialistica.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon: LucideIcon = iconMap[category.icon] ?? HardHat
              const styles = categoryStyles[category.slug] ?? defaultStyle

              return (
                <motion.div key={category.slug} variants={slideUpGentle}>
                  <Link
                    href={`/corsi?step=3&cat=${category.slug}`}
                    className={cn(
                      'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7',
                      'transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600'
                    )}
                    aria-label={`Area ${category.name}: ${category.description}`}
                  >
                    {/* Top accent stripe */}
                    <div
                      className={cn(
                        'absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                        styles.topBarClass
                      )}
                      aria-hidden="true"
                    />

                    {/* Icon */}
                    <div
                      className={cn(
                        'mb-5 flex size-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:text-white',
                        styles.iconBg,
                        styles.iconText,
                        styles.iconHoverBg
                      )}
                    >
                      <Icon className="size-7" aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2.5 font-heading text-lg font-bold text-neutral-950 transition-colors duration-200 group-hover:text-neutral-800">
                      {category.name}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-neutral-600">
                      {category.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-5">
                      {category.courseCount > 0 ? (
                        <span className="text-xs font-medium text-neutral-400">
                          {category.courseCount}{' '}
                          {category.courseCount === 1
                            ? 'corso disponibile'
                            : 'corsi disponibili'}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span
                        className={cn(
                          'flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5',
                          styles.ctaText
                        )}
                      >
                        Esplora
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <motion.div variants={slideUp} className="mt-12 text-center">
            {/* Secondaria e neutra: la CTA brand per il catalogo è già in
             * "Corsi in evidenza", una sezione più su. Stessa destinazione,
             * peso visivo diverso — qui si chiude il blocco, non si apre. */}
            <Link
              href="/corsi"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'h-11 gap-2 rounded-full bg-white px-6 font-semibold text-neutral-700 shadow-sm transition-all duration-200 hover:border-brand-600 hover:bg-white hover:text-brand-700 hover:shadow-md'
              )}
            >
              Vedi tutti i corsi del catalogo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
