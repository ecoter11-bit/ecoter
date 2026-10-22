import { siteConfig } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'
import type { SiteSettings } from '@/lib/validation/settings.schema'

/**
 * `@id` stabili dell'organizzazione e del sito: le altre entità (il
 * `provider` dei corsi) li richiamano invece di ripetere i dati.
 */
export const ORGANIZATION_ID = absoluteUrl('/#organization')
export const WEBSITE_ID = absoluteUrl('/#website')

/**
 * `@graph` con `EducationalOrganization` e `WebSite`, renderizzato in ogni
 * pagina dal layout. I dati vengono solo da `content/settings/site.json` e
 * da `siteConfig`. Niente `SearchAction`: la ricerca è solo lato client e non
 * ha un indirizzo con la query.
 */
export function buildSiteJsonLd(
  settings: SiteSettings
): Record<string, unknown> {
  const url = absoluteUrl('')
  const { address } = settings

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': ORGANIZATION_ID,
        name: settings.name,
        url,
        logo: absoluteUrl(siteConfig.logo),
        email: settings.email,
        telephone: settings.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: address.street,
          addressLocality: address.city,
          addressRegion: address.province,
          postalCode: address.cap,
          addressCountry: address.country,
        },
        parentOrganization: {
          '@type': 'Organization',
          name: siteConfig.founder,
          url: siteConfig.parentSite,
        },
        ...(settings.social.linkedin
          ? { sameAs: [settings.social.linkedin] }
          : {}),
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: settings.name,
        url,
        inLanguage: 'it-IT',
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  }
}
