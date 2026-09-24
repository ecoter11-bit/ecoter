import { getAllCategories } from '@/lib/content'
import { HeroSection } from '@/components/sections'

/**
 * Home (MODIFICHE del 23 e del 24/09/2026): solo la hero, con i tre bottoni
 * delle aree e il link al sito di ECO-TER. "Corsi in calendario" è diventata
 * una pagina a sé (`/calendario-corsi`, voce "Calendario corsi"
 * nell'header); la fascia finale di contatto è stata tolta dalla home (resta
 * sulle altre pagine). Aree formative, "Perché ECO-TER", "Come funziona" e
 * FAQ erano già state tolte il 23/09.
 */
export default function HomePage() {
  const areas = getAllCategories().map(({ slug, name, icon }) => ({
    slug,
    name,
    icon,
  }))

  return <HeroSection areas={areas} />
}
