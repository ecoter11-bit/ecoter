import { getAllCategories } from '@/lib/content'
import {
  HeroSection,
  CorsiInCalendarioSection,
  CtaFinaleSection,
} from '@/components/sections'

/**
 * Home essenziale (MODIFICHE del 23/09/2026): hero con un ingresso per area,
 * "Corsi in calendario", fascia finale di contatto. Aree formative, "Perché
 * ECOTER", "Come funziona" e FAQ non ci sono più: le aree sono i bottoni
 * della hero, le FAQ hanno la loro pagina.
 */
export default function HomePage() {
  const areas = getAllCategories().map(({ slug, name, icon }) => ({
    slug,
    name,
    icon,
  }))

  return (
    <>
      <HeroSection areas={areas} />
      <CorsiInCalendarioSection />
      <CtaFinaleSection />
    </>
  )
}
