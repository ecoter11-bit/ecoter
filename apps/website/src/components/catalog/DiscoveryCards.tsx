import Link from 'next/link'
import { BookOpen, Users, FileText, ArrowRight } from 'lucide-react'
import type { CategoryWithCount } from '@/types'

type Props = {
  categories: CategoryWithCount[]
  normativeRefs: string[]
}

const audienceLinks = [
  { label: 'RSPP / ASPP', href: '/corsi?aud=rspp-aspp' },
  { label: 'Datori di lavoro', href: '/corsi?aud=datori' },
  { label: 'Lavoratori', href: '/corsi?aud=lavoratori' },
  { label: 'Responsabili Qualità', href: '/corsi?aud=qualita' },
  { label: 'Settore Alimentare', href: '/corsi?aud=alimentare' },
  { label: 'Squadra Emergenza', href: '/corsi?aud=squadra-emergenza' },
]

export function DiscoveryCards({ categories, normativeRefs }: Props) {
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
          {/* Card 1 — Per argomento */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-brand-50">
              <BookOpen className="size-6 text-brand-600" aria-hidden="true" />
            </div>
            <h3 className="mb-2 font-heading text-lg font-bold text-neutral-950">
              Per argomento
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-neutral-600">
              Sfoglia il catalogo per area tematica e trova i corsi della
              materia che ti serve.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/corsi?cat=${cat.slug}`}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700 transition-all duration-200 hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <Link
              href="/corsi"
              className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all duration-200 hover:gap-2.5"
            >
              Tutti i corsi
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Card 2 — Per figura professionale */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-blue-50">
              <Users className="size-6 text-blue-600" aria-hidden="true" />
            </div>
            <h3 className="mb-2 font-heading text-lg font-bold text-neutral-950">
              Per figura professionale
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-neutral-600">
              Scegli il tuo ruolo e visualizza i percorsi formativi rilevanti
              per te.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {audienceLinks.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
                >
                  {a.label}
                </Link>
              ))}
            </div>
            <Link
              href="/corsi"
              className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all duration-200 hover:gap-2.5"
            >
              Tutti i corsi
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Card 3 — Per normativa */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-eco-50">
              <FileText className="size-6 text-eco-600" aria-hidden="true" />
            </div>
            <h3 className="mb-2 font-heading text-lg font-bold text-neutral-950">
              Per normativa
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-neutral-600">
              Parti dalla legge che devi rispettare e trova i corsi che ti
              mettono in regola.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {normativeRefs.slice(0, 5).map((norm) => (
                <Link
                  key={norm}
                  href={`/corsi?norm=${encodeURIComponent(norm)}`}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700 transition-all duration-200 hover:border-eco-500 hover:bg-eco-50 hover:text-eco-700"
                >
                  {norm}
                </Link>
              ))}
            </div>
            <Link
              href="/corsi"
              className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-eco-600 transition-all duration-200 hover:gap-2.5"
            >
              Tutti i corsi
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
