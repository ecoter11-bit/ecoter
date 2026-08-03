'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  Badge,
} from '@ecoter/ui'
import { pluralize } from '@/lib/utils'
import type { CourseModule } from '@/types'

type Props = {
  modules: CourseModule[]
}

export function CourseCurriculum({ modules }: Props) {
  return (
    <Accordion defaultValue={[modules[0]?.title]}>
      {modules.map((module) => (
        <AccordionItem key={module.title} value={module.title}>
          <AccordionTrigger>
            <span className="flex flex-wrap items-center justify-between gap-3">
              {module.title}
              {module.durationHours != null && (
                <Badge size="sm" color="neutral">
                  {module.durationHours}{' '}
                  {pluralize(module.durationHours, 'ora', 'ore')}
                </Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionPanel>
            {module.topics.length > 0 && (
              <ul className="space-y-2">
                {module.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2.5">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-600"
                      aria-hidden="true"
                    />
                    {topic}
                  </li>
                ))}
              </ul>
            )}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
