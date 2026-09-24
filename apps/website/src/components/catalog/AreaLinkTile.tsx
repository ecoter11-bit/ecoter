import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { IconCircle, type IconCircleColor } from '@ecoter/ui'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  /** Nome dell'area: è anche il nome accessibile del link. */
  label: string
  icon: LucideIcon
  /** Colore dell'area (Decision 018), come in `CatalogCard`. */
  color: IconCircleColor
  className?: string
}

/**
 * Ingresso compatto a un'area del catalogo: icona dell'area, nome, freccia.
 *
 * È `CatalogCard` ridotta a una riga, per dove serve solo scegliere l'area
 * (oggi i bottoni della hero in home). Stesso raggio, stesso bordo e stesso
 * hover: si alza, il bordo sparisce, compare l'ombra. Così lo stesso gesto
 * ("vai a quest'area") ha lo stesso aspetto qui e nel catalogo.
 *
 * Tutto il riquadro è il link. Icona e freccia sono decorative, quindi il
 * nome accessibile è solo il nome dell'area. Il focus da tastiera è il
 * contorno globale (`:focus-visible` in globals.css). `text-balance` fa
 * andare a capo i nomi lunghi sullo spazio ("Benessere / psico-sociale")
 * invece che dopo il trattino.
 */
export function AreaLinkTile({
  href,
  label,
  icon: Icon,
  color,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex h-full items-center gap-3.5 rounded-2xl border border-neutral-200 bg-white p-3 pr-4',
        'transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg',
        className
      )}
    >
      <IconCircle size="sm" color={color} icon={<Icon />} />
      <span className="flex-1 font-heading text-base leading-snug font-bold text-balance text-neutral-950">
        {label}
      </span>
      <ArrowRight
        className="size-4 shrink-0 text-neutral-500 transition-[translate,color] duration-200 group-hover:translate-x-0.5 group-hover:text-neutral-950"
        aria-hidden="true"
      />
    </Link>
  )
}
