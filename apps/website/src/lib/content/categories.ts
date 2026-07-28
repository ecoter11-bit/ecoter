import { existsSync, readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { categorySchema } from '@/lib/validation'
import type { Category, CategoryWithCount } from '@/types'
import { getAllCourses } from './courses'

const CATEGORIES_DIR = join(process.cwd(), 'content', 'categories')

function parseCategoryFile(filepath: string): Category {
  const raw = readFileSync(filepath, 'utf-8')
  const data: unknown = JSON.parse(raw)
  return categorySchema.parse(data)
}

export function getAllCategories(): Category[] {
  if (!existsSync(CATEGORIES_DIR)) return []

  const files = readdirSync(CATEGORIES_DIR).filter((f) => f.endsWith('.json'))

  return files
    .flatMap((filename) => {
      try {
        return [parseCategoryFile(join(CATEGORIES_DIR, filename))]
      } catch (err) {
        console.error(`[content:categories] Errore in ${filename}:`, err)
        return []
      }
    })
    .sort((a, b) => a.order - b.order)
}

export function getCategory(slug: string): Category | undefined {
  const filepath = join(CATEGORIES_DIR, `${slug}.json`)
  if (!existsSync(filepath)) return undefined

  try {
    return parseCategoryFile(filepath)
  } catch (err) {
    console.error(`[content:categories] Errore nella categoria "${slug}":`, err)
    return undefined
  }
}

export function getAllCategoriesWithCount(): CategoryWithCount[] {
  const categories = getAllCategories()
  const courses = getAllCourses()

  return categories.map((cat) => ({
    ...cat,
    courseCount: courses.filter((c) => c.category === cat.slug).length,
  }))
}

export function getCategoryWithCount(
  slug: string
): CategoryWithCount | undefined {
  const category = getCategory(slug)
  if (!category) return undefined

  const courseCount = getAllCourses({ category: slug }).length
  return { ...category, courseCount }
}
