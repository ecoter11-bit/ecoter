import { siteConfig } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'
import type { Course, CourseModality } from '@/types'

const courseModeByModality: Record<CourseModality, string> = {
  aula: 'Onsite',
  online: 'Online',
  blended: 'Blended',
  'in-house': 'Onsite',
}

/**
 * schema.org `Course` JSON-LD for a course detail page. `hasCourseInstance`
 * gives Google one entry per modality (courseWorkload as ISO 8601 duration,
 * `PT{h}H`) rather than one flattened instance — a course offered in both
 * aula and blended is genuinely two distinct instances, not one with two
 * labels.
 */
export function buildCourseJsonLd(course: Course): Record<string, unknown> {
  const url = absoluteUrl(`/corsi/${course.slug}`)

  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.seo.description ?? course.excerpt,
    url,
    inLanguage: 'it',
    provider: {
      '@type': 'Organization',
      name: siteConfig.founder,
      sameAs: siteConfig.url,
    },
    hasCourseInstance: course.modality.map((modality) => ({
      '@type': 'CourseInstance',
      courseMode: courseModeByModality[modality],
      courseWorkload: `PT${course.duration.hours}H`,
    })),
  }

  // Nessun `offers`: i prezzi non sono più pubblicati sul sito e un `Offer`
  // senza `price`/`priceCurrency` è invalido per Google — meglio ometterlo
  // che emettere structured data incompleto.

  if (course.certification) {
    json.educationalCredentialAwarded = course.certification
  }

  if (course.prerequisites.length > 0) {
    json.coursePrerequisites = course.prerequisites.join('; ')
  }

  return json
}
