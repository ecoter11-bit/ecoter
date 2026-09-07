import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { featuredCoursesSchema } from '@/lib/validation'
import { getAllCourses, getCourse, type CourseData } from './courses'

const FEATURED_PATH = join(
  process.cwd(),
  'content',
  'settings',
  'featured-courses.json'
)

/**
 * Slug della vetrina, nell'ordine in cui sono scritti nel file. File assente o
 * malformato → lista vuota: la home cade sul fallback invece di andare in
 * errore in build (il file è contenuto editoriale, non codice).
 */
export function getFeaturedCourseSlugs(): string[] {
  if (!existsSync(FEATURED_PATH)) return []

  try {
    const raw = readFileSync(FEATURED_PATH, 'utf-8')
    const data: unknown = JSON.parse(raw)
    return featuredCoursesSchema.parse(data)
  } catch (err) {
    console.error(`[content:featured] featured-courses.json non valido:`, err)
    return []
  }
}

/**
 * Quanti corsi mostra la home quando la vetrina non è curata. Tre: senza una
 * scelta editoriale dietro, i "primi del catalogo" riempiono una riga e basta.
 */
const FALLBACK_COUNT = 3

/**
 * I corsi della sezione "Corsi in evidenza" della home.
 *
 * Curati da `content/settings/featured-courses.json`: quanti slug ci sono,
 * tante card — `limit` è solo una guardia (due righe piene di griglia), non la
 * dimensione prevista della vetrina. Gli slug che non corrispondono a un corso
 * pubblicato vengono saltati: un refuso, o un corso depubblicato, non devono
 * far cadere la home. Se la lista è vuota — o nessuno slug è risolvibile — si
 * ricade sui primi corsi del catalogo, così la sezione non resta mai vuota.
 */
export function getHomeFeaturedCourses(limit = 6): CourseData[] {
  const curated = getFeaturedCourseSlugs()
    .map((slug) => getCourse(slug))
    .filter((course): course is CourseData => course?.status === 'published')
    .slice(0, limit)

  if (curated.length > 0) return curated

  return getAllCourses().slice(0, FALLBACK_COUNT)
}
