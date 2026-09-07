import Link from 'next/link'
import { Clock, Award, Mail, ClipboardList } from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import { cn, formatCourseDuration } from '@/lib/utils'
import { modalityIcon, modalityLabel } from '@/lib/badge-mappings'
import type { Course } from '@/types'

type Props = {
  course: Course
  className?: string
}

export function CourseSidebarCta({ course, className }: Props) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm',
        className
      )}
    >
      <div className="space-y-3 text-sm text-neutral-600">
        <div className="flex items-center gap-2.5">
          <Clock
            className="size-4 shrink-0 text-brand-600"
            aria-hidden="true"
          />
          <dl>
            <dt className="sr-only">Durata</dt>
            <dd>{formatCourseDuration(course.duration)}</dd>
          </dl>
        </div>
        {course.modality.map((m) => {
          const Icon = modalityIcon[m] ?? Clock
          return (
            <div key={m} className="flex items-center gap-2.5">
              <Icon
                className="size-4 shrink-0 text-brand-600"
                aria-hidden="true"
              />
              <dl>
                <dt className="sr-only">Modalità</dt>
                <dd>{modalityLabel[m] ?? m}</dd>
              </dl>
            </div>
          )
        })}
        {course.certification && (
          <div className="flex items-start gap-2.5">
            <Award
              className="mt-0.5 size-4 shrink-0 text-brand-600"
              aria-hidden="true"
            />
            <dl>
              <dt className="sr-only">Attestato</dt>
              <dd>{course.certification}</dd>
            </dl>
          </div>
        )}
      </div>

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

        {/* Secondo CTA = richiesta d'acquisto, non un secondo canale di
         * contatto: porta al form /ottieni-corso col corso già selezionato,
         * dove si raccolgono i dati di fatturazione. Nessun pagamento
         * online, quindi l'icona è un modulo (ClipboardList), non un
         * carrello — non promettiamo un checkout. */}
        <Link
          href={`/ottieni-corso?corso=${course.slug}`}
          className={cn(
            buttonVariants({ variant: 'outline-brand' }),
            'h-12 w-full gap-2 px-6 text-base font-semibold'
          )}
        >
          <ClipboardList className="size-4" aria-hidden="true" />
          Ottieni corso
        </Link>
      </div>
    </div>
  )
}
