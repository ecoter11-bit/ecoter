import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  CheckCircle2,
  Users,
  ListChecks,
  Award,
  ScrollText,
} from 'lucide-react'
import {
  getCourse,
  getAllCourseSlugs,
  getCoursesByCategory,
  getCategory,
  getSubcategory,
} from '@/lib/content'
import { absoluteUrl } from '@/lib/utils'
import { buildCourseJsonLd } from '@/lib/seo/course-schema'
import { categoryBadgeLabel } from '@/lib/badge-mappings'
import { Breadcrumb, Container } from '@/components/layout'
import { CourseHeader } from '@/components/course/CourseHeader'
import { CourseMdxContent } from '@/components/course/CourseMdxContent'
import { CourseCurriculum } from '@/components/course/CourseCurriculum'
import { CourseSidebarCta } from '@/components/course/CourseSidebarCta'
import { RelatedCourses } from '@/components/course/RelatedCourses'
import type { Course } from '@/types'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllCourseSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const courseData = getCourse(slug)
  if (!courseData) return {}

  const { body: _body, ...course } = courseData
  const title = course.seo.title ?? course.title
  const description = course.seo.description ?? course.excerpt
  const url = absoluteUrl(`/corsi/${course.slug}`)

  return {
    title,
    description,
    keywords:
      course.seo.keywords && course.seo.keywords.length > 0
        ? course.seo.keywords
        : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const courseData = getCourse(slug)
  if (!courseData) notFound()

  const { body, ...course } = courseData
  const category = getCategory(course.category)
  const categoryDisplayName =
    category?.name ?? categoryBadgeLabel[course.category] ?? course.category

  /* Le sotto-aree esistono solo per Sicurezza: sugli altri corsi il breadcrumb
     resta a quattro livelli, senza gradino intermedio. */
  const subcategory = course.subcategory
    ? getSubcategory(course.subcategory)
    : undefined

  const related = getCoursesByCategory(course.category)
    .filter((c) => c.slug !== course.slug)
    .slice(0, 3)
    .map(({ body: _b, ...rest }) => rest as Course)

  const jsonLd = buildCourseJsonLd(course)
  const hasAudienceOrPrereqs =
    course.targetAudience.length > 0 || course.prerequisites.length > 0
  const hasCertificationSection =
    Boolean(course.certification) ||
    (course.normativeRef && course.normativeRef.length > 0)

  return (
    <>
      {/* Trusted, build-time-generated JSON (Course frontmatter), not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white">
        <Container className="pt-6">
          <Breadcrumb
            items={[
              { label: 'Corsi', href: '/corsi' },
              {
                label: categoryDisplayName,
                href: `/corsi?step=3&cat=${course.category}`,
              },
              ...(subcategory
                ? [
                    {
                      label: subcategory.name,
                      href: `/corsi?step=3&cat=${course.category}&sub=${subcategory.slug}`,
                    },
                  ]
                : []),
              { label: course.title, href: `/corsi/${course.slug}` },
            ]}
          />
        </Container>
      </div>

      <CourseHeader course={course} />

      <div className="bg-neutral-25">
        <Container className="section-padding">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-12">
            {/* CTA — first in DOM on mobile (non-sticky, prominent near the top), sticky aside on desktop */}
            <aside className="order-first lg:sticky lg:top-20 lg:order-last">
              <CourseSidebarCta course={course} />
            </aside>

            <div className="min-w-0">
              {/* Panoramica */}
              <section aria-labelledby="panoramica-heading">
                <h2
                  id="panoramica-heading"
                  className="mb-4 font-heading text-2xl font-bold text-neutral-950"
                >
                  Panoramica
                </h2>
                <CourseMdxContent source={body} />
              </section>

              {/* Cosa imparerai */}
              {course.objectives.length > 0 && (
                <section aria-labelledby="obiettivi-heading" className="mt-12">
                  <h2
                    id="obiettivi-heading"
                    className="mb-5 font-heading text-2xl font-bold text-neutral-950"
                  >
                    Cosa imparerai
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {course.objectives.map((objective) => (
                      <li
                        key={objective}
                        className="flex items-start gap-3 rounded-xl bg-brand-50/60 p-3.5 text-sm text-neutral-700"
                      >
                        <span
                          className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white"
                          aria-hidden="true"
                        >
                          <CheckCircle2 className="size-3.5" />
                        </span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Programma del corso */}
              {course.curriculum.length > 0 && (
                <section aria-labelledby="programma-heading" className="mt-12">
                  <h2
                    id="programma-heading"
                    className="mb-5 font-heading text-2xl font-bold text-neutral-950"
                  >
                    Programma del corso
                  </h2>
                  <CourseCurriculum modules={course.curriculum} />
                </section>
              )}

              {/* A chi è rivolto + Prerequisiti */}
              {hasAudienceOrPrereqs && (
                <div className="mt-12 grid gap-10 sm:grid-cols-2">
                  {course.targetAudience.length > 0 && (
                    <section aria-labelledby="destinatari-heading">
                      <h2
                        id="destinatari-heading"
                        className="mb-4 flex items-center gap-2.5 font-heading text-xl font-bold text-neutral-950"
                      >
                        <Users
                          className="size-5 text-brand-600"
                          aria-hidden="true"
                        />
                        A chi è rivolto
                      </h2>
                      <ul className="space-y-2.5 text-sm text-neutral-600">
                        {course.targetAudience.map((audience) => (
                          <li
                            key={audience}
                            className="flex items-start gap-2.5"
                          >
                            <span
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-600"
                              aria-hidden="true"
                            />
                            {audience}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {course.prerequisites.length > 0 && (
                    <section aria-labelledby="prerequisiti-heading">
                      <h2
                        id="prerequisiti-heading"
                        className="mb-4 flex items-center gap-2.5 font-heading text-xl font-bold text-neutral-950"
                      >
                        <ListChecks
                          className="size-5 text-brand-600"
                          aria-hidden="true"
                        />
                        Prerequisiti
                      </h2>
                      <ul className="space-y-2.5 text-sm text-neutral-600">
                        {course.prerequisites.map((prereq) => (
                          <li key={prereq} className="flex items-start gap-2.5">
                            <span
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-600"
                              aria-hidden="true"
                            />
                            {prereq}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              )}

              {/* Attestato / Certificazione */}
              {hasCertificationSection && (
                <section
                  aria-labelledby="attestato-heading"
                  className="mt-12 rounded-2xl border border-brand-100 bg-brand-50/60 p-6"
                >
                  <h2
                    id="attestato-heading"
                    className="mb-3 flex items-center gap-2.5 font-heading text-xl font-bold text-neutral-950"
                  >
                    <Award
                      className="size-5 text-brand-600"
                      aria-hidden="true"
                    />
                    Attestato e normative
                  </h2>
                  {course.certification && (
                    <p className="text-sm leading-relaxed text-neutral-700">
                      {course.certification}
                    </p>
                  )}
                  {course.normativeRef && course.normativeRef.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {course.normativeRef.map((ref) => (
                        <li
                          key={ref}
                          className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 shadow-sm"
                        >
                          <ScrollText
                            className="size-3.5 shrink-0 text-brand-600"
                            aria-hidden="true"
                          />
                          {ref}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )}
            </div>
          </div>
        </Container>
      </div>

      <RelatedCourses courses={related} categoryLabel={categoryDisplayName} />
    </>
  )
}
