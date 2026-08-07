import Link from 'next/link'
import { BookOpen, Users, FileText, ArrowRight } from 'lucide-react'
import { IconCircle } from '@ecoter/ui'

const MODES = [
  {
    mode: 'argomento',
    icon: BookOpen,
    title: 'Per argomento',
    description:
      'Sfoglia il catalogo per area tematica e trova i corsi della materia che ti serve.',
  },
  {
    mode: 'ruolo',
    icon: Users,
    title: 'Per figura professionale',
    description:
      'Scegli il tuo ruolo e visualizza i percorsi formativi rilevanti per te.',
  },
  {
    mode: 'normativa',
    icon: FileText,
    title: 'Per normativa',
    description:
      'Parti dalla legge che devi rispettare e trova i corsi che ti mettono in regola.',
  },
] as const

/** Passo 1 del flusso guidato — solo le 3 modalità di ricerca, nessun elenco corsi. */
export function StepModeCards() {
  return (
    <section
      aria-labelledby="discovery-heading"
      className="border-b border-neutral-200 bg-neutral-50"
    >
      <div className="container-default py-12 lg:py-16">
        <div className="mb-10 text-center">
          <p className="mb-3 text-brand-700 overline">Trova il corso giusto</p>
          <h2
            id="discovery-heading"
            className="font-heading text-2xl font-bold text-balance text-neutral-950 lg:text-3xl"
          >
            Come vuoi cercare?
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {MODES.map(({ mode, icon: Icon, title, description }) => (
            <Link
              key={mode}
              href={`/corsi?step=2&mode=${mode}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <IconCircle
                color="brand"
                icon={<Icon />}
                className="mb-6 transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="mb-2 font-heading text-xl font-bold text-neutral-950">
                {title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-neutral-600">
                {description}
              </p>
              <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all duration-200 group-hover:gap-2.5">
                Inizia
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/corsi?step=3"
            className="text-sm font-medium text-neutral-600 underline underline-offset-4 transition-colors duration-150 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Vedi tutti i corsi
          </Link>
        </div>
      </div>
    </section>
  )
}
