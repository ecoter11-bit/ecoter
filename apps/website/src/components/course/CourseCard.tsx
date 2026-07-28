import Link from 'next/link'
import {
  Clock,
  Building2,
  Monitor,
  Blend,
  Home,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Course } from '@/types'

const categoryStyles: Record<string, { badge: string; bar: string }> = {
  sicurezza: { badge: 'bg-brand-50 text-brand-700', bar: 'bg-brand-500' },
  qualita: { badge: 'bg-eco-50 text-eco-700', bar: 'bg-eco-500' },
  ambiente: { badge: 'bg-eco-50 text-eco-600', bar: 'bg-eco-400' },
  antincendio: {
    badge: 'bg-warning-50 text-warning-600',
    bar: 'bg-warning-500',
  },
  'sistemi-gestione': { badge: 'bg-eco-50 text-eco-700', bar: 'bg-eco-700' },
  management: { badge: 'bg-brand-50 text-brand-700', bar: 'bg-brand-600' },
}
const defaultCatStyle = {
  badge: 'bg-neutral-100 text-neutral-600',
  bar: 'bg-neutral-400',
}

const categoryLabels: Record<string, string> = {
  sicurezza: 'Sicurezza',
  qualita: 'Qualità',
  ambiente: 'Ambiente',
  antincendio: 'Antincendio',
  'sistemi-gestione': 'Sistemi di Gestione',
  management: 'Management',
}

const levelLabel: Record<string, string> = {
  base: 'Base',
  intermedio: 'Intermedio',
  avanzato: 'Avanzato',
}
const levelStyle: Record<string, string> = {
  base: 'bg-success-50 text-success-600',
  intermedio: 'bg-warning-50 text-warning-600',
  avanzato: 'bg-error-50 text-error-700',
}

const modalityIcon: Record<
  string,
  React.ComponentType<{
    className?: string
    'aria-hidden'?: boolean | 'true' | 'false'
  }>
> = {
  aula: Building2,
  online: Monitor,
  blended: Blend,
  'in-house': Home,
}
const modalityLabel: Record<string, string> = {
  aula: 'In Aula',
  online: 'Online',
  blended: 'Blended',
  'in-house': 'In House',
}

type Props = {
  course: Course
  className?: string
}

export function CourseCard({ course, className }: Props) {
  const catStyle = categoryStyles[course.category] ?? defaultCatStyle
  const lvlStyle = levelStyle[course.level] ?? 'bg-neutral-100 text-neutral-600'

  const price =
    course.pricing.type === 'fixed'
      ? `€ ${course.pricing.amount.toLocaleString('it-IT')}`
      : 'Su richiesta'

  const durationLabel =
    course.duration.days != null
      ? `${course.duration.hours}h · ${course.duration.days} ${course.duration.days === 1 ? 'giorno' : 'giorni'}`
      : `${course.duration.hours} ore`

  const primaryNorm = course.normativeRef?.[0]

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white',
        'transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-xl',
        className
      )}
    >
      {/* Category top bar */}
      <div
        className={cn('h-1 w-full shrink-0', catStyle.bar)}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-6">
        {/* Badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-[10px] overline',
              catStyle.badge
            )}
          >
            {categoryLabels[course.category] ?? course.category}
          </span>
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-[10px] overline',
              lvlStyle
            )}
          >
            {levelLabel[course.level]}
          </span>
          {course.featured && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] text-amber-600 overline">
              In evidenza
            </span>
          )}
        </div>

        {/* Title + subtitle */}
        <h3 className="mb-1.5 line-clamp-2 font-heading text-lg leading-snug font-bold text-neutral-950 transition-colors duration-200 group-hover:text-brand-700">
          {course.title}
        </h3>
        <p className="mb-4 line-clamp-1 text-sm leading-relaxed text-neutral-500">
          {course.subtitle}
        </p>

        {/* Meta row */}
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 shrink-0" aria-hidden="true" />
            {durationLabel}
          </span>
          {course.modality.slice(0, 2).map((m) => {
            const Icon = modalityIcon[m] ?? Building2
            return (
              <span key={m} className="flex items-center gap-1.5">
                <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                {modalityLabel[m] ?? m}
              </span>
            )
          })}
        </div>

        {/* Normativa pill */}
        {primaryNorm && (
          <div className="mb-4 line-clamp-1 rounded-lg bg-neutral-50 px-3 py-2 text-[11px] font-medium text-neutral-500">
            {primaryNorm}
          </div>
        )}

        {/* Excerpt */}
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
          {course.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-5">
          <span className="text-base font-bold text-neutral-950">{price}</span>
          <Link
            href={`/corsi/${course.slug}`}
            className={cn(
              'flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white',
              'transition-all duration-200 group-hover:gap-2.5 hover:bg-brand-700',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500'
            )}
            aria-label={`Scopri il corso ${course.title}`}
          >
            Scopri
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
