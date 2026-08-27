'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from '@ecoter/ui'
import { FAQS } from '@/lib/content/faq'

/** Teaser stays short — the full list lives on /faq; showing all of it here would make the "Tutte le domande frequenti" link below redundant. */
const PREVIEW_FAQS = FAQS.slice(0, 4)
import { Container } from '@/components/layout'
import {
  slideUp,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

export function FaqPreviewSection() {
  return (
    <section aria-labelledby="faq-heading" className="bg-white">
      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={slideUp} className="mb-14 text-center">
            <p className="mb-3 text-brand-700 overline">Domande frequenti</p>
            <h2
              id="faq-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Hai domande?
            </h2>
          </motion.div>

          <motion.div variants={slideUp}>
            <Accordion defaultValue={[PREVIEW_FAQS[0]?.id ?? '']}>
              {PREVIEW_FAQS.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionPanel>{faq.answer}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div variants={slideUp} className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
            >
              Tutte le domande frequenti
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
