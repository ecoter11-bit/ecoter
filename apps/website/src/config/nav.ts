import { areaHref } from '@/lib/catalog'

export type NavItem = {
  label: string
  href: string
}

/** Pagina del calendario delle edizioni (MODIFICHE del 24/09/2026). */
export const CALENDAR_PATH = '/calendario-corsi'

/**
 * Pagina "Catalogo" del bottone "Visita il catalogo" in home (richiesta del
 * 28/09/2026): per il capo sono i corsi disponibili in questo momento, e per
 * ora è "in arrivo". Non è `CATALOG_PATH` (`/corsi`, in `lib/catalog.ts`),
 * che è il catalogo completo per aree.
 */
export const AVAILABLE_COURSES_PATH = '/catalogo'

/**
 * Voci dell'header, uguali su desktop e nel menu mobile. MODIFICHE del
 * 23/09/2026: via "Corsi", dentro FAQ e Contatti; "Soluzioni Aziendali" è
 * diventata "Aziende e professionisti", con lo stesso indirizzo
 * `/soluzioni/aziende`. MODIFICHE del 24/09: prima voce "Calendario corsi";
 * "Aziende e professionisti" diventa "Formazione su misura" (scelta di
 * Davide, dal titolo della pagina), sempre su `/soluzioni/aziende`.
 * Ai corsi si arriva dai bottoni delle aree in home, dalla ricerca e dal
 * footer.
 */
export const mainNav: NavItem[] = [
  { label: 'Calendario corsi', href: CALENDAR_PATH },
  { label: 'Formazione su misura', href: '/soluzioni/aziende' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contatti', href: '/contatti' },
]

export const courseCategories: NavItem[] = [
  { label: 'Sicurezza sul Lavoro', href: areaHref('sicurezza') },
  { label: 'Ambiente', href: areaHref('ambiente') },
  {
    label: 'Benessere psico-sociale',
    href: areaHref('benessere-psico-sociale'),
  },
]

export const footerNav = {
  courses: {
    label: 'Corsi',
    items: [
      ...courseCategories,
      { label: 'Calendario corsi', href: CALENDAR_PATH },
    ],
  },
  company: {
    label: 'Azienda',
    items: [
      { label: 'Formazione su misura', href: '/soluzioni/aziende' },
      { label: 'Chi Siamo', href: '/chi-siamo' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contatti', href: '/contatti' },
    ],
  },
} as const

/** Voce attiva: la pagina stessa o una sua sotto-pagina. */
export function isNavItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`)
}
