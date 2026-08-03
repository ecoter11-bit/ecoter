import { CourseCard } from './CourseCard'
import type { Course } from '@/types'

type Props = {
  courses: Course[]
  categoryLabel: string
}

export function RelatedCourses({ courses, categoryLabel }: Props) {
  if (courses.length === 0) return null

  return (
    <section
      aria-labelledby="corsi-correlati-heading"
      className="border-t border-neutral-200 bg-neutral-25"
    >
      <div className="container-default section-padding">
        <p className="mb-3 text-brand-700 overline">Continua a esplorare</p>
        <h2
          id="corsi-correlati-heading"
          className="mb-8 font-heading text-2xl font-light tracking-tight text-balance text-neutral-950 lg:text-3xl"
        >
          Altri corsi in {categoryLabel}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  )
}
