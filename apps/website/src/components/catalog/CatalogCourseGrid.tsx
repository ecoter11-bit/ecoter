import { Container } from '@/components/layout'
import { CourseCard } from '@/components/course/CourseCard'
import type { Course } from '@/types'

type Props = {
  courses: Course[]
  /** Titolo della sezione per la navigazione a intestazioni (non visibile). */
  heading: string
}

/**
 * Elenco semplice dei corsi di un'area o di una sotto-area: nessun filtro
 * (gli elenchi vanno da 4 a 18 corsi) — per cercare fra tutti i corsi c'è la
 * ricerca del sito.
 *
 * Tre colonne solo da 1280px: fra 1024 e 1279px la terza colonna stringe le
 * card tanto che il titolo, tagliato a due righe, perde la parte che
 * distingue i corsi della stessa famiglia ("… – Base / Avanzato /
 * Estensivo", "… – 48h / 16h"), che qui stanno uno accanto all'altro.
 * Il badge d'area è nascosto: l'elenco contiene una sola area.
 */
export function CatalogCourseGrid({ courses, heading }: Props) {
  return (
    <section aria-labelledby="elenco-corsi-heading" className="bg-neutral-25">
      <Container className="py-10 lg:py-14">
        <h2 id="elenco-corsi-heading" className="sr-only">
          {heading}
        </h2>
        {courses.length === 0 ? (
          <p className="text-neutral-600">
            Al momento non ci sono corsi disponibili.
          </p>
        ) : (
          <ul role="list" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <li key={course.slug}>
                <CourseCard course={course} showCategoryBadge={false} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  )
}
