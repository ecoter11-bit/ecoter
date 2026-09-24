import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import {
  getAllCategories,
  getAllCourses,
  getAllSubcategories,
} from '@/lib/content'
import { areaHref, subareaHref } from '@/lib/catalog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/corsi`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soluzioni/aziende`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/chi-siamo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contatti`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  /* Pagine del catalogo per area e sotto-area: statiche, con l'elenco dei
     corsi già nell'HTML — sono loro a collegare le schede fra loro. */
  const areaRoutes: MetadataRoute.Sitemap = getAllCategories().map(
    (category) => ({
      url: `${baseUrl}${areaHref(category.slug)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  )

  const subareaRoutes: MetadataRoute.Sitemap = getAllSubcategories().map(
    (subarea) => ({
      url: `${baseUrl}${subareaHref(subarea.parent, subarea.slug)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  )

  const courseRoutes: MetadataRoute.Sitemap = getAllCourses().map((course) => ({
    url: `${baseUrl}/corsi/${course.slug}`,
    lastModified: new Date(course.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...areaRoutes, ...subareaRoutes, ...courseRoutes]
}
