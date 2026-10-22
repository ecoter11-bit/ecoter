import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import {
  getAllCategories,
  getAllCourses,
  getAllSubcategories,
} from '@/lib/content'
import { areaHref, subareaHref } from '@/lib/catalog'
import { PERCORSI } from '@/config/percorsi'

/**
 * Niente `lastModified` per le pagine statiche e del catalogo: con
 * `new Date()` ogni build le dichiarava tutte modificate. Le schede corso
 * lo hanno solo se il frontmatter porta una data (`updatedAt`/`publishedAt`).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/corsi`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calendario-corsi`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/soluzioni/aziende`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/chi-siamo`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contatti`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  /* Pagine del catalogo per area e sotto-area: statiche, con l'elenco dei
     corsi già nell'HTML — sono loro a collegare le schede fra loro. */
  const areaRoutes: MetadataRoute.Sitemap = getAllCategories().map(
    (category) => ({
      url: `${baseUrl}${areaHref(category.slug)}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  )

  const subareaRoutes: MetadataRoute.Sitemap = getAllSubcategories().map(
    (subarea) => ({
      url: `${baseUrl}${subareaHref(subarea.parent, subarea.slug)}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  )

  const percorsoRoutes: MetadataRoute.Sitemap = PERCORSI.map((percorso) => ({
    url: `${baseUrl}${subareaHref(percorso.area, percorso.slug)}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const courseRoutes: MetadataRoute.Sitemap = getAllCourses().map((course) => ({
    url: `${baseUrl}/corsi/${course.slug}`,
    lastModified: course.lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...areaRoutes,
    ...subareaRoutes,
    ...percorsoRoutes,
    ...courseRoutes,
  ]
}
