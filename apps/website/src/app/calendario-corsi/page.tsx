import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarClock } from 'lucide-react'
import { buttonVariants, IconCircle } from '@ecoter/ui'
import { Container } from '@/components/layout'
import { CatalogPageHeader } from '@/components/catalog/CatalogPageHeader'
import { CATALOG_PATH } from '@/lib/catalog'
import { absoluteUrl, cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Calendario corsi',
  description:
    'Le prossime edizioni dei corsi ECO-TER Academy. Le date sono in arrivo: scrivici per sapere quando parte il corso che ti interessa.',
  alternates: {
    canonical: absoluteUrl('/calendario-corsi'),
  },
}

/**
 * Calendario corsi (MODIFICHE del 24/09/2026): prima era la sezione "Corsi
 * in calendario" della home, ora è una pagina con la sua voce nell'header.
 *
 * Per ora il calendario è vuoto, quindi la pagina mostra "Date in arrivo"
 * con l'invito a scriverci e il link al catalogo. Quando ci sarà una fonte
 * per le date (il tipo `CourseDate` in `src/types/course.ts` esiste già, i
 * dati no), l'elenco delle edizioni prenderà il posto del riquadro.
 */
export default function CalendarioCorsiPage() {
  return (
    <>
      <CatalogPageHeader
        overline="Prossime edizioni"
        title="Calendario corsi"
        description="Qui trovi le date delle prossime edizioni dei nostri corsi."
      />

      <section aria-labelledby="calendario-heading" className="bg-neutral-25">
        <Container className="section-padding">
          <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center sm:px-10">
            <IconCircle icon={<CalendarClock />} className="mb-5" />
            <h2
              id="calendario-heading"
              className="font-heading text-2xl font-bold text-neutral-950"
            >
              Date in arrivo
            </h2>
            <p className="mx-auto mt-3 max-w-md text-pretty text-neutral-600">
              Il calendario delle prossime edizioni sarà pubblicato qui. Nel
              frattempo scrivici: ti diciamo quando parte il corso che ti
              interessa.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contatti"
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'h-11 gap-2 px-6 text-sm font-semibold'
                )}
              >
                Chiedi le prossime date
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={CATALOG_PATH}
                className={cn(
                  buttonVariants({ variant: 'outline-brand' }),
                  'h-11 px-6 text-sm font-semibold'
                )}
              >
                Sfoglia il catalogo
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
