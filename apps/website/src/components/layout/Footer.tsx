import type * as React from 'react'
import Link from 'next/link'
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { footerNav } from '@/config/nav'
import { AcademyTag, EcoterLogo } from '@/components/ui/LogoEcoter'
import { Container } from './Container'

type FooterProps = {
  privacyPolicyHref: string
  cookiePolicyHref: string
}

/**
 * lucide-react ships no brand/logo icons (LinkedIn included) — inlined here
 * rather than adding an icon library for one glyph, same call as the
 * ChevronDownIcon in packages/ui/src/accordion.tsx.
 */
function LinkedinIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function Footer({ privacyPolicyHref, cookiePolicyHref }: FooterProps) {
  const year = new Date().getFullYear()

  // Cast to string to avoid narrowing issues with `as const` literal types
  const phone = siteConfig.phone as string
  const linkedin = siteConfig.socials.linkedin as string

  const navSections = [footerNav.courses, footerNav.company] as const

  return (
    <footer
      className="border-t border-neutral-200 bg-neutral-50"
      aria-label="Piè di pagina"
    >
      <Container>
        {/* Main grid */}
        <div className="grid gap-10 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label={`${siteConfig.name} — homepage`}
            >
              <EcoterLogo height={34} />
              <span className="h-6 w-px bg-neutral-200" aria-hidden="true" />
              <AcademyTag className="text-neutral-600" />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">
              {siteConfig.description}
            </p>

            {/* Contacts */}
            <ul
              className="mt-5 space-y-2 text-sm text-neutral-600"
              aria-label="Contatti"
            >
              {siteConfig.email && (
                <li className="flex items-center gap-2">
                  <Mail
                    className="h-4 w-4 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="transition-colors hover:text-neutral-950"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-2">
                  <Phone
                    className="h-4 w-4 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="transition-colors hover:text-neutral-950"
                  >
                    {phone}
                  </a>
                </li>
              )}
              {siteConfig.address.city && (
                <li className="flex items-center gap-2">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  <span>
                    {siteConfig.address.street
                      ? `${siteConfig.address.street}, `
                      : ''}
                    {siteConfig.address.postalCode
                      ? `${siteConfig.address.postalCode} `
                      : ''}
                    {siteConfig.address.city}
                  </span>
                </li>
              )}
            </ul>

            {/* Group site + Social */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a
                href={siteConfig.parentSite}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 transition-colors hover:text-brand-800"
              >
                Visita il sito di ECO-TER
                <ExternalLink className="size-3.5" aria-hidden="true" />
                {/* L'icona è decorativa: l'avviso di nuova scheda deve
                    arrivare anche a chi non la vede. Ora che le informative
                    sono interne, questo è l'unico link che esce dal sito. */}
                <span className="sr-only">
                  {' '}
                  (si apre in una nuova scheda, sito ECO-TER Srl)
                </span>
              </a>

              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  /* Same AA-verified outline recipe as `outline-brand` in
                   * @ecoter/ui's button.tsx (border-brand-600 bg-white
                   * text-brand-700 hover:bg-brand-50) — a brand-50/100
                   * border sits at ~1:1 contrast against this footer's
                   * neutral-50 and is functionally invisible as a boundary
                   * (SC 1.4.11). */
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-600 bg-white text-brand-700 transition-colors hover:bg-brand-50"
                  aria-label="Profilo LinkedIn di ECO-TER Academy"
                >
                  <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Nav columns */}
          {navSections.map((section) => (
            <div key={section.label}>
              <h2 className="mb-4 text-xs font-semibold tracking-wider text-brand-700 uppercase">
                {section.label}
              </h2>
              <ul className="space-y-2.5" aria-label={section.label}>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-600 transition-colors hover:text-neutral-950"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200 py-5 text-xs text-neutral-600 sm:flex-row">
          <p>
            © {year} {siteConfig.founder}. Tutti i diritti riservati.
          </p>
          <nav aria-label="Link legali">
            <ul className="flex flex-wrap items-center gap-4">
              {/* Pagine interne dell'Academy (non più le informative della
                  casa madre): link normali, nessun indicatore di link
                  esterno / nuova scheda. */}
              <li>
                <Link
                  href={privacyPolicyHref}
                  className="transition-colors hover:text-brand-700"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={cookiePolicyHref}
                  className="transition-colors hover:text-brand-700"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
