import { Badge, IconCircle } from '@ecoter/ui'
import { CourseCard } from '@/components/course/CourseCard'
import {
  defaultSubcategoryIcon,
  subcategoryIcon,
  subcategoryIconColor,
} from '@/lib/subcategory-ui'
import type { Course, SubcategoryWithCount } from '@/types'

type Props = {
  courses: Course[]
  subcategories: SubcategoryWithCount[]
}

type Group = {
  slug: string
  name: string
  description?: string
  icon: string | null
  courses: Course[]
}

/**
 * Raggruppa i risultati per sotto-area, nell'ordine dichiarato in
 * `content/subcategories/`. Il bucket finale "Altri corsi" è una rete di
 * sicurezza: `pnpm validate` impedisce che un corso di sicurezza resti senza
 * sotto-area, ma se accadesse comunque i corsi verrebbero mostrati invece di
 * sparire in silenzio.
 */
function buildGroups(
  courses: Course[],
  subcategories: SubcategoryWithCount[]
): Group[] {
  const groups: Group[] = subcategories
    .map((sub) => ({
      slug: sub.slug,
      name: sub.name,
      description: sub.description,
      icon: sub.icon,
      courses: courses.filter((c) => c.subcategory === sub.slug),
    }))
    .filter((g) => g.courses.length > 0)

  const known = new Set(subcategories.map((s) => s.slug))
  const orphans = courses.filter(
    (c) => !c.subcategory || !known.has(c.subcategory)
  )
  if (orphans.length > 0) {
    groups.push({
      slug: 'altri',
      name: 'Altri corsi',
      icon: null,
      courses: orphans,
    })
  }

  return groups
}

export function SubcategoryResults({ courses, subcategories }: Props) {
  const groups = buildGroups(courses, subcategories)

  return (
    <div className="space-y-12">
      {groups.map((group) => {
        const Icon = group.icon
          ? (subcategoryIcon[group.icon] ?? defaultSubcategoryIcon)
          : defaultSubcategoryIcon
        const headingId = `sotto-area-${group.slug}`

        return (
          <section
            key={group.slug}
            id={group.slug}
            aria-labelledby={headingId}
            /* scroll-mt-32 — la toolbar è sticky sotto l'header: senza questo
               un deep-link all'ancora della sotto-area finirebbe coperto. */
            className="scroll-mt-32"
          >
            <div className="mb-5 flex items-start gap-3 border-b border-neutral-200 pb-3">
              <IconCircle
                size="sm"
                color={subcategoryIconColor}
                icon={<Icon />}
                className="mt-0.5 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3
                  id={headingId}
                  className="font-heading text-lg font-bold text-neutral-950"
                >
                  {group.name}
                </h3>
                {group.description && (
                  <p className="mt-1 text-sm text-pretty text-neutral-600">
                    {group.description}
                  </p>
                )}
              </div>
              <Badge className="shrink-0">
                <span aria-hidden="true">{group.courses.length}</span>
                <span className="sr-only">
                  {group.courses.length === 1
                    ? '1 corso'
                    : `${group.courses.length} corsi`}
                </span>
              </Badge>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.courses.map((course) => (
                <CourseCard
                  key={course.slug}
                  course={course}
                  /* La sezione porta già una h3 col nome della sotto-area:
                     le card scendono di un livello per non appiattire la
                     navigazione per intestazioni. */
                  headingLevel={4}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
