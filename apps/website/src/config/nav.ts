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
    href: '/corsi?step=3&cat=sicurezza',
    icon: 'HardHat',
  },
  {
    label: 'Ambiente',
    href: '/corsi?step=3&cat=ambiente',
    icon: 'Leaf',
  },
  {
    label: 'Benessere psico-sociale',
    href: '/corsi?step=3&cat=benessere-psico-sociale',
    icon: 'HeartHandshake',
  },
]

export const modalityNav: NavGroup = {
  label: 'Modalità di erogazione',
  items: [
    { label: 'In Aula', href: '/corsi?step=3&mod=aula' },
    { label: 'Online', href: '/corsi?step=3&mod=online' },
    { label: 'Blended', href: '/corsi?step=3&mod=blended' },
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
