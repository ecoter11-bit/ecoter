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
  email: 'formazione@ecoter.it',
  phone: '',
  address: {
    street: '',
    city: '',
    postalCode: '',
    region: '',
    country: 'IT',
  },
  socials: {
    linkedin: '',
  },
  seo: {
    titleSeparator: '|',
    titleTemplate: '%s | ECOTER Academy',
    defaultTitle: 'ECOTER Academy — Formazione Professionale Accreditata',
    defaultDescription:
      'Corsi di formazione accreditati per aziende e professionisti: sicurezza sul lavoro, qualità ISO, ambiente, antincendio e sistemi di gestione.',
  },
} as const

export type SiteConfig = typeof siteConfig
