import { Suspense } from 'react'
import type { Metadata } from 'next'
import type { Course } from '@/types'
import { getAllCourses } from '@/lib/content/courses'
import { getAllCategoriesWithCount } from '@/lib/content/categories'
import { DiscoveryCards } from '@/components/catalog/DiscoveryCards'
import { CourseGridSkeleton } from '@/components/course/CourseCardSkeleton'
import { CatalogClient } from './CatalogClient'

export const metadata: Metadata = {
  title: 'Catalogo Corsi – ECOTER Academy',
  description:
    'Esplora il catalogo completo dei corsi di formazione professionale ECOTER Academy: sicurezza sul lavoro, qualità ISO, antincendio, ambiente e sistemi di gestione.',
}

function extractNormativeRefs(courses: Course[]): string[] {
  return [...new Set(courses.flatMap((c) => c.normativeRef ?? []))].sort()
}

function CatalogFallback() {
  return (
    <div className="bg-neutral-25">
      <div className="container-default py-10">
        <div className="mb-6 h-4 w-32 animate-pulse rounded bg-neutral-200" />
        <CourseGridSkeleton count={6} />
      </div>
    </div>
  )
}

export default function CatalogPage() {
  const courseData = getAllCourses({ status: 'published' })
  const categories = getAllCategoriesWithCount()

  /* Strip MDX body — only Course fields needed on client */
  const courses: Course[] = courseData.map(
    ({ body: _body, ...rest }) => rest as Course
  )

  const normativeRefs = extractNormativeRefs(courses)

  return (
    <>
      {/* ─── Page hero ──────────────────────────────────────────────────── */}
      <div className="border-b border-neutral-200 bg-brand-900">
        <div className="container-default py-10 lg:py-12">
          <p className="mb-3 text-eco-300 overline">Formazione professionale</p>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-balance text-white lg:text-4xl">
            Catalogo corsi
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-brand-200">
            Trova il percorso formativo giusto per la tua azienda o il tuo ruolo
            professionale — attestati validi ai fini di legge, sempre aggiornati
            alle normative vigenti.
          </p>
        </div>
      </div>

      {/* ─── Discovery cards ────────────────────────────────────────────── */}
      <DiscoveryCards categories={categories} normativeRefs={normativeRefs} />

      {/* ─── Catalog (toolbar + grid) ───────────────────────────────────── */}
      <Suspense fallback={<CatalogFallback />}>
        <CatalogClient
          courses={courses}
          categories={categories}
          normativeRefs={normativeRefs}
        />
      </Suspense>
    </>
  )
}
