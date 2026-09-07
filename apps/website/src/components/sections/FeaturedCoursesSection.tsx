'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import { Container } from '@/components/layout'
import { CourseCard } from '@/components/course/CourseCard'
import {
  slideUp,
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'
import { cn } from '@/lib/utils'
import type { Course } from '@/types'

type Props = {
  /**
   * Vetrina curata, già risolta lato server da `getHomeFeaturedCourses()` —
   * si configura in `content/settings/featured-courses.json` (array ordinato
   * di slug), non qui.
   */
  courses: Course[]
}

export function FeaturedCoursesSection({ courses }: Props) {
  // Vetrina vuota → niente sezione: meglio saltare il blocco che mostrare un
  // titolo su una griglia vuota (il fallback lato server rende il caso raro).
  if (courses.length === 0) return null

  return (
    <section
      aria-labelledby="corsi-evidenza-heading"
      className="border-b border-neutral-200 bg-neutral-50"
    >
      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={slideUp} className="mb-14 text-center">
            <p className="mb-3 text-brand-700 overline">I più richiesti</p>
            <h2
              id="corsi-evidenza-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Corsi in evidenza
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-neutral-600">
              Una selezione dei nostri percorsi, tra obblighi di legge e
              specializzazione professionale.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <motion.div key={course.slug} variants={slideUpGentle}>
                <CourseCard
                  course={course}
                  showFeaturedBadge={false}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>

          <motion.div variants={slideUp} className="mt-12 text-center">
            <Link
              href="/corsi"
              className={cn(
                buttonVariants({ variant: 'outline-brand' }),
                'group/cta h-11 gap-2 px-6 text-sm font-semibold'
              )}
            >
              Vedi tutti i corsi
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
