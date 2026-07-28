'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  HardHat,
  Flame,
  BadgeCheck,
  Leaf,
  Settings2,
  Users,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
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
  Flame,
  BadgeCheck,
  Leaf,
  Settings2,
  Users,
}

/* Category-specific color data — full static strings for Tailwind scanner */
const categoryStyles: Record<
  string,
  {
    iconBg: string
    iconText: string
    iconHoverBg: string
    ctaText: string
    topBarColor: string
  }
> = {
  sicurezza: {
    iconBg: 'bg-brand-50',
    iconText: 'text-brand-600',
    iconHoverBg: 'group-hover:bg-brand-600',
    ctaText: 'text-brand-600',
    topBarColor: '#1A3570',
  },
  qualita: {
    iconBg: 'bg-eco-50',
    iconText: 'text-eco-600',
    iconHoverBg: 'group-hover:bg-eco-600',
    ctaText: 'text-eco-600',
    topBarColor: '#0D7361',
  },
  ambiente: {
    iconBg: 'bg-eco-50',
    iconText: 'text-eco-500',
    iconHoverBg: 'group-hover:bg-eco-500',
    ctaText: 'text-eco-500',
    topBarColor: '#0F8F78',
  },
  antincendio: {
    iconBg: 'bg-warning-50',
    iconText: 'text-warning-600',
    iconHoverBg: 'group-hover:bg-warning-600',
    ctaText: 'text-warning-600',
    topBarColor: '#D97706',
  },
  'sistemi-gestione': {
    iconBg: 'bg-eco-50',
    iconText: 'text-eco-700',
    iconHoverBg: 'group-hover:bg-eco-700',
    ctaText: 'text-eco-700',
    topBarColor: '#0A5A4A',
  },
  management: {
    iconBg: 'bg-brand-50',
    iconText: 'text-brand-700',
    iconHoverBg: 'group-hover:bg-brand-700',
    ctaText: 'text-brand-700',
    topBarColor: '#132A58',
  },
}

const defaultStyle = {
  iconBg: 'bg-brand-50',
  iconText: 'text-brand-600',
  iconHoverBg: 'group-hover:bg-brand-600',
  ctaText: 'text-brand-600',
  topBarColor: '#1A3570',
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
            <p className="mb-3 text-brand-500 overline">Catalogo formativo</p>
            <h2
              id="aree-heading"
              className="font-heading text-3xl font-extrabold tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Le aree formative
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-neutral-600">
              Sei macro-aree che coprono l&apos;intero panorama della formazione
              professionale obbligatoria e specialistica.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon: LucideIcon = iconMap[category.icon] ?? HardHat
              const styles = categoryStyles[category.slug] ?? defaultStyle

              return (
                <motion.div key={category.slug} variants={slideUpGentle}>
                  <Link
                    href={`/categorie/${category.slug}`}
                    className={cn(
                      'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7',
                      'transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500'
                    )}
                    aria-label={`Area ${category.name}: ${category.description}`}
                  >
                    {/* Top accent stripe */}
                    <div
                      className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ backgroundColor: styles.topBarColor }}
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
            <Link
              href="/corsi"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all duration-200 hover:border-brand-300 hover:text-brand-700 hover:shadow-md"
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
