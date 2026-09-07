import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Award, CreditCard, Mail, Phone } from 'lucide-react'
import { Alert } from '@ecoter/ui'
import { getAllCourses, getCourse, getSiteSettings } from '@/lib/content'
import { Container } from '@/components/layout'
import { OrderForm } from '@/components/order/OrderForm'
import { modalityIcon, modalityLabel } from '@/lib/badge-mappings'
import { absoluteUrl, formatCourseDuration } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Ottieni corso',
  description:
    'Richiedi l’attivazione di un corso ECOTER Academy: lasciaci i dati di fatturazione e ti ricontattiamo per confermare date e modalità. Nessun pagamento online.',
  alternates: {
    canonical: absoluteUrl('/ottieni-corso'),
  },
  /* Pagina transazionale, utile solo raggiunta da un corso (`?corso=<slug>`):
   * fuori da quel contesto non ha contenuto proprio da indicizzare. `follow`
   * resta attivo, i link interni vanno seguiti normalmente. */
  robots: { index: false, follow: true },
}

type Props = {
  searchParams: Promise<{ corso?: string }>
}

/** Lo slug arriva dalla query string e finisce in un `join()` verso `content/courses/`: fuori dal pattern non viene nemmeno cercato. */
const SLUG_PATTERN = /^[a-z0-9-]+$/

export default async function OttieniCorsoPage({ searchParams }: Props) {
  const { corso } = await searchParams
  const settings = getSiteSettings()

  const courseData =
    corso && SLUG_PATTERN.test(corso) ? getCourse(corso) : undefined
  const course =
    courseData && courseData.status === 'published' ? courseData : undefined

  const courseOptions = getAllCourses({ status: 'published' }).map((c) => ({
    label: c.title,
    value: c.slug,
  }))

  return (
    <>
      {/* Intro */}
      <div className="border-b border-neutral-200 bg-white">
        <Container className="py-12 lg:py-16">
          {course && (
            <Link
              href={`/corsi/${course.slug}`}
              className="mb-5 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand-700 underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Torna al corso
            </Link>
          )}
          <p className="mb-3 text-brand-700 overline">Richiesta di acquisto</p>
          <h1 className="max-w-2xl font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 lg:text-5xl">
            Ottieni corso
          </h1>
          <p className="mt-4 max-w-xl text-lg text-pretty text-neutral-600">
            {course ? (
              <>
                Stai richiedendo{' '}
                <span className="font-medium text-neutral-950">
                  {course.title}
                </span>
                . Lasciaci i dati di fatturazione: ti ricontattiamo entro un
                giorno lavorativo per confermare date, modalità e costo.
              </>
            ) : (
              <>
                Scegli il corso e lasciaci i dati di fatturazione: ti
                ricontattiamo entro un giorno lavorativo per confermare date,
                modalità e costo.
              </>
            )}
          </p>
        </Container>
      </div>

      <div className="bg-neutral-25">
        <Container className="section-padding">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
            {/* Form */}
            <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
              <h2 className="mb-6 font-heading text-2xl font-bold text-neutral-950">
                Dati per la richiesta
              </h2>
              <OrderForm
                course={
                  course
                    ? { slug: course.slug, title: course.title }
                    : undefined
                }
                courseOptions={courseOptions}
                privacyPolicyHref={settings.privacyPolicy}
              />
            </div>

            {/* Riepilogo corso + come funziona */}
            <div className="flex flex-col gap-6">
              <Alert
                tone="success"
                icon={<CreditCard className="size-4" />}
                className="items-center"
              >
                <span className="font-medium text-neutral-950">
                  Nessun pagamento online.
                </span>{' '}
                Raccogliamo solo i dati per la fattura: la conferma e il
                pagamento avvengono dopo il nostro contatto.
              </Alert>

              {course && (
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-4 font-heading text-lg font-bold text-neutral-950">
                    Il corso richiesto
                  </h2>
                  <p className="mb-4 text-sm font-medium text-neutral-950">
                    {course.title}
                  </p>
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
                </div>
              )}

              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-heading text-lg font-bold text-neutral-950">
                  Come funziona
                </h2>
                <ol className="space-y-3 text-sm text-neutral-600">
                  {[
                    'Compili il form con i dati di fatturazione.',
                    'Riceviamo la richiesta e verifichiamo disponibilità e date.',
                    'Ti ricontattiamo per la conferma e la fattura.',
                  ].map((step, index) => (
                    <li key={step} className="flex items-start gap-2.5">
                      <span
                        className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-heading text-lg font-bold text-neutral-950">
                  Preferisci parlarne?
                </h2>
                <div className="space-y-4 text-sm text-neutral-600">
                  <div className="flex items-center gap-2.5">
                    <Phone
                      className="size-4 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    <dl>
                      <dt className="sr-only">Telefono</dt>
                      <dd>
                        <a
                          href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                          className="hover:text-brand-700"
                        >
                          {settings.phone}
                        </a>
                      </dd>
                    </dl>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail
                      className="size-4 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    <dl>
                      <dt className="sr-only">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${settings.email}`}
                          className="hover:text-brand-700"
                        >
                          {settings.email}
                        </a>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
