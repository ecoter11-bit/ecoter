/**
 * Percorsi dell'area Benessere psico-sociale (MODIFICHE del 06/10/2026).
 *
 * La pagina dell'area non elenca più i sei corsi ma tre percorsi; entrando in
 * un percorso si vedono la descrizione e i livelli (Base, Avanzato,
 * Estensivo). Un corso appartiene al percorso se ha il suo `tag` nel
 * frontmatter: le schede dei singoli livelli restano dove sono (stesso
 * indirizzo `/corsi/<slug>`).
 *
 * Modulo puro (niente `fs`): importabile anche da componenti client.
 */
export type Percorso = {
  slug: string
  /** Area a cui appartiene (slug della categoria). */
  area: string
  /** Nome del bottone e titolo della pagina. */
  title: string
  /** Tag dei corsi (livelli) che fanno parte del percorso. */
  tag: string
}

export const PERCORSI: Percorso[] = [
  {
    slug: 'sportello-di-ascolto',
    area: 'benessere-psico-sociale',
    title: 'Sportello di ascolto',
    tag: 'sportello-di-ascolto',
  },
  {
    slug: 'coaching-individuale',
    area: 'benessere-psico-sociale',
    title: 'Coaching individuale',
    tag: 'coaching-psicologico',
  },
  {
    slug: 'analisi-delle-risorse-e-delle-competenze',
    area: 'benessere-psico-sociale',
    title: 'Analisi delle risorse e delle competenze',
    tag: 'assessment',
  },
]

export function getPercorsi(area: string): Percorso[] {
  return PERCORSI.filter((p) => p.area === area)
}

export function getPercorso(area: string, slug: string): Percorso | undefined {
  return PERCORSI.find((p) => p.area === area && p.slug === slug)
}

/** Percorso di un corso (dai tag), se l'area è divisa in percorsi. */
export function percorsoOfCourse(course: {
  category: string
  tags: string[]
}): Percorso | undefined {
  return PERCORSI.find(
    (p) => p.area === course.category && course.tags.includes(p.tag)
  )
}

/** Nome del livello dal titolo del corso ("Coaching individuale – Base" → "Base"). */
export function levelLabel(title: string): string | undefined {
  const parti = title.split(/\s+[–—-]\s+/)
  return parti.length > 1 ? parti[parti.length - 1] : undefined
}
