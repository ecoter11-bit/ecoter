import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { IconCircle } from '@ecoter/ui'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  /** Nome dell'area: è anche il nome accessibile del link. */
  label: string
  icon: LucideIcon
  className?: string
}

/**
 * Bottone d'area: icona, nome, freccia. Oggi sono i tre ingressi ai corsi
 * nella hero della home.
 *
 * Verde pieno della palette per tutte e tre le aree (MODIFICHE del
 * 24/09/2026: "separare meglio i pulsanti dallo sfondo, cambia i colori ma
 * usa il colore verde della palette", scritte più grandi). Testo bianco su
 * `brand-600` 5.0:1, su `brand-700` all'hover 6.9:1: AA già come testo
 * normale (il nome è a 18px bold, appena sotto la soglia di "testo grande").
 * L'icona è `IconCircle` di `@ecoter/ui` nella variante `inverse`, quella
 * per stare sopra una superficie colorata.
 *
 * Tutto il riquadro è il link. Icona e freccia sono decorative, quindi il
 * nome accessibile è solo il nome dell'area. Il focus da tastiera è il
 * contorno globale (`:focus-visible` in globals.css, `--ring` staccato di
 * 2px, ~5:1 sul bianco della hero). `text-balance` fa andare a capo i nomi
 * lunghi sullo spazio ("Benessere / psico-sociale") invece che dopo il
 * trattino.
 */
export function AreaLinkTile({ href, label, icon: Icon, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex h-full items-center gap-4 rounded-2xl bg-brand-600 px-4 py-4 text-white shadow-md sm:px-5',
        'transition-[translate,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg',
        className
      )}
    >
      <IconCircle
        size="sm"
        color="inverse"
        icon={<Icon className="size-5" />}
      />
      <span className="flex-1 font-heading text-lg leading-snug font-bold text-balance">
        {label}
      </span>
      <ArrowRight
        className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  )
}
