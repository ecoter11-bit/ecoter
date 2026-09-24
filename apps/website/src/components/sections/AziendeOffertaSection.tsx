'use client'

import { motion } from 'framer-motion'
import {
  ClipboardList,
  Building2,
  FileCheck2,
  type LucideIcon,
} from 'lucide-react'
import { IconCircle } from '@ecoter/ui'
import { Container } from '@/components/layout'
import {
  slideUp,
  slideUpGentle,
  staggerContainer,
  viewportOnce,
} from '@/components/motion/variants'

type Offerta = {
  icon: LucideIcon
  title: string
  description: string
}

const OFFERTA: Offerta[] = [
  {
    icon: ClipboardList,
    title: 'Su misura',
    description:
      'Analizziamo il fabbisogno formativo, dell’azienda o del singolo professionista, e costruiamo un piano personalizzato per ruolo, settore e livello di rischio.',
  },
  {
    icon: Building2,
    title: 'In house',
    description:
      'Formazione erogata direttamente presso la tua sede, oltre alle modalità in aula, online e blended — la scelta si adatta alle tue esigenze.',
  },
  {
    icon: FileCheck2,
    title: 'Gestione completa',
    description:
      'Ci occupiamo di calendario, docenti qualificati, attestati validi ai fini di legge e di tutta la documentazione e i registri necessari.',
  },
]

export function AziendeOffertaSection() {
  return (
    <section aria-labelledby="offerta-heading" className="bg-white">
      <Container className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={slideUp} className="mb-14 text-center">
            <p className="mb-3 text-brand-700 overline">Cosa offriamo</p>
            <h2
              id="offerta-heading"
              className="font-heading text-3xl font-light tracking-tight text-balance text-neutral-950 lg:text-4xl"
            >
              Formazione pensata per il tuo lavoro
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERTA.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  variants={slideUpGentle}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-md"
                >
                  <IconCircle
                    color="brand"
                    icon={<Icon aria-hidden="true" />}
                    className="mb-5 transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="mb-2.5 font-heading text-lg font-bold text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
