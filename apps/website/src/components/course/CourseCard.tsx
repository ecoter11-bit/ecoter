import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import { cn } from '@/lib/utils'
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
 * MODIFICHE del 29/09/2026: solo il nome del corso e un bottone verde per
 * andare al corso — niente livello, durata, modalità, normativa né
 * descrizione, che restano nella scheda. Tutto sul verde della home: filetto
 * in cima e bottone `default` del design system (`bg-primary`).
 *
 * Tutta la card porta alla scheda (richiesta di Davide del 24/09/2026): il
 * link è sul titolo e si allarga alla card intera con uno pseudo-elemento
 * (`after:absolute after:inset-0`), così il nome accessibile del link resta
 * il solo titolo e non "Vedi il corso" ripetuto su ogni card. Il bottone è
 * quindi un'indicazione visiva (`aria-hidden`), disegnato con
 * `buttonVariants` e scurito (`brand-700`) quando si passa sopra la card. Il
 * focus da tastiera è disegnato sulla card intera (`has-[a:focus-visible]`);
 * il link rinuncia al proprio contorno solo dove `:has()` è supportato.
 * Transizioni solo su spostamento, ombra e bordo, perché il contorno di
 * focus compaia subito.
 */
export function CourseCard({ course, headingLevel = 3, className }: Props) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4'

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white',
        'transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-transparent hover:shadow-xl',
        'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring',
        className
      )}
    >
      <div className="h-1 w-full shrink-0 bg-primary" aria-hidden="true" />

      <div className="flex flex-1 flex-col p-6">
        <Heading className="flex-1 font-heading text-lg leading-snug font-bold text-balance text-neutral-950">
          <Link
            href={`/corsi/${course.slug}`}
            className="after:absolute after:inset-0 supports-[selector(:has(*))]:outline-none"
          >
            {course.title}
          </Link>
        </Heading>

        <span
          className={cn(
            buttonVariants({ variant: 'default' }),
            'mt-6 h-11 w-full gap-2 px-5 text-sm font-semibold group-hover:bg-brand-700'
          )}
          aria-hidden="true"
        >
          Vedi il corso
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}
