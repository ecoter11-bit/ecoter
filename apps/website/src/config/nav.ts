export type NavItem = {
  label: string
  href: string
  description?: string
}

export type NavCategory = {
  label: string
  href: string
  icon: string
  count?: number
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const mainNav: NavItem[] = [
  { label: 'Corsi', href: '/corsi' },
  { label: 'Soluzioni Aziendali', href: '/soluzioni/aziende' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
]

export const courseCategories: NavCategory[] = [
  {
    label: 'Sicurezza sul Lavoro',
    href: '/categorie/sicurezza',
    icon: 'HardHat',
  },
  {
    label: 'Ambiente',
    href: '/categorie/ambiente',
    icon: 'Leaf',
  },
  {
    label: 'Sistemi di Gestione',
    href: '/categorie/sistemi-di-gestione',
    icon: 'Settings2',
  },
  {
    label: 'Benessere psico-sociale',
    href: '/categorie/benessere-psico-sociale',
    icon: 'HeartHandshake',
  },
]

export const audienceNav: NavGroup = {
  label: 'Per destinatario',
  items: [
    { label: 'Aziende e HR', href: '/soluzioni/aziende' },
    { label: 'Professionisti', href: '/soluzioni/professionisti' },
    { label: 'Enti Pubblici', href: '/soluzioni/enti-pubblici' },
  ],
}

export const modalityNav: NavGroup = {
  label: 'Modalità di erogazione',
  items: [
    { label: 'In Aula', href: '/corsi?modalita=aula' },
    { label: 'Online', href: '/corsi?modalita=online' },
    { label: 'In House', href: '/soluzioni/in-house' },
    { label: 'Blended', href: '/corsi?modalita=blended' },
  ],
}

export const footerNav = {
  courses: {
    label: 'Corsi',
    items: courseCategories.map((c) => ({ label: c.label, href: c.href })),
  },
  solutions: {
    label: 'Soluzioni',
    items: [
      { label: 'Per Aziende', href: '/soluzioni/aziende' },
      { label: 'Per Professionisti', href: '/soluzioni/professionisti' },
      { label: 'In House', href: '/soluzioni/in-house' },
      { label: 'Calendario', href: '/calendario' },
    ],
  },
  resources: {
    label: 'Risorse',
    items: [
      { label: 'Blog', href: '/blog' },
      { label: 'Download', href: '/download' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  company: {
    label: 'Azienda',
    items: [
      { label: 'Chi Siamo', href: '/chi-siamo' },
      { label: 'Certificazioni', href: '/certificazioni' },
      { label: 'Contatti', href: '/contatti' },
    ],
  },
} as const
