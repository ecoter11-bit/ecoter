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

type Props = {
  params: Promise<{ area: string; sottoarea: string }>
}

/** Solo le coppie area/sotto-area esistenti: il resto è un 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return getAllSubcategories().map((subarea) => ({
    area: subarea.parent,
    sottoarea: subarea.slug,
  }))
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

/** Catalogo, terzo livello (solo Sicurezza): l'elenco dei corsi di una sotto-area. */
export default async function SubareaPage({ params }: Props) {
  const { area, sottoarea } = await params
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
