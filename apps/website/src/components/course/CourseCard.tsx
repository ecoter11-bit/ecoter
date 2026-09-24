import Link from 'next/link'
import { Clock, Building2, ArrowRight } from 'lucide-react'
import { Badge } from '@ecoter/ui'
import { cn, formatCourseDuration } from '@/lib/utils'
import {
  categoryBadgeColor,
  categoryBadgeLabel,
  defaultCategoryBadgeColor,
  featuredBadgeColor,
  featuredBadgeLabel,
  levelBadgeColor,
  levelBadgeLabel,
  modalityIcon,
  modalityLabel,
} from '@/lib/badge-mappings'
import {
  accentGroupHoverTextClass,
  accentTextClass,
  categoryIconColor,
} from '@/lib/category-ui'
import type { Course } from '@/types'

// Mirrors categoryBadgeColor's mapping onto the Decision 018 macro-category
// palette (see badge-mappings.ts) — same category, same hue, bar and badge
// agree. Uses each color's `categoryColors[...].solid` stop directly.
const categoryBar: Record<string, string> = {
  sicurezza: 'bg-blue-500',
  ambiente: 'bg-brand-600',
  'benessere-psico-sociale': 'bg-amber-700',
}
const defaultCategoryBar = 'bg-neutral-400'

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
  /**
   * Mostra il badge dell'area (Sicurezza, Ambiente, …). Default `true`. Va
   * messo a `false` negli elenchi che contengono una sola area — le pagine
   * di area e sotto-area del catalogo: lì il badge ripete su ogni card
   * un'informazione che titolo della pagina, breadcrumb e filetto colorato
   * in cima alla card danno già, e "Benessere psico-sociale", lungo, manda a
   * capo la riga dei badge disallineando i titoli.
   */
  showCategoryBadge?: boolean
  className?: string
}

/**
 * Card di un corso: elenchi del catalogo e "corsi correlati" della scheda.
 *
 * Tutta la card porta alla scheda del corso, come le card delle aree
 * (`CatalogCard`): il link è sul titolo e si allarga alla card intera con
 * uno pseudo-elemento (`after:absolute after:inset-0`), così il nome
 * accessibile del link resta il solo titolo. Al posto del vecchio bottone
 * "Scopri" (richiesta di Davide del 24/09/2026: con il bottone non si capiva
 * che la card intera era cliccabile) c'è "Vedi il corso", decorativo come
 * "Vedi i corsi" delle aree e nel colore dell'area; nello stesso colore il
 * titolo quando si passa sopra la card. Il focus da tastiera è disegnato
 * sulla card intera (`has-[a:focus-visible]`); il link rinuncia al proprio
 * contorno solo dove `:has()` è supportato. Transizioni solo su
 * spostamento, ombra e bordo, perché il contorno di focus compaia subito.
 */
export function CourseCard({
  course,
  headingLevel = 3,
  showCategoryBadge = true,
  className,
}: Props) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4'
  const categoryBarClass = categoryBar[course.category] ?? defaultCategoryBar
  const categoryColor =
    categoryBadgeColor[course.category] ?? defaultCategoryBadgeColor
  const levelColor = levelBadgeColor[course.level] ?? 'neutral'
  const accent = categoryIconColor[course.category] ?? 'neutral'

  const durationLabel = formatCourseDuration(course.duration)

  const primaryNorm = course.normativeRef?.[0]

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white',
        'transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-transparent hover:shadow-xl',
        'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring',
        className
      )}
    >
      {/* Category top bar */}
      <div
        className={cn('h-1 w-full shrink-0', categoryBarClass)}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-6">
        {/* Badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {showCategoryBadge && (
            <Badge size="sm" color={categoryColor}>
              {categoryBadgeLabel[course.category] ?? course.category}
            </Badge>
          )}
          <Badge size="sm" color={levelColor}>
            {levelBadgeLabel[course.level]}
          </Badge>
          {course.featured && (
            <Badge size="sm" color={featuredBadgeColor}>
              {featuredBadgeLabel}
            </Badge>
          )}
        </div>

        {/* Title + subtitle (facoltativo: senza, il titolo si prende lui il
            margine inferiore, così non resta una riga vuota nella card) */}
        <Heading
          className={cn(
            'line-clamp-2 font-heading text-lg leading-snug font-bold text-neutral-950 transition-colors duration-200',
            accentGroupHoverTextClass[accent],
            course.subtitle ? 'mb-1.5' : 'mb-4'
          )}
        >
          <Link
            href={`/corsi/${course.slug}`}
            className="after:absolute after:inset-0 supports-[selector(:has(*))]:outline-none"
          >
            {course.title}
          </Link>
        </Heading>
        {course.subtitle && (
          <p className="mb-4 line-clamp-1 text-sm leading-relaxed text-muted-foreground">
            {course.subtitle}
          </p>
        )}

        {/* Meta row */}
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 shrink-0" aria-hidden="true" />
            {durationLabel}
          </span>
          {course.modality.slice(0, 2).map((m) => {
            const Icon = modalityIcon[m] ?? Building2
            return (
              <span key={m} className="flex items-center gap-1.5">
                <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                {modalityLabel[m] ?? m}
              </span>
            )
          })}
        </div>

        {/* Normativa pill */}
        {primaryNorm && (
          <div className="mb-4 line-clamp-1 rounded-lg bg-neutral-50 px-3 py-2 text-xs font-medium text-muted-foreground">
            {primaryNorm}
          </div>
        )}

        {/* Excerpt */}
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
          {course.excerpt}
        </p>

        {/* Footer: indicazione visiva, il link è il titolo */}
        <div className="mt-5 flex items-center justify-end border-t border-neutral-100 pt-5">
          <span
            className={cn(
              'flex items-center gap-1.5 text-sm font-semibold transition-[gap] duration-200 group-hover:gap-2.5',
              accentTextClass[accent]
            )}
            aria-hidden="true"
          >
            Vedi il corso
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  )
}
