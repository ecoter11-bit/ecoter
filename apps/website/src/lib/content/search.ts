import { compareCatalogCourses } from '@/lib/catalog'
import type { SearchIndexEntry } from '@/lib/course-search'
import { getCategory } from './categories'
import { getAllCourses, type CourseData, type CourseFilters } from './courses'
import { getSubcategory } from './subcategories'

export type { SearchIndexEntry } from '@/lib/course-search'

export type SearchResult = {
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  category: string
  level: CourseData['level']
  modality: CourseData['modality']
  duration: CourseData['duration']
  pricing: CourseData['pricing']
  featured: boolean
  tags: string[]
  score: number
}

export type SearchOptions = CourseFilters & {
  query?: string
  limit?: number
  offset?: number
}

function scoreMatch(course: CourseData, query: string): number {
  const q = query.toLowerCase()
  let score = 0

  if (course.title.toLowerCase().includes(q)) score += 10
  if (course.subtitle?.toLowerCase().includes(q)) score += 5
  if (course.excerpt.toLowerCase().includes(q)) score += 3
  if (course.tags.some((t) => t.toLowerCase().includes(q))) score += 4
  if (course.category.toLowerCase().includes(q)) score += 2
  if (course.targetAudience.some((a) => a.toLowerCase().includes(q))) score += 2

  return score
}

function courseToResult(course: CourseData, score = 0): SearchResult {
  return {
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    excerpt: course.excerpt,
    category: course.category,
    level: course.level,
    modality: course.modality,
    duration: course.duration,
    pricing: course.pricing,
    featured: course.featured,
    tags: course.tags,
    score,
  }
}

export function searchCourses(options: SearchOptions = {}): SearchResult[] {
  const { query, limit, offset = 0, ...filters } = options

  const courses = getAllCourses(filters)

  if (!query || query.trim() === '') {
    const paginated = courses.slice(offset, limit ? offset + limit : undefined)
    return paginated.map((c) => courseToResult(c))
  }

  const scored = courses
    .map((c) => ({ course: c, score: scoreMatch(c, query.trim()) }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.course.publishedAt.localeCompare(a.course.publishedAt)
    )

  const paginated = scored.slice(offset, limit ? offset + limit : undefined)
  return paginated.map(({ course, score }) => courseToResult(course, score))
}

/**
 * Indice della ricerca dell'header: i corsi pubblicati nell'ordine del
 * catalogo, con nomi di area e sotto-area già risolti. Lo serve
 * `app/search-index.json/route.ts`, generato al build; la ricerca vera la fa
 * il browser con `searchCourseIndex()` di `lib/course-search.ts`.
 */
export function buildSearchIndex(): SearchIndexEntry[] {
  return getAllCourses({ status: 'published' })
    .sort(compareCatalogCourses)
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      subtitle: c.subtitle,
      excerpt: c.excerpt,
      code: c.code,
      category: c.category,
      categoryName: getCategory(c.category)?.name ?? c.category,
      subcategoryName: c.subcategory
        ? getSubcategory(c.subcategory)?.name
        : undefined,
      targetAudience: c.targetAudience,
      tags: c.tags,
    }))
}
