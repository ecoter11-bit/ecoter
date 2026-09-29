import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
import { IconCircle } from '@ecoter/ui'
import { Container } from '@/components/layout'
import { CatalogPageHeader } from '@/components/catalog/CatalogPageHeader'
import { AVAILABLE_COURSES_PATH } from '@/config/nav'
import { absoluteUrl } from '@/lib/utils'

/*
 * Finché la pagina è vuota resta fuori da Google (`index: false`) e dalla
 * sitemap: quando arriveranno i corsi, togliere `robots` e aggiungerla in
 * `src/app/sitemap.ts`.
 */
export const metadata: Metadata = {
  title: 'Catalogo',
  description:
    'I corsi ECO-TER Academy disponibili in questo momento. Il catalogo è in arrivo.',
  alternates: {
    canonical: absoluteUrl(AVAILABLE_COURSES_PATH),
  },
  robots: { index: false, follow: true },
}

/**
 * Catalogo (richiesta del 28/09/2026): la pagina del bottone
 * "Visita il catalogo" in home. Per il capo sono i corsi disponibili in
 * questo momento. Non è il catalogo completo per aree (`/corsi`, "Catalogo
 * corsi").
 *
 * Per ora è vuota: titolo e "In arrivo", come chiesto da Davide. Quando ci
 * saranno i corsi disponibili, l'elenco prenderà il posto del riquadro.
 */
export default function CatalogoPage() {
  return (
    <>
      <CatalogPageHeader
        overline="Corsi disponibili"
        title="Catalogo"
        description="I corsi disponibili in questo momento."
      />

      <section aria-labelledby="catalogo-heading" className="bg-neutral-25">
        <Container className="section-padding">
          <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center sm:px-10">
            <IconCircle icon={<BookOpen />} className="mb-5" />
            <h2
              id="catalogo-heading"
              className="font-heading text-2xl font-bold text-neutral-950"
            >
              In arrivo
            </h2>
            <p className="mx-auto mt-3 max-w-md text-pretty text-neutral-600">
              Il catalogo sarà pubblicato qui.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
