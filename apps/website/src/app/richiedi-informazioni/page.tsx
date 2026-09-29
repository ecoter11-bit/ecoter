import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft, Clock, Award, Mail, Phone } from 'lucide-react'
import { getCourse, getSiteSettings } from '@/lib/content'
import { Container } from '@/components/layout'
import { ContactForm } from '@/components/contact/ContactForm'
import { modalityIcon, modalityLabel } from '@/lib/badge-mappings'
import { absoluteUrl, formatCourseDuration, telHref } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Richiedi informazioni sul corso',
  description:
    'Chiedi informazioni su un corso ECO-TER Academy: ti rispondiamo entro un giorno lavorativo.',
  alternates: {
    canonical: absoluteUrl('/richiedi-informazioni'),
  },
  /* Come /ottieni-corso: ha senso solo raggiunta da una scheda
   * (`?corso=<slug>`), quindi resta fuori da Google e dalla sitemap. */
  robots: { index: false, follow: true },
}

type Props = {
  searchParams: Promise<{ corso?: string }>
}

/** Lo slug arriva dalla query string e finisce in un `join()` verso `content/courses/`: fuori dal pattern non viene nemmeno cercato. */
const SLUG_PATTERN = /^[a-z0-9-]+$/

/**
 * "Richiedi informazioni sul corso" (MODIFICHE del 29/09/2026): il modulo
 * che prima stava su /contatti, ora solo per il corso della scheda da cui si
 * arriva. Contatti ha solo i recapiti. Senza un corso valido non c'è niente
 * da chiedere qui: si va ai recapiti.
 */
export default async function RichiediInformazioniPage({
  searchParams,
}: Props) {
  const { corso } = await searchParams
  const courseData =
    corso && SLUG_PATTERN.test(corso) ? getCourse(corso) : undefined
  if (!courseData || courseData.status !== 'published') redirect('/contatti')

  const course = courseData
  const settings = getSiteSettings()

  return (
    <>
      {/* Intro */}
      <div className="border-b border-neutral-200 bg-white">
        <Container className="py-12 lg:py-16">
          <Link
            href={`/corsi/${course.slug}`}
            className="mb-5 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand-700 underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Torna al corso
          </Link>
          <p className="mb-3 text-brand-700 overline">Richiesta informazioni</p>
          <h1 className="max-w-2xl font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 lg:text-5xl">
            Richiedi informazioni sul corso
          </h1>
          <p className="mt-4 max-w-xl text-lg text-pretty text-neutral-600">
            Vuoi saperne di più su{' '}
            <span className="font-medium text-neutral-950">{course.title}</span>
            ? Scrivici la tua domanda: ti rispondiamo entro un giorno
            lavorativo.
          </p>
        </Container>
      </div>

      <div className="bg-neutral-25">
        <Container className="section-padding">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
            {/* Form */}
            <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
              <h2 className="mb-6 font-heading text-2xl font-bold text-neutral-950">
                La tua richiesta
              </h2>
              <ContactForm
                course={{ slug: course.slug, title: course.title }}
                privacyPolicyHref={settings.privacyPolicy}
              />
            </div>

            {/* Riepilogo corso + recapiti */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                {/* Il nome del corso è già nell'introduzione e nel modulo:
                    qui solo durata, modalità e attestato. */}
                <h2 className="mb-4 font-heading text-lg font-bold text-neutral-950">
                  Il corso
                </h2>
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

              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-heading text-lg font-bold text-neutral-950">
                  Preferisci parlarne?
                </h2>
                {/* Ogni coppia termine/valore in un solo `div`, figlio
                    diretto della `dl`, con l'icona dentro il `dt`: così gli
                    screen reader espongono le coppie (WCAG 1.3.1). */}
                <dl className="space-y-4 text-sm text-neutral-600">
                  {settings.contactPhones.map((phone) => (
                    <div key={phone.number}>
                      <dt className="flex items-center gap-2.5">
                        <Phone
                          className="size-4 shrink-0 text-brand-600"
                          aria-hidden="true"
                        />
                        {phone.label}
                      </dt>
                      <dd className="mt-0.5 pl-6.5">
                        <a
                          href={telHref(phone.number)}
                          className="font-medium text-neutral-950 underline decoration-brand-600/40 underline-offset-4 hover:text-brand-700 hover:decoration-brand-700"
                        >
                          {phone.number}
                        </a>
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt className="flex items-center gap-2.5">
                      <Mail
                        className="size-4 shrink-0 text-brand-600"
                        aria-hidden="true"
                      />
                      Email
                    </dt>
                    <dd className="mt-0.5 pl-6.5">
                      <a
                        href={`mailto:${settings.email}`}
                        className="font-medium break-all text-neutral-950 underline decoration-brand-600/40 underline-offset-4 hover:text-brand-700 hover:decoration-brand-700"
                      >
                        {settings.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
