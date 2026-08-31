import { existsSync, readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { courseFrontmatterSchema } from '@/lib/validation'
import type { Course, CourseLevel, CourseModality, CourseStatus } from '@/types'
import { resolveSubcategory } from './subcategory-mapping'

export type CourseData = Course & { body: string }

export type CourseFilters = {
  category?: string
  /** Slug di sotto-area (solo categoria `sicurezza`). */
  subcategory?: string
  level?: CourseLevel
  modality?: CourseModality
  featured?: boolean
  status?: CourseStatus
}

const COURSES_DIR = join(process.cwd(), 'content', 'courses')

function deriveExcerpt(body: string, maxLength = 160): string {
  const firstParagraph = body.split('\n\n')[0] ?? body.slice(0, maxLength)
  const cleaned = firstParagraph.replace(/[#*_`[\]()]/g, '').trim()
  return cleaned.length > maxLength
    ? cleaned.slice(0, maxLength).trimEnd() + '...'
    : cleaned
}

function parseCourseFile(filepath: string, filename: string): CourseData {
  const raw = readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  const fm = courseFrontmatterSchema.parse(data)
  const slug = filename.replace(/\.mdx$/, '')
  const today = new Date().toISOString().slice(0, 10)

  return {
    slug,
    title: fm.title,
    subtitle: fm.subtitle,
    excerpt: fm.excerpt ?? deriveExcerpt(content),
    category: fm.category,
    code: fm.code,
    subcategory: resolveSubcategory(fm),
    level: fm.level,
    modality: fm.modality,
    duration: fm.duration,
    pricing: fm.pricing,
    certification: fm.certification,
    targetAudience: fm.targetAudience,
    objectives: fm.objectives,
    prerequisites: fm.prerequisites,
    curriculum: fm.curriculum,
    instructors: fm.instructors,
    tags: fm.tags,
    featured: fm.featured,
    downloads: fm.downloads,
    normativeRef: fm.normativeRef,
    seo: fm.seo,
    status: fm.status,
    publishedAt: fm.publishedAt ?? today,
    updatedAt: fm.updatedAt ?? today,
    body: content.trim(),
  }
}

export function getAllCourses(filters?: CourseFilters): CourseData[] {
  if (!existsSync(COURSES_DIR)) return []

  const files = readdirSync(COURSES_DIR).filter((f) => f.endsWith('.mdx'))

  const courses = files.flatMap((filename) => {
    try {
      return [parseCourseFile(join(COURSES_DIR, filename), filename)]
    } catch (err) {
      console.error(`[content:courses] Errore in ${filename}:`, err)
      return []
    }
  })

  const targetStatus = filters?.status ?? 'published'

  return courses
    .filter((c) => c.status === targetStatus)
    .filter((c) => !filters?.category || c.category === filters.category)
    .filter(
      (c) => !filters?.subcategory || c.subcategory === filters.subcategory
    )
    .filter((c) => !filters?.level || c.level === filters.level)
    .filter(
      (c) =>
        !filters?.modality ||
        (c.modality as CourseModality[]).includes(filters.modality)
    )
    .filter(
      (c) => filters?.featured === undefined || c.featured === filters.featured
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getCourse(slug: string): CourseData | undefined {
  const filepath = join(COURSES_DIR, `${slug}.mdx`)
  if (!existsSync(filepath)) return undefined

  try {
    return parseCourseFile(filepath, `${slug}.mdx`)
  } catch (err) {
    console.error(`[content:courses] Errore nel corso "${slug}":`, err)
    return undefined
  }
}

export function getAllCourseSlugs(): string[] {
  if (!existsSync(COURSES_DIR)) return []
  return readdirSync(COURSES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getCoursesByCategory(categorySlug: string): CourseData[] {
  return getAllCourses({ category: categorySlug })
}

export function getFeaturedCourses(limit = 6): CourseData[] {
  return getAllCourses({ featured: true }).slice(0, limit)
}
