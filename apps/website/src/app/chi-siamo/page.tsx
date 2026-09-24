import type { Metadata } from 'next'
import {
  ChiSiamoHeroSection,
  ChiSiamoStorySection,
  MissioneAcademySection,
  ValoriSection,
  ClientiSection,
  AccreditamentiSection,
  CtaFinaleSection,
} from '@/components/sections'
import { absoluteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description:
    'ECO-TER Academy è la divisione formazione di ECO-TER Srl, società di ingegneria e servizi attiva dal 2002 in sicurezza sul lavoro, ambiente e sistemi di gestione.',
  alternates: {
    canonical: absoluteUrl('/chi-siamo'),
  },
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
      <CtaFinaleSection />
    </>
  )
}
