import type { Course } from '@/types'

/**
 * Indirizzi del catalogo — un solo punto dove si costruiscono, così menu,
 * footer, breadcrumb, sitemap e pagine non possono andare fuori sincrono.
 *
 * Il catalogo è fatto di pagine vere, generate in build: `/corsi` (scelta
 * dell'area), `/corsi/area/<area>` e, solo per Sicurezza,
 * `/corsi/area/<area>/<sotto-area>`. Sostituisce il vecchio flusso guidato
 * che teneva tutto nei parametri dell'URL di `/corsi`: in produzione la
 * navigazione che cambiava solo i parametri non veniva applicata dal router
 * di Next (filtri e selezioni restavano fermi), mentre il passaggio fra
 * pagine diverse funziona sempre ed è leggibile anche dai motori di ricerca.
 *
 * Modulo puro (niente `fs`): è importato anche da componenti client.
 */

export const CATALOG_PATH = '/corsi'

export function areaHref(area: string): string {
  return `${CATALOG_PATH}/area/${area}`
}

export function subareaHref(area: string, subarea: string): string {
  return `${areaHref(area)}/${subarea}`
}

/** Titolo senza il livello finale ("Coaching … – Base" → "Coaching …"). */
function courseFamily(title: string): string {
  return title.split(/\s+[–—-]\s+/)[0] ?? title
}

/**
 * Ordine dei corsi negli elenchi del catalogo.
 *
 * - Con codice di catalogo (Sicurezza, Ambiente): per codice, in ordine
 *   naturale (A01, A02 … A17, B01 …) — è l'ordine del catalogo ECOTER, che
 *   tiene vicini base, specifici e aggiornamenti della stessa figura.
 * - Senza codice (Benessere psico-sociale): per percorso, e dentro lo stesso
 *   percorso dal più breve al più lungo, cioè Base → Avanzato → Estensivo.
 */
export function compareCatalogCourses(a: Course, b: Course): number {
  if (a.code && b.code) {
    return a.code.localeCompare(b.code, 'it', { numeric: true })
  }
  if (a.code) return -1
  if (b.code) return 1

  return (
    courseFamily(a.title).localeCompare(courseFamily(b.title), 'it') ||
    a.duration.hours - b.duration.hours ||
    a.title.localeCompare(b.title, 'it')
  )
}

/** "1 corso" / "N corsi". */
export function formatCourseCount(count: number): string {
  return count === 1 ? '1 corso' : `${count} corsi`
}
