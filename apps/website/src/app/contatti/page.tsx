import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, AlertTriangle } from 'lucide-react'
import { Alert } from '@ecoter/ui'
import { getAllCourses, getSiteSettings } from '@/lib/content'
import { Container } from '@/components/layout'
import { ContactForm } from '@/components/contact/ContactForm'
import { absoluteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Richiedi informazioni sui corsi ECO-TER Academy: form dedicato, telefono, email e sede. Ti rispondiamo il prima possibile.',
  alternates: {
    canonical: absoluteUrl('/contatti'),
  },
}

type Props = {
  searchParams: Promise<{ corso?: string }>
}

export default async function ContattiPage({ searchParams }: Props) {
  const { corso } = await searchParams
  const settings = getSiteSettings()

  const courseOptions = [
    { label: 'Nessuno in particolare', value: '' },
    ...getAllCourses({ status: 'published' }).map((course) => ({
      label: course.title,
      value: course.slug,
    })),
  ]

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${settings.address.street}, ${settings.address.cap} ${settings.address.city} ${settings.address.province}`
  )}`

  return (
    <>
      {/* Intro */}
      <div className="border-b border-neutral-200 bg-white">
        <Container className="py-12 lg:py-16">
          <p className="mb-3 text-brand-700 overline">Parliamone</p>
          <h1 className="max-w-2xl font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 lg:text-5xl">
            Contatti
          </h1>
          <p className="mt-4 max-w-xl text-lg text-pretty text-neutral-600">
            Raccontaci le esigenze formative della tua organizzazione: ti
            risponderemo con un percorso su misura entro un giorno lavorativo.
          </p>
        </Container>
      </div>

      <div className="bg-neutral-25">
        <Container className="section-padding">
          {settings.contactInfoProvisional && (
            <Alert
              tone="warning"
              icon={<AlertTriangle className="size-4" />}
              className="mb-8"
            >
              Recapiti provvisori, ereditati dalla casa madre — in attesa di
              conferma per ECO-TER Academy.
            </Alert>
          )}

          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
            {/* Form */}
            <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
              <h2 className="mb-6 font-heading text-2xl font-bold text-neutral-950">
                Richiedi informazioni
              </h2>
              <ContactForm
                courseOptions={courseOptions}
                initialCourseSlug={corso}
                privacyPolicyHref={settings.privacyPolicy}
              />
            </div>

            {/* Recapiti + mappa statica */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 font-heading text-lg font-bold text-neutral-950">
                  Recapiti
                </h2>
                <div className="space-y-4 text-sm text-neutral-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    <dl>
                      <dt className="sr-only">Indirizzo</dt>
                      <dd>
                        {settings.address.street}
                        <br />
                        {settings.address.cap} {settings.address.city} (
                        {settings.address.province})
                      </dd>
                    </dl>
                  </div>
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
                  {settings.hours && (
                    <div className="flex items-start gap-2.5">
                      <Clock
                        className="mt-0.5 size-4 shrink-0 text-brand-600"
                        aria-hidden="true"
                      />
                      <dl>
                        <dt className="sr-only">Orari</dt>
                        <dd>{settings.hours}</dd>
                      </dl>
                    </div>
                  )}
                </div>
              </div>

              {/* Riquadro statico — nessuna dipendenza esterna/API key richiesta */}
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-40 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-neutral-200 bg-brand-900 text-white transition-colors hover:border-brand-600"
              >
                <div
                  className="bg-grid-pattern absolute inset-0"
                  aria-hidden="true"
                />
                <MapPin
                  className="relative size-7 text-eco-300 transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span className="relative text-sm font-semibold">
                  Apri in Google Maps
                </span>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
