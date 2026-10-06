import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategory } from '@/lib/content/categories'
import { getAllCourses } from '@/lib/content/courses'
import {
  getAllSubcategories,
  getSubcategory,
} from '@/lib/content/subcategories'
import {
  CATALOG_PATH,
  areaHref,
  compareCatalogCourses,
  formatCourseCount,
  subareaHref,
} from '@/lib/catalog'
import { absoluteUrl } from '@/lib/utils'
import { CatalogPageHeader } from '@/components/catalog/CatalogPageHeader'
import { CatalogCourseGrid } from '@/components/catalog/CatalogCourseGrid'
import { PercorsoLivelli } from '@/components/catalog/PercorsoLivelli'
import { Container } from '@/components/layout'
import { CourseMdxContent } from '@/components/course/CourseMdxContent'
import { CourseCurriculum } from '@/components/course/CourseCurriculum'
import { PERCORSI, getPercorso, type Percorso } from '@/config/percorsi'

type Props = {
  params: Promise<{ area: string; sottoarea: string }>
}

/** Solo le coppie area/sotto-area (o area/percorso) esistenti: il resto è un 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return [
    ...getAllSubcategories().map((subarea) => ({
      area: subarea.parent,
      sottoarea: subarea.slug,
    })),
    ...PERCORSI.map((percorso) => ({
      area: percorso.area,
      sottoarea: percorso.slug,
    })),
  ]
}

/** Livelli di un percorso (corsi con il suo tag), dal più breve al più lungo. */
function livelli(percorso: Percorso) {
  return getAllCourses({ category: percorso.area })
    .filter((c) => c.tags.includes(percorso.tag))
    .sort(compareCatalogCourses)
}

/** Sotto-area e area padre, solo se la coppia dell'URL è coerente. */
function resolve(area: string, sottoarea: string) {
  const subarea = getSubcategory(sottoarea)
  if (!subarea || subarea.parent !== area) return undefined
  const category = getCategory(area)
  if (!category) return undefined
  return { subarea, category }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area, sottoarea } = await params
  const percorso = getPercorso(area, sottoarea)
  const categoria = getCategory(area)
  if (percorso && categoria) {
    const title = `${percorso.title} – ${categoria.name}`
    const description = livelli(percorso)[0]?.excerpt ?? categoria.description
    const url = absoluteUrl(subareaHref(area, percorso.slug))
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: { title, description, url },
    }
  }
  const resolved = resolve(area, sottoarea)
  if (!resolved) return {}

  const { subarea, category } = resolved
  const title = `${subarea.name} – Corsi ${category.name}`
  const description = subarea.description
  const url = absoluteUrl(subareaHref(category.slug, subarea.slug))

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  }
}

/**
 * Catalogo, terzo livello: l'elenco dei corsi di una sotto-area (Sicurezza)
 * oppure un percorso di Benessere psico-sociale (MODIFICHE del 06/10/2026):
 * la descrizione del percorso, quella già scritta nelle schede dei corsi, e
 * i suoi livelli (Base, Avanzato, Estensivo).
 */
export default async function SubareaPage({ params }: Props) {
  const { area, sottoarea } = await params
  const percorso = getPercorso(area, sottoarea)
  const categoria = getCategory(area)
  if (percorso && categoria)
    return <PercorsoPage percorso={percorso} categoryName={categoria.name} />

  const resolved = resolve(area, sottoarea)
  if (!resolved) notFound()

  const { subarea, category } = resolved
  const courses = getAllCourses({
    category: category.slug,
    subcategory: subarea.slug,
  }).sort(compareCatalogCourses)

  return (
    <>
      <CatalogPageHeader
        overline={category.name}
        title={subarea.name}
        description={subarea.description}
        meta={formatCourseCount(courses.length)}
        breadcrumb={[
          { label: 'Corsi', href: CATALOG_PATH },
          { label: category.name, href: areaHref(category.slug) },
          {
            label: subarea.name,
            href: subareaHref(category.slug, subarea.slug),
          },
        ]}
      />
      <CatalogCourseGrid
        courses={courses}
        heading={`Corsi della sotto-area ${subarea.name}`}
      />
    </>
  )
}

function PercorsoPage({
  percorso,
  categoryName,
}: {
  percorso: Percorso
  categoryName: string
}) {
  const courses = livelli(percorso)
  /* La descrizione è la stessa in tutti i livelli: si usa quella del primo. */
  const primo = courses[0]
  if (!primo) notFound()

  return (
    <>
      <CatalogPageHeader
        overline={categoryName}
        title={percorso.title}
        description={primo.excerpt}
        breadcrumb={[
          { label: 'Corsi', href: CATALOG_PATH },
          { label: categoryName, href: areaHref(percorso.area) },
          {
            label: percorso.title,
            href: subareaHref(percorso.area, percorso.slug),
          },
        ]}
      />
      <div className="bg-neutral-25">
        <Container className="py-10 lg:py-14">
          <section aria-labelledby="panoramica-heading" className="max-w-3xl">
            <h2
              id="panoramica-heading"
              className="mb-4 font-heading text-2xl font-bold text-neutral-950"
            >
              Panoramica
            </h2>
            <CourseMdxContent source={primo.body} />
            {primo.curriculum.length > 0 && (
              <div className="mt-8">
                <CourseCurriculum modules={primo.curriculum} />
              </div>
            )}
          </section>

          <section aria-labelledby="livelli-heading" className="mt-12">
            <h2
              id="livelli-heading"
              className="mb-5 font-heading text-2xl font-bold text-neutral-950"
            >
              {courses.length > 1
                ? 'Livelli del percorso'
                : 'Durata e modalità'}
            </h2>
            <PercorsoLivelli courses={courses} />
          </section>
        </Container>
      </div>
    </>
  )
}
