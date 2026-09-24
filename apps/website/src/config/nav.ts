import { areaHref } from '@/lib/catalog'

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

export const mainNav: NavItem[] = [
  { label: 'Corsi', href: '/corsi' },
  { label: 'Soluzioni Aziendali', href: '/soluzioni/aziende' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
]

export const courseCategories: NavCategory[] = [
  {
    label: 'Sicurezza sul Lavoro',
    href: areaHref('sicurezza'),
    icon: 'HardHat',
  },
  {
    label: 'Ambiente',
    href: areaHref('ambiente'),
    icon: 'Leaf',
  },
  {
    label: 'Benessere psico-sociale',
    href: areaHref('benessere-psico-sociale'),
    icon: 'HeartHandshake',
  },
]

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
