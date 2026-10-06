import Link from 'next/link'
import { ClipboardList, Clock, Mail } from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import { cn, formatCourseDuration } from '@/lib/utils'
import { modalityIcon, modalityLabel } from '@/lib/badge-mappings'
import { levelLabel } from '@/config/percorsi'
import type { Course } from '@/types'

type Props = {
  /** Livelli del percorso, dal più breve al più lungo. */
  courses: Course[]
}

/**
 * Livelli di un percorso di Benessere psico-sociale (MODIFICHE del
 * 06/10/2026): una card per livello con nome (Base, Avanzato, Estensivo),
 * durata e modalità, e i due bottoni della scheda corso (richiesta di
 * informazioni e richiesta d'acquisto) con il livello già indicato. Il nome
 * del livello porta alla scheda completa.
 */
export function PercorsoLivelli({ courses }: Props) {
  const unico = courses.length === 1

  return (
    <ul
      role="list"
      className={cn(
        'grid gap-5',
        unico ? 'max-w-md' : 'md:grid-cols-2 xl:grid-cols-3'
      )}
    >
      {courses.map((course) => (
        <li key={course.slug}>
          <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div
              className="h-1 w-full shrink-0 bg-primary"
              aria-hidden="true"
            />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-heading text-xl font-bold text-neutral-950">
                <Link
                  href={`/corsi/${course.slug}`}
                  className="hover:text-brand-700 hover:underline"
                >
                  {levelLabel(course.title) ?? 'Percorso completo'}
                </Link>
              </h3>
              <div className="mt-4 flex-1 space-y-2.5 text-sm text-neutral-600">
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
              </div>
              <div className="mt-6 flex flex-col gap-2.5 border-t border-neutral-100 pt-5">
                <Link
                  href={`/richiedi-informazioni?corso=${course.slug}`}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'h-auto min-h-11 w-full gap-2 px-4 py-2.5 text-center text-sm font-semibold whitespace-normal'
                  )}
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  Richiedi informazioni
                  <span className="sr-only">
                    {' '}
                    sul livello {levelLabel(course.title) ?? course.title}
                  </span>
                </Link>
                <Link
                  href={`/ottieni-corso?corso=${course.slug}`}
                  className={cn(
                    buttonVariants({ variant: 'outline-brand' }),
                    'h-11 w-full gap-2 px-4 text-sm font-semibold'
                  )}
                >
                  <ClipboardList className="size-4" aria-hidden="true" />
                  Ottieni il percorso
                  <span className="sr-only">
                    {' '}
                    – livello {levelLabel(course.title) ?? course.title}
                  </span>
                </Link>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
