export const siteConfig = {
  name: 'ECOTER Academy',
  shortName: 'ECOTER',
  description:
    'Formazione professionale accreditata per aziende e professionisti. Corsi di sicurezza sul lavoro, qualità, ambiente e gestione.',
  url: 'https://academy.ecoter.it',
  ogImage: '/og/default.jpg',
  locale: 'it_IT',
  language: 'it',
  founder: 'ECOTER Srl',
  /**
   * Contact fields mirror `content/settings/site.json` (loaded via
   * `getSiteSettings()` for /contatti) — inherited from the parent company
   * (ECOTER Srl, sicurezzalavoroeambiente.it), NOT yet confirmed as the
   * Academy's own. Keep both in sync until there's a single source of
   * truth; see `content/settings/site.json`'s `contactInfoProvisional`.
   */
  email: 'info@eco-ter.com',
  phone: '+39 051 4690064',
  address: {
    street: 'Via del Lavoro, 2',
    city: 'Pianoro (BO)',
    postalCode: '40065',
    region: 'Emilia-Romagna',
    country: 'IT',
  },
  socials: {
    linkedin: 'https://linkedin.com/company/ecoter',
  },
  seo: {
    titleSeparator: '|',
    titleTemplate: '%s | ECOTER Academy',
    defaultTitle: 'ECOTER Academy — Formazione Professionale Accreditata',
    defaultDescription:
      'Corsi di formazione accreditati per aziende e professionisti: sicurezza sul lavoro, ambiente, sistemi di gestione e benessere psico-sociale.',
  },
} as const

export type SiteConfig = typeof siteConfig
