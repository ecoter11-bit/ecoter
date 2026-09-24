import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllCategoriesWithCount } from '@/lib/content/categories'
import { getAllSubcategories } from '@/lib/content/subcategories'
import { areaHref } from '@/lib/catalog'
import {
  categoryIcon,
  categoryIconColor,
  defaultCategoryIcon,
  defaultCategoryIconColor,
} from '@/lib/category-ui'
import { Container } from '@/components/layout'
import { CatalogPageHeader } from '@/components/catalog/CatalogPageHeader'
import { CatalogCard } from '@/components/catalog/CatalogCard'
import { LegacyCatalogRedirect } from '@/components/catalog/LegacyCatalogRedirect'
import { absoluteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Catalogo Corsi',
  description:
    'Esplora il catalogo completo dei corsi di formazione professionale ECOTER Academy: sicurezza sul lavoro, ambiente e benessere psico-sociale.',
  alternates: {
    canonical: absoluteUrl('/corsi'),
  },
}

/** Catalogo, primo livello: la scelta dell'area. */
export default function CatalogPage() {
  const categories = getAllCategoriesWithCount()
  const subareas = getAllSubcategories().map(({ slug, parent }) => ({
    slug,
    parent,
  }))

  return (
    <>
      <CatalogPageHeader
        overline="Formazione professionale"
        title="Catalogo corsi"
        description="Trova il percorso formativo giusto per la tua azienda o il tuo ruolo professionale — attestati validi ai fini di legge, sempre aggiornati alle normative vigenti."
      />

      <section aria-labelledby="aree-heading" className="bg-neutral-25">
        <Container className="py-10 lg:py-14">
          <h2 id="aree-heading" className="sr-only">
            Aree formative
          </h2>
          {/* Una colonna sotto i 1024px, tre sopra: stessa griglia delle aree
              in home (a due colonne la terza card resterebbe sola). */}
          <ul role="list" className="grid gap-5 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <CatalogCard
                  href={areaHref(category.slug)}
                  title={category.name}
                  description={category.description}
                  count={category.courseCount}
                  icon={categoryIcon[category.icon] ?? defaultCategoryIcon}
                  color={
                    categoryIconColor[category.slug] ?? defaultCategoryIconColor
                  }
                  ctaLabel="Esplora"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Solo per i vecchi link `/corsi?cat=…&sub=…` — non disegna nulla. */}
      <Suspense fallback={null}>
        <LegacyCatalogRedirect
          areas={categories.map((c) => c.slug)}
          subareas={subareas}
        />
      </Suspense>
    </>
  )
}
