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

/*
 * "Formazione su misura": prima "Soluzioni Aziendali", poi "Aziende e
 * professionisti" (MODIFICHE del 23/09/2026), infine il nome preso dal
 * titolo della pagina (scelta di Davide del 24/09). La pagina parla ad
 * aziende e professionisti. L'indirizzo resta `/soluzioni/aziende`, così
 * link e indicizzazione non cambiano.
 */
export const metadata: Metadata = {
  title: 'Formazione su misura',
  description:
    'Formazione su misura per aziende e professionisti: analisi del fabbisogno, piani personalizzati, in sede, in aula o online, gestione completa di calendario, docenti e attestati.',
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
