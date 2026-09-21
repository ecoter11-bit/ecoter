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
  /* Un modulo senza contenuti non ha niente da rivelare: come voce di
     accordion darebbe un comando che si apre sul vuoto. Resta in elenco —
     titolo e durata sono informazione utile — ma come riga statica. */
  const espandibili = modules.filter((m) => m.topics.length > 0)
  const statici = modules.filter((m) => m.topics.length === 0)

  return (
    <>
      {/* Con soli moduli senza contenuti (es. i percorsi di benessere
          psico-sociale, che elencano le alternative Base/Avanzato/Estensivo)
          l'accordion non ha voci: senza questa guardia resterebbe in pagina un
          contenitore vuoto, invisibile solo perché collassa a zero. */}
      {espandibili.length > 0 && (
        <Accordion defaultValue={[espandibili[0]?.title]}>
          {espandibili.map((module) => (
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
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {statici.length > 0 && (
        <ul className="divide-y divide-neutral-200 border-b border-neutral-200">
          {statici.map((module) => (
            <li
              key={module.title}
              className="flex flex-wrap items-center justify-between gap-3 py-4 text-sm font-semibold text-neutral-950"
            >
              {module.title}
              {module.durationHours != null && (
                <Badge size="sm" color="neutral">
                  {module.durationHours}{' '}
                  {pluralize(module.durationHours, 'ora', 'ore')}
                </Badge>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
