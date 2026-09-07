export type {
  Course,
  CourseCard,
  CourseDate,
  CourseDuration,
  CourseLevel,
  CourseModality,
  CourseModule,
  CoursePricing,
  CourseSeo,
  CourseStatus,
} from './course'
export type { Category, CategorySeo, CategoryWithCount } from './category'
export type { Subcategory, SubcategoryWithCount } from './subcategory'

/* ─── Shared primitives ───────────────────────────────────────────────────── */

export type Instructor = {
  slug: string
  name: string
  role: string
  bio: string
  photo?: string
  credentials: string[]
  courses: string[]
}

export type Faq = {
  id: string
  question: string
  answer: string
  category?: string
  order?: number
}

export type Download = {
  slug: string
  title: string
  description?: string
  file: string
  type: 'brochure' | 'catalogo' | 'scheda-tecnica' | 'modulo' | 'altro'
  sizeKB?: number
  category?: string
  courseSlug?: string
  updatedAt: string
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  cover?: string
  author: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  category?: string
  featured: boolean
}

/* ─── UI primitives ───────────────────────────────────────────────────────── */

export type NavItemBase = {
  label: string
  href: string
  description?: string
}

export type WithChildren = {
  children: React.ReactNode
}

export type WithClassName = {
  className?: string
}
