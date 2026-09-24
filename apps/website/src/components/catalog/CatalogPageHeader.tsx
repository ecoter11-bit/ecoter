import { Breadcrumb, Container, type BreadcrumbItem } from '@/components/layout'

type Props = {
  overline: string
  title: string
  description?: string
  /** Riga di sintesi sotto la descrizione, es. "51 corsi in 5 sotto-aree". */
  meta?: string
  /** Percorso dopo "Home" — l'ultimo elemento è la pagina corrente. */
  breadcrumb?: BreadcrumbItem[]
}

/**
 * Intestazione comune alle pagine del catalogo (`/corsi`, aree, sotto-aree).
 * Stesse misure delle altre intestazioni di pagina (FAQ, Contatti, scheda
 * corso): titolo 4xl/5xl, testo introduttivo `text-lg` — scendendo da
 * catalogo ad area, sotto-area e corso il titolo non cambia di taglia.
 */
export function CatalogPageHeader({
  overline,
  title,
  description,
  meta,
  breadcrumb,
}: Props) {
  return (
    <div className="border-b border-neutral-200 bg-white">
      <Container
        className={breadcrumb ? 'pt-6 pb-12 lg:pb-16' : 'py-12 lg:py-16'}
      >
        {breadcrumb && <Breadcrumb items={breadcrumb} className="mb-8" />}
        <p className="mb-3 text-brand-700 overline">{overline}</p>
        <h1 className="max-w-3xl font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-pretty text-neutral-600">
            {description}
          </p>
        )}
        {meta && (
          <p className="mt-4 text-sm font-semibold text-neutral-700">{meta}</p>
        )}
      </Container>
    </div>
  )
}
