import { z } from 'zod'

/**
 * `content/settings/featured-courses.json` — la vetrina della home, curata a
 * mano: un array ordinato di slug di corso. L'ordine del file è l'ordine in
 * cui le card compaiono nella sezione "Corsi in evidenza".
 *
 * Il file contiene solo slug: l'esistenza del corso non è verificabile qui
 * (lo schema non legge il filesystem). Gli slug sconosciuti vengono saltati a
 * runtime da `getHomeFeaturedCourses()` e segnalati come warning da
 * `pnpm validate`.
 */
export const featuredCoursesSchema = z.array(
  z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'slug non valido: usa solo minuscole, cifre e trattini'
    )
)

export type FeaturedCourses = z.infer<typeof featuredCoursesSchema>
