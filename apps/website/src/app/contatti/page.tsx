import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, AlertTriangle } from 'lucide-react'
import { Alert } from '@ecoter/ui'
import { getSiteSettings } from '@/lib/content'
import { Container } from '@/components/layout'
import { absoluteUrl, telHref } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'I recapiti di ECO-TER Academy: commerciale, responsabile della formazione, email e sede a Pianoro (BO).',
  alternates: {
    canonical: absoluteUrl('/contatti'),
  },
}

/**
 * Contatti (MODIFICHE del 29/09/2026): solo i recapiti, nessun modulo. Chi
 * vuole informazioni su un corso le chiede dalla scheda del corso, che porta
 * al modulo di /richiedi-informazioni (i vecchi link `/contatti?corso=…`
 * rimandano lì, vedi `next.config.ts`).
 *
 * In cima i numeri diretti (commerciale e responsabile della formazione),
 * poi il numero dell'ufficio, l'email e gli orari; a lato la sede.
 */
export default function ContattiPage() {
  const settings = getSiteSettings()

  const phones = [
    ...settings.contactPhones,
    { label: 'Ufficio', number: settings.phone },
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
            Chiamaci o scrivici: ti rispondiamo entro un giorno lavorativo.
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

          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
            {/* Telefono, email, orari */}
            <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
              <h2 className="mb-6 flex items-center gap-2.5 font-heading text-2xl font-bold text-neutral-950">
                <Phone
                  className="size-5 shrink-0 text-brand-600"
                  aria-hidden="true"
                />
                Chiamaci
              </h2>
              {/* Una riga per numero (etichetta a sinistra, numero a destra)
                  fino a `xl`, dove i tre numeri stanno affiancati: con due
                  colonne il terzo restava solo sulla seconda riga. */}
              <dl className="grid gap-4 xl:grid-cols-3 xl:gap-5">
                {phones.map((phone) => (
                  <div
                    key={phone.number}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 xl:block"
                  >
                    <dt className="text-sm text-neutral-600">{phone.label}</dt>
                    <dd className="xl:mt-1">
                      <a
                        href={telHref(phone.number)}
                        className="font-heading text-lg font-semibold whitespace-nowrap text-neutral-950 underline decoration-brand-600/40 underline-offset-4 hover:text-brand-700 hover:decoration-brand-700"
                      >
                        {phone.number}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 border-t border-neutral-100 pt-8">
                <h2 className="mb-4 flex items-center gap-2.5 font-heading text-2xl font-bold text-neutral-950">
                  <Mail
                    className="size-5 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  Scrivici
                </h2>
                <a
                  href={`mailto:${settings.email}`}
                  className="font-heading text-lg font-semibold break-all text-neutral-950 underline decoration-brand-600/40 underline-offset-4 hover:text-brand-700 hover:decoration-brand-700"
                >
                  {settings.email}
                </a>
              </div>

              {settings.hours && (
                <p className="mt-8 flex items-start gap-2.5 text-sm text-neutral-600">
                  <Clock
                    className="mt-0.5 size-4 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="sr-only">Orari: </span>
                    {settings.hours}
                  </span>
                </p>
              )}
            </div>

            {/* Sede + mappa statica */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2.5 font-heading text-lg font-bold text-neutral-950">
                  <MapPin
                    className="size-4 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  Sede
                </h2>
                <address className="text-sm text-neutral-600 not-italic">
                  {settings.address.street}
                  <br />
                  {settings.address.cap} {settings.address.city} (
                  {settings.address.province})
                </address>
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
                  <span className="sr-only">
                    {' '}
                    (si apre in una nuova scheda)
                  </span>
                </span>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
