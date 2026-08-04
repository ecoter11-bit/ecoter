import Link from 'next/link'
import { Clock, Award, Mail, MessageCircle } from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import { cn, formatCourseDuration, formatCoursePrice } from '@/lib/utils'
import { modalityIcon, modalityLabel } from '@/lib/badge-mappings'
import type { Course } from '@/types'

type Props = {
  course: Course
  className?: string
}

export function CourseSidebarCta({ course, className }: Props) {
  const price = formatCoursePrice(course.pricing)

  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm',
        className
      )}
    >
      <p className="font-heading text-3xl font-bold text-neutral-950">
        {price}
      </p>
      {course.pricing.type === 'fixed' && (
        <p className="mt-1 text-xs text-neutral-500">
          IVA esclusa, a partecipante
        </p>
      )}

      <dl className="mt-5 space-y-3 border-t border-neutral-100 pt-5 text-sm text-neutral-600">
        <div className="flex items-center gap-2.5">
          <Clock
            className="size-4 shrink-0 text-brand-600"
            aria-hidden="true"
          />
          <dt className="sr-only">Durata</dt>
          <dd>{formatCourseDuration(course.duration)}</dd>
        </div>
        {course.modality.map((m) => {
          const Icon = modalityIcon[m] ?? Clock
          return (
            <div key={m} className="flex items-center gap-2.5">
              <Icon
                className="size-4 shrink-0 text-brand-600"
                aria-hidden="true"
              />
              <dt className="sr-only">Modalità</dt>
              <dd>{modalityLabel[m] ?? m}</dd>
            </div>
          )
        })}
        {course.certification && (
          <div className="flex items-start gap-2.5">
            <Award
              className="mt-0.5 size-4 shrink-0 text-brand-600"
              aria-hidden="true"
            />
            <dt className="sr-only">Attestato</dt>
            <dd>{course.certification}</dd>
          </div>
        )}
      </dl>

      <div className="mt-6 flex flex-col gap-2.5 border-t border-neutral-100 pt-5">
        <Link
          href={`/contatti?corso=${course.slug}`}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'h-12 w-full gap-2 px-6 text-base font-semibold'
          )}
        >
          <Mail className="size-4" aria-hidden="true" />
          Richiedi informazioni
        </Link>

        {/* Always /contatti (course pre-filled), not tel: — both CTAs on
         * this card funnel into the same form by design, so the icon reads
         * as "get in touch" rather than "place a call" (MessageCircle, not
         * Phone — the number itself is only ever a tel: link on /contatti). */}
        <Link
          href={`/contatti?corso=${course.slug}`}
          className={cn(
            buttonVariants({ variant: 'outline-brand' }),
            'h-12 w-full gap-2 px-6 text-base font-semibold'
          )}
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Parla con noi
        </Link>
      </div>
    </div>
  )
}
