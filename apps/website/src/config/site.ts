export const siteConfig = {
  name: 'ECO-TER Academy',
  shortName: 'ECO-TER',
  description:
    'Formazione professionale accreditata per aziende e professionisti. Corsi di sicurezza sul lavoro, ambiente e benessere psico-sociale.',
  /** Dominio reale, registrato su Aruba e intestato a ECO-TER SRL. */
  url: 'https://ecoteracademy.it',
  ogImage: '/og/default.jpg',
  locale: 'it_IT',
  language: 'it',
  founder: 'ECO-TER Srl',
  /**
   * Contact fields mirror `content/settings/site.json` (loaded via
   * `getSiteSettings()` for /contatti). `email` è la casella dedicata di
   * ECO-TER Academy; telefono e sede restano quelli della casa madre (ECO-TER
   * Srl, sicurezzalavoroeambiente.it). Keep both in sync until there's a
   * single source of truth; see `content/settings/site.json`'s
   * `contactInfoNote`.
   */
  email: 'academy@eco-ter.com',
  phone: '+39 051 4690064',
  address: {
    street: 'Via del Lavoro, 2',
    city: 'Pianoro (BO)',
    postalCode: '40065',
    region: 'Emilia-Romagna',
    country: 'IT',
  },
  socials: {
    linkedin: 'https://www.linkedin.com/company/eco-ter-srl/',
  },
  /** Parent company site (ECO-TER Srl) — linked from the footer. */
  parentSite: 'https://sicurezzalavoroeambiente.it/',
  seo: {
    titleSeparator: '|',
    titleTemplate: '%s | ECO-TER Academy',
    defaultTitle: 'ECO-TER Academy — Formazione Professionale Accreditata',
    defaultDescription:
      'Corsi di formazione accreditati per aziende e professionisti: sicurezza sul lavoro, ambiente e benessere psico-sociale.',
  },
} as const

export type SiteConfig = typeof siteConfig
