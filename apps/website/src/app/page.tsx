import { getAllCategories } from '@/lib/content'
import { HeroSection } from '@/components/sections'

/**
 * Home (MODIFICHE del 23, del 24 e del 29/09/2026): solo la hero, con il
 * link al sito di ECO-TER in alto a destra, i tre bottoni delle aree e il
 * bottone "Calendario corsi" (`/calendario-corsi`, ex sezione "Corsi in
 * calendario"). La fascia finale di contatto non c'è più in nessuna pagina
 * (29/09). Aree formative, "Perché ECO-TER", "Come funziona" e FAQ erano
 * già state tolte il 23/09.
 */
export default function HomePage() {
  const areas = getAllCategories().map(({ slug, name, icon }) => ({
    slug,
    name,
    icon,
  }))

  return <HeroSection areas={areas} />
}
