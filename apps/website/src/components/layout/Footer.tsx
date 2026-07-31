import Link from 'next/link'
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { footerNav } from '@/config/nav'
import { AcademyTag, EcoterLogo } from '@/components/ui/LogoEcoter'
import { Container } from './Container'

export function Footer() {
  const year = new Date().getFullYear()

  // Cast to string to avoid narrowing issues with `as const` literal types
  const phone = siteConfig.phone as string
  const linkedin = siteConfig.socials.linkedin as string

  const navSections = [
    footerNav.courses,
    footerNav.solutions,
    footerNav.resources,
    footerNav.company,
  ] as const

  return (
    <footer
      className="relative overflow-hidden bg-brand-900 text-white"
      aria-label="Piè di pagina"
    >
      <div className="bg-grid-pattern absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_120%,rgba(15,143,120,0.12),transparent)]"
        aria-hidden="true"
      />
      <Container className="relative">
        {/* Main grid */}
        <div className="grid gap-10 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label={`${siteConfig.name} — homepage`}
            >
              <EcoterLogo variant="white" height={34} />
              <span className="h-6 w-px bg-white/20" aria-hidden="true" />
              <AcademyTag className="text-brand-300" />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200">
              {siteConfig.description}
            </p>

            {/* Contacts */}
            <ul
              className="mt-5 space-y-2 text-sm text-brand-200"
              aria-label="Contatti"
            >
              {siteConfig.email && (
                <li className="flex items-center gap-2">
                  <Mail
                    className="h-4 w-4 shrink-0 text-brand-400"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-2">
                  <Phone
                    className="h-4 w-4 shrink-0 text-brand-400"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="transition-colors hover:text-white"
                  >
                    {phone}
                  </a>
                </li>
              )}
              {siteConfig.address.city && (
                <li className="flex items-center gap-2">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-brand-400"
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

            {/* Social */}
            {linkedin && (
              <div className="mt-5 flex gap-2">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-brand-300 transition-colors hover:bg-white/20 hover:text-white"
                  aria-label="Profilo LinkedIn di ECOTER Academy"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          {/* Nav columns */}
          {navSections.map((section) => (
            <div key={section.label}>
              <h2 className="mb-4 text-xs font-semibold tracking-wider text-brand-400 uppercase">
                {section.label}
              </h2>
              <ul className="space-y-2.5" aria-label={section.label}>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-brand-200 transition-colors hover:text-white"
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
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-5 text-xs text-brand-400 sm:flex-row">
          <p>
            © {year} {siteConfig.founder}. Tutti i diritti riservati.
          </p>
          <nav aria-label="Link legali">
            <ul className="flex flex-wrap items-center gap-4">
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-brand-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie"
                  className="transition-colors hover:text-brand-200"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/note-legali"
                  className="transition-colors hover:text-brand-200"
                >
                  Note Legali
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
