export type CourseLevel = 'base' | 'intermedio' | 'avanzato'
export type CourseModality = 'aula' | 'online' | 'blended' | 'in-house'
export type CourseStatus = 'draft' | 'published' | 'archived'

export type CoursePricing =
  { type: 'fixed'; amount: number; currency: 'EUR' } | { type: 'on-request' }

export type CourseDuration = {
  hours: number
  days?: number
  /** Etichetta che sostituisce il formato derivato — vedi `course.schema.ts`. */
  label?: string
}

export type CourseModule = {
  title: string
  topics: string[]
  durationHours?: number
}

export type CourseDate = {
  id: string
  courseSlug: string
  startDate: string
  endDate: string
  city?: string
  location?: string
  modality: CourseModality
  seatsTotal?: number
  seatsLeft?: number
  status: 'open' | 'full' | 'cancelled' | 'completed'
  notes?: string
}

export type CourseSeo = {
  title?: string
  description?: string
  ogImage?: string
  keywords?: string[]
}

export type Course = {
  slug: string
  title: string
  subtitle: string
  excerpt: string
  category: string
  /** Codice di catalogo ECOTER (es. A06). */
  code?: string
  /** Sotto-area risolta (solo `sicurezza`) — vedi `lib/content/subcategories.ts`. */
  subcategory?: string
  level: CourseLevel
  modality: CourseModality[]
  duration: CourseDuration
  pricing: CoursePricing
  certification?: string
  targetAudience: string[]
  objectives: string[]
  prerequisites: string[]
  curriculum: CourseModule[]
  instructors: string[]
  tags: string[]
  featured: boolean
  downloads: string[]
  normativeRef?: string[]
  seo: CourseSeo
  status: CourseStatus
  publishedAt: string
  updatedAt: string
}

export type CourseCard = Pick<
  Course,
  | 'slug'
  | 'code'
  | 'subcategory'
  | 'title'
  | 'subtitle'
  | 'excerpt'
  | 'category'
  | 'level'
  | 'modality'
  | 'duration'
  | 'pricing'
  | 'certification'
  | 'featured'
  | 'tags'
>
