import { ButtonLinkCard } from '@/components/catalog/ButtonLinkCard'
import type { Course } from '@/types'

type Props = {
  course: Course
  /**
   * Livello dell'intestazione del titolo. Default `3`: le liste di card
   * stanno sotto una `h2` di sezione (anche solo per screen reader). Se una
   * lista finisce sotto un'intestazione di gruppo `h3`, le card scendono a
   * `h4`, altrimenti la navigazione per intestazioni non distinguerebbe un
   * gruppo da un corso (WCAG 1.3.1).
   */
  headingLevel?: 2 | 3 | 4
  className?: string
}

/**
 * Card di un corso negli elenchi del catalogo (aree e sotto-aree). Dal
 * 30/09/2026 la scheda del corso non suggerisce più "Altri corsi".
 *
 * MODIFICHE del 29/09/2026: solo il nome del corso e un bottone verde "Vedi
 * il corso" — niente livello, durata, modalità, normativa né descrizione,
 * che restano nella scheda. Disegno e comportamento (card tutta cliccabile,
 * focus sulla card) sono in `ButtonLinkCard`, condiviso con i percorsi di
 * Benessere psico-sociale.
 */
export function CourseCard({ course, headingLevel = 3, className }: Props) {
  return (
    <ButtonLinkCard
      href={`/corsi/${course.slug}`}
      title={course.title}
      ctaLabel="Vedi il corso"
      headingLevel={headingLevel}
      className={className}
    />
  )
}
