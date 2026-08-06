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
    href: '/corsi?cat=sicurezza',
    icon: 'HardHat',
  },
  {
    label: 'Ambiente',
    href: '/corsi?cat=ambiente',
    icon: 'Leaf',
  },
  {
    label: 'Sistemi di Gestione',
    href: '/corsi?cat=sistemi-di-gestione',
    icon: 'Settings2',
  },
  {
    label: 'Benessere psico-sociale',
    href: '/corsi?cat=benessere-psico-sociale',
    icon: 'HeartHandshake',
  },
]

export const modalityNav: NavGroup = {
  label: 'Modalità di erogazione',
  items: [
    { label: 'In Aula', href: '/corsi?mod=aula' },
    { label: 'Online', href: '/corsi?mod=online' },
    { label: 'Blended', href: '/corsi?mod=blended' },
  ],
}

export const footerNav = {
  courses: {
    label: 'Corsi',
    items: courseCategories.map((c) => ({ label: c.label, href: c.href })),
  },
  company: {
    label: 'Azienda',
    items: [
      { label: 'Soluzioni Aziendali', href: '/soluzioni/aziende' },
      { label: 'Chi Siamo', href: '/chi-siamo' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contatti', href: '/contatti' },
    ],
  },
} as const
