import type { Metadata } from 'next'
import {
  ChiSiamoHeroSection,
  ChiSiamoStorySection,
  MissioneAcademySection,
  ValoriSection,
  ClientiSection,
  AccreditamentiSection,
} from '@/components/sections'
import { buildPageMetadata } from '@/lib/seo/page-metadata'

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Chi Siamo',
    description:
      'ECO-TER Academy è la divisione formazione di ECO-TER Srl, società di ingegneria e servizi attiva dal 2002 in sicurezza sul lavoro, ambiente e sistemi di gestione.',
    path: '/chi-siamo',
  }),
}

export default function ChiSiamoPage() {
  return (
    <>
      <ChiSiamoHeroSection />
      <ChiSiamoStorySection />
      <MissioneAcademySection />
      <ValoriSection />
      <ClientiSection />
      <AccreditamentiSection />
    </>
  )
}
