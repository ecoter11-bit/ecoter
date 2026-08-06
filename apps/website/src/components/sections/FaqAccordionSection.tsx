'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from '@ecoter/ui'
import { FAQS } from '@/lib/content/faq'
import { Container } from '@/components/layout'

export function FaqAccordionSection() {
  return (
    <section aria-labelledby="faq-list-heading" className="bg-neutral-25">
      <Container className="section-padding">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-list-heading" className="sr-only">
            Elenco domande frequenti
          </h2>
          <Accordion defaultValue={[FAQS[0]?.id ?? '']}>
            {FAQS.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionPanel>{faq.answer}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  )
}
