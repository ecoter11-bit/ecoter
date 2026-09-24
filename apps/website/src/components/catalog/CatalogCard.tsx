import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { IconCircle, type IconCircleColor } from '@ecoter/ui'
import { cn } from '@/lib/utils'
import { formatCourseCount } from '@/lib/catalog'
import { accentTextClass } from '@/lib/category-ui'

/*
 * Filetto superiore per colore d'area (stringhe intere per lo scanner di
 * Tailwind): decorativo, allo stop canonico, nascosto agli screen reader.
 * La CTA prende il colore d'area da `accentTextClass` (lo stop AA su
 * bianco, condiviso con `CourseCard`). L'icona è `IconCircle` di
 * `@ecoter/ui`, già verificato AA.
 */
const barClass: Record<IconCircleColor, string> = {
  neutral: 'bg-neutral-400',
  brand: 'bg-brand-500',
  blue: 'bg-blue-500',
  eco: 'bg-eco-500',
  amber: 'bg-amber-400',
}

type Props = {
  href: string
  title: string
  description: string
  /** Corsi pubblicati raggiungibili da questa card. */
  count: number
  icon: LucideIcon
  /** Colore dell'area (Decision 018): Sicurezza e sotto-aree `blue`, Ambiente `brand`, Benessere `amber`. */
  color: IconCircleColor
  /** Etichetta visiva della freccia in fondo (decorativa: il nome del link è il titolo). */
  ctaLabel?: string
  headingLevel?: 2 | 3
}

/**
 * Card di navigazione del catalogo (aree e sotto-aree).
 *
 * Il link è sul titolo e si allarga a tutta la card con uno pseudo-elemento
 * (`after:absolute after:inset-0`): tutta la superficie resta cliccabile, ma
 * il nome accessibile del link è solo il titolo — lettori di schermo e
 * comandi vocali non si sentono leggere descrizione e conteggio come parte
 * del nome. L'indicatore di focus da tastiera è disegnato sulla card intera
 * (`has-[a:focus-visible]`, colore `ring`); il link rinuncia al proprio solo
 * dove `:has()` è supportato, così senza `:has()` resta quello globale.
 *
 * Transizioni solo su spostamento, ombra e bordo (non `transition-all`: il
 * contorno di focus deve comparire subito, non in dissolvenza), alla durata
 * `normal` dei token (200ms). `prefers-reduced-motion` è gestito in
 * globals.css.
 */
export function CatalogCard({
  href,
  title,
  description,
  count,
  icon: Icon,
  color,
  ctaLabel = 'Vedi i corsi',
  headingLevel = 3,
}: Props) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3'

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7',
        'transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-transparent hover:shadow-xl',
        'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring'
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100',
          barClass[color]
        )}
        aria-hidden="true"
      />

      <IconCircle color={color} icon={<Icon />} className="mb-5" />

      <Heading className="mb-2.5 font-heading text-lg font-bold text-neutral-950">
        <Link
          href={href}
          className="after:absolute after:inset-0 supports-[selector(:has(*))]:outline-none"
        >
          {title}
        </Link>
      </Heading>

      <p className="flex-1 text-sm leading-relaxed text-neutral-600">
        {description}
      </p>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-neutral-100 pt-5">
        <span className="text-xs font-medium text-neutral-600">
          {formatCourseCount(count)}
        </span>
        <span
          className={cn(
            'flex items-center gap-1.5 text-sm font-semibold transition-[gap] duration-200 group-hover:gap-2.5',
            accentTextClass[color]
          )}
          aria-hidden="true"
        >
          {ctaLabel}
          <ArrowRight className="size-4" />
        </span>
      </div>
    </div>
  )
}
