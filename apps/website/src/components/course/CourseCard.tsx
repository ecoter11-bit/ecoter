import Link from 'next/link'
import {
  Clock,
  Building2,
  Monitor,
  Blend,
  Home,
  ArrowRight,
} from 'lucide-react'
import { Badge } from '@ecoter/ui'
import { cn } from '@/lib/utils'
import {
  categoryBadgeColor,
  categoryBadgeLabel,
  defaultCategoryBadgeColor,
  featuredBadgeColor,
  featuredBadgeLabel,
  levelBadgeColor,
  levelBadgeLabel,
} from '@/lib/badge-mappings'
import type { Course } from '@/types'

// Mirrors categoryBadgeColor's mapping onto the Decision 018 macro-category
// palette (see badge-mappings.ts) — same category, same hue, bar and badge
// agree. Uses each color's `categoryColors[...].solid` stop directly.
const categoryBar: Record<string, string> = {
  sicurezza: 'bg-blue-500',
  ambiente: 'bg-brand-600',
  'sistemi-di-gestione': 'bg-eco-600',
  'benessere-psico-sociale': 'bg-amber-700',
}
const defaultCategoryBar = 'bg-neutral-400'

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
  const categoryBarClass = categoryBar[course.category] ?? defaultCategoryBar
  const categoryColor =
    categoryBadgeColor[course.category] ?? defaultCategoryBadgeColor
  const levelColor = levelBadgeColor[course.level] ?? 'neutral'

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
        className={cn('h-1 w-full shrink-0', categoryBarClass)}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-6">
        {/* Badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge size="sm" color={categoryColor}>
            {categoryBadgeLabel[course.category] ?? course.category}
          </Badge>
          <Badge size="sm" color={levelColor}>
            {levelBadgeLabel[course.level]}
          </Badge>
          {course.featured && (
            <Badge size="sm" color={featuredBadgeColor}>
              {featuredBadgeLabel}
            </Badge>
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
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600'
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
