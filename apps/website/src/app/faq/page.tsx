import type { Metadata } from 'next'
import { FaqAccordionSection, CtaFinaleSection } from '@/components/sections'
import { Container } from '@/components/layout'
import { FAQS } from '@/lib/content/faq'
import { buildFaqJsonLd } from '@/lib/seo/faq-schema'
import { absoluteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Le risposte alle domande più frequenti su corsi, attestati, formazione in house e modalità di erogazione ECOTER Academy.',
  alternates: {
    canonical: absoluteUrl('/faq'),
  },
}

export default function FaqPage() {
  const jsonLd = buildFaqJsonLd(FAQS)

  return (
    <>
      {/* Trusted, build-time-generated JSON (static FAQ content), not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-neutral-200 bg-white">
        <Container className="py-12 lg:py-16">
          <p className="mb-3 text-brand-700 overline">Assistenza</p>
          <h1 className="max-w-2xl font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 lg:text-5xl">
            Domande frequenti
          </h1>
          <p className="mt-4 max-w-xl text-lg text-pretty text-neutral-600">
            Le risposte alle domande che ci vengono poste più spesso su corsi,
            attestati e modalità di erogazione. Non trovi quello che cerchi?
            Scrivici.
          </p>
        </Container>
      </div>

      <FaqAccordionSection />
      <CtaFinaleSection />
    </>
  )
}
