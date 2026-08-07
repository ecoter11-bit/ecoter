import { Clock, Award, ScrollText } from 'lucide-react'
import { Badge } from '@ecoter/ui'
import { formatCourseDuration } from '@/lib/utils'
import {
  categoryBadgeColor,
  categoryBadgeLabel,
  defaultCategoryBadgeColor,
  featuredBadgeColor,
  featuredBadgeLabel,
  levelBadgeColor,
  levelBadgeLabel,
  modalityIcon,
  modalityLabel,
} from '@/lib/badge-mappings'
import type { Course } from '@/types'

type Props = {
  course: Course
}

export function CourseHeader({ course }: Props) {
  const categoryColor =
    categoryBadgeColor[course.category] ?? defaultCategoryBadgeColor
  const levelColor = levelBadgeColor[course.level] ?? 'neutral'
  const primaryNorm = course.normativeRef?.[0]

  return (
    <div className="border-b border-neutral-200 bg-white">
      <div className="container-default py-10 lg:py-12">
        {/* Badges — categoria, livello, modalità */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge color={categoryColor}>
            {categoryBadgeLabel[course.category] ?? course.category}
          </Badge>
          <Badge color={levelColor}>{levelBadgeLabel[course.level]}</Badge>
          {course.modality.map((m) => {
            const Icon = modalityIcon[m] ?? Clock
            return (
              <Badge
                key={m}
                variant="outline"
                color="neutral"
                icon={<Icon className="size-3.5" />}
              >
                {modalityLabel[m] ?? m}
              </Badge>
            )
          })}
          {course.featured && (
            <Badge color={featuredBadgeColor}>{featuredBadgeLabel}</Badge>
          )}
        </div>

        {/* Titolo + sottotitolo */}
        <h1 className="max-w-3xl font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 lg:text-5xl">
          {course.title}
        </h1>
        {course.subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-pretty text-neutral-600">
            {course.subtitle}
          </p>
        )}

        {/* Riga meta — durata, attestato, normativa (modalità è già nei badge sopra, non ripetuta qui) */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Clock
              className="size-4 shrink-0 text-brand-600"
              aria-hidden="true"
            />
            {formatCourseDuration(course.duration)}
          </span>
          {course.certification && (
            <span className="flex items-center gap-2">
              <Award
                className="size-4 shrink-0 text-brand-600"
                aria-hidden="true"
              />
              Attestato incluso
            </span>
          )}
          {primaryNorm && (
            <span className="flex items-center gap-2">
              <ScrollText
                className="size-4 shrink-0 text-brand-600"
                aria-hidden="true"
              />
              {primaryNorm}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
