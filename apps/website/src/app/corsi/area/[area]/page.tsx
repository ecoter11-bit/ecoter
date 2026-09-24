import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllCategories,
  getCategory,
  getCategoryWithCount,
} from '@/lib/content/categories'
import { getAllCourses } from '@/lib/content/courses'
import { getAllSubcategoriesWithCount } from '@/lib/content/subcategories'
import {
  CATALOG_PATH,
  areaHref,
  compareCatalogCourses,
  formatCourseCount,
  subareaHref,
} from '@/lib/catalog'
import { categoryIconColor, defaultCategoryIconColor } from '@/lib/category-ui'
import { defaultSubcategoryIcon, subcategoryIcon } from '@/lib/subcategory-ui'
import { absoluteUrl } from '@/lib/utils'
import { Container } from '@/components/layout'
import { CatalogPageHeader } from '@/components/catalog/CatalogPageHeader'
import { CatalogCard } from '@/components/catalog/CatalogCard'
import { CatalogCourseGrid } from '@/components/catalog/CatalogCourseGrid'

type Props = {
  params: Promise<{ area: string }>
}

/** Solo le aree esistenti: qualsiasi altro indirizzo è un 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ area: category.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params
  const category = getCategory(area)
  if (!category) return {}

  // Il blocco `seo` dei JSON di categoria era già scritto per una pagina di
  // area: ora quella pagina esiste e lo usa. Il nome dell'area deve però
  // comparire nel titolo — è quello che il visitatore ha appena cliccato e
  // che il lettore di schermo annuncia all'arrivo (WCAG 2.4.2): se il titolo
  // SEO non lo contiene, lo si mette davanti.
  const seoTitle = category.seo.title ?? `Corsi ${category.name}`
  const title = seoTitle.includes(category.name)
    ? seoTitle
    : `${category.name} – ${seoTitle}`
  const description = category.seo.description ?? category.description
  const url = absoluteUrl(areaHref(category.slug))

  return {
    title,
    description,
    keywords:
      category.seo.keywords && category.seo.keywords.length > 0
        ? category.seo.keywords
        : undefined,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  }
}

/**
 * Catalogo, secondo livello. Un'area divisa in sotto-aree (oggi solo
 * Sicurezza sul Lavoro) mostra le sotto-aree da scegliere; le altre mostrano
 * direttamente l'elenco dei loro corsi.
 */
export default async function AreaPage({ params }: Props) {
  const { area } = await params
  const category = getCategoryWithCount(area)
  if (!category) notFound()

  const subareas = getAllSubcategoriesWithCount(category.slug)
  const breadcrumb = [
    { label: 'Corsi', href: CATALOG_PATH },
    { label: category.name, href: areaHref(category.slug) },
  ]
  const color = categoryIconColor[category.slug] ?? defaultCategoryIconColor

  if (subareas.length > 0) {
    return (
      <>
        <CatalogPageHeader
          overline="Area formativa"
          title={category.name}
          description={category.description}
          meta={`${formatCourseCount(category.courseCount)} in ${subareas.length} sotto-aree`}
          breadcrumb={breadcrumb}
        />

        <section aria-labelledby="sotto-aree-heading" className="bg-neutral-25">
          <Container className="py-10 lg:py-14">
            <h2 id="sotto-aree-heading" className="sr-only">
              Sotto-aree di {category.name}
            </h2>
            {/* Due per riga dal tablet, tre sopra i 1024px: impilate a tutta
                larghezza le cinque card diventavano strisce lunghe e basse.
                Con cinque voci una riga resta comunque incompleta (2+2+1,
                poi 3+2). */}
            <ul
              role="list"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {subareas.map((subarea) => (
                <li key={subarea.slug}>
                  <CatalogCard
                    href={subareaHref(category.slug, subarea.slug)}
                    title={subarea.name}
                    description={subarea.description}
                    count={subarea.courseCount}
                    icon={
                      subcategoryIcon[subarea.icon] ?? defaultSubcategoryIcon
                    }
                    color={color}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </>
    )
  }

  const courses = getAllCourses({ category: category.slug }).sort(
    compareCatalogCourses
  )

  return (
    <>
      <CatalogPageHeader
        overline="Area formativa"
        title={category.name}
        description={category.description}
        meta={formatCourseCount(courses.length)}
        breadcrumb={breadcrumb}
      />
      <CatalogCourseGrid
        courses={courses}
        heading={`Corsi dell'area ${category.name}`}
      />
    </>
  )
}
