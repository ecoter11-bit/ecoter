import type { Metadata } from 'next'
import { getAllCategoriesWithCount } from '@/lib/content'
import {
  AziendeHeroSection,
  AziendeOffertaSection,
  AziendeComeLavoriamoSection,
  AziendeAmbitiSection,
  AziendePercheSection,
  CtaFinaleSection,
} from '@/components/sections'
import { absoluteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Soluzioni Aziendali',
  description:
    'Formazione su misura per la tua azienda: analisi del fabbisogno, piani personalizzati, in house o in aula, gestione completa di calendario, docenti e attestati.',
  alternates: {
    canonical: absoluteUrl('/soluzioni/aziende'),
  },
}

export default function SoluzioniAziendePage() {
  const categories = getAllCategoriesWithCount()

  return (
    <>
      <AziendeHeroSection />
      <AziendeOffertaSection />
      <AziendeComeLavoriamoSection />
      <AziendeAmbitiSection categories={categories} />
      <AziendePercheSection />
      <CtaFinaleSection />
    </>
  )
}
