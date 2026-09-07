import { existsSync, readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { subcategorySchema } from '@/lib/validation'
import type { Subcategory, SubcategoryWithCount } from '@/types'
import { getAllCourses } from './courses'
import { SUBCATEGORIZED_CATEGORY } from './subcategory-mapping'

const SUBCATEGORIES_DIR = join(process.cwd(), 'content', 'subcategories')

function parseSubcategoryFile(filepath: string): Subcategory {
  const raw = readFileSync(filepath, 'utf-8')
  const data: unknown = JSON.parse(raw)
  return subcategorySchema.parse(data)
}

export function getAllSubcategories(parent?: string): Subcategory[] {
  if (!existsSync(SUBCATEGORIES_DIR)) return []

  const files = readdirSync(SUBCATEGORIES_DIR).filter((f) =>
    f.endsWith('.json')
  )

  return files
    .flatMap((filename) => {
      try {
        return [parseSubcategoryFile(join(SUBCATEGORIES_DIR, filename))]
      } catch (err) {
        console.error(`[content:subcategories] Errore in ${filename}:`, err)
        return []
      }
    })
    .filter((s) => !parent || s.parent === parent)
    .sort((a, b) => a.order - b.order)
}

export function getSubcategory(slug: string): Subcategory | undefined {
  const filepath = join(SUBCATEGORIES_DIR, `${slug}.json`)
  if (!existsSync(filepath)) return undefined

  try {
    return parseSubcategoryFile(filepath)
  } catch (err) {
    console.error(`[content:subcategories] Errore in "${slug}":`, err)
    return undefined
  }
}

/**
 * Sotto-aree con il numero di corsi pubblicati che ricadono in ciascuna.
 * La somma dei conteggi coincide con il totale dei corsi della categoria
 * padre — invariante verificata da `pnpm validate`.
 */
export function getAllSubcategoriesWithCount(
  parent: string = SUBCATEGORIZED_CATEGORY
): SubcategoryWithCount[] {
  const subcategories = getAllSubcategories(parent)
  const courses = getAllCourses({ category: parent })

  return subcategories.map((sub) => ({
    ...sub,
    courseCount: courses.filter((c) => c.subcategory === sub.slug).length,
  }))
}

export { SUBCATEGORIZED_CATEGORY } from './subcategory-mapping'
