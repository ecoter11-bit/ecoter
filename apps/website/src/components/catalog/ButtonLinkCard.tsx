import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@ecoter/ui'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  title: string
  /** Testo del bottone verde in fondo (decorativo: il nome del link è il titolo). */
  ctaLabel: string
  /** Livello dell'intestazione del titolo (vedi `CourseCard`). */
  headingLevel?: 2 | 3 | 4
  className?: string
}

/**
 * Card del catalogo con il solo nome e un bottone verde: i corsi negli elenchi
 * ("Vedi il corso", via `CourseCard`) e i percorsi di Benessere psico-sociale
 * ("Vedi il percorso", MODIFICHE del 06/10/2026).
 *
 * Tutta la card porta alla pagina: il link è sul titolo e si allarga alla
 * card intera con uno pseudo-elemento (`after:absolute after:inset-0`), così
 * il nome accessibile del link resta il solo titolo. Il bottone è
 * un'indicazione visiva (`aria-hidden`), disegnato con `buttonVariants` e
 * scurito (`brand-700`) quando si passa sopra la card. Il focus da tastiera è
 * disegnato sulla card intera (`has-[a:focus-visible]`); il link rinuncia al
 * proprio contorno solo dove `:has()` è supportato. Transizioni solo su
 * spostamento, ombra e bordo, perché il contorno di focus compaia subito.
 */
export function ButtonLinkCard({
  href,
  title,
  ctaLabel,
  headingLevel = 3,
  className,
}: Props) {
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
            href={href}
            className="after:absolute after:inset-0 supports-[selector(:has(*))]:outline-none"
          >
            {title}
          </Link>
        </Heading>

        <span
          className={cn(
            buttonVariants({ variant: 'default' }),
            'mt-6 h-11 w-full gap-2 px-5 text-sm font-semibold group-hover:bg-brand-700'
          )}
          aria-hidden="true"
        >
          {ctaLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}
