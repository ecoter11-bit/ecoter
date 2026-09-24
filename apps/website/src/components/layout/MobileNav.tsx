'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Menu, X } from 'lucide-react'
import { breakpoint } from '@ecoter/tokens'
import {
  buttonVariants,
  Dialog,
  DialogClose,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@ecoter/ui'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { isNavItemActive, type NavItem } from '@/config/nav'
import { EcoterLogo } from '@/components/ui/LogoEcoter'

type MobileNavProps = {
  items: NavItem[]
}

/** Da `lg` in su c'è la navigazione desktop: il menu mobile non serve più. */
const DESKTOP_QUERY = `(min-width: ${breakpoint.lg})`

/**
 * Menu sotto `lg`: pannello laterale da destra, sul `Dialog` di
 * `@ecoter/ui` (placement `sheet`). Dal primitivo: focus dentro il pannello
 * finché è aperto, Esc e clic fuori per chiudere, focus che torna al
 * bottone, pagina sotto bloccata. Stesse voci dell'header desktop; quella
 * della pagina corrente è sottolineata, non solo colorata (WCAG 1.4.1).
 */
export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Se la finestra si allarga fino al layout desktop con il menu aperto,
  // il pannello (nascosto da `lg:hidden`) lascerebbe la pagina bloccata.
  useEffect(() => {
    if (!open) return
    const query = window.matchMedia(DESKTOP_QUERY)
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [open])

  const close = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon-lg' }),
          'text-neutral-700 lg:hidden'
        )}
        aria-label="Apri il menu"
      >
        <Menu className="size-5" aria-hidden="true" />
      </DialogTrigger>

      <DialogPopup placement="sheet" className="lg:hidden">
        <DialogTitle className="sr-only">Menu</DialogTitle>

        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Link
            href="/"
            onClick={close}
            className="rounded-lg"
            aria-label={`${siteConfig.name} — torna alla homepage`}
          >
            <EcoterLogo height={28} />
          </Link>
          <DialogClose
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon-lg' }),
              'text-neutral-600'
            )}
            aria-label="Chiudi il menu"
          >
            <X className="size-5" aria-hidden="true" />
          </DialogClose>
        </div>

        <nav
          aria-label="Navigazione principale"
          className="flex-1 overflow-y-auto px-3 py-3"
        >
          <ul role="list" className="space-y-0.5">
            {items.map((item) => {
              const active = isNavItemActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold transition-colors',
                      active
                        ? 'bg-brand-50 text-brand-700 underline decoration-2 underline-offset-4'
                        : 'text-neutral-800 hover:bg-neutral-50'
                    )}
                  >
                    {item.label}
                    <ChevronRight
                      className="size-4 text-neutral-400"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-border px-4 py-4">
          <Link
            href="/contatti"
            onClick={close}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'h-12 w-full font-semibold'
            )}
          >
            Richiedi informazioni
          </Link>
          {siteConfig.email && (
            <p className="mt-3 text-center text-xs text-neutral-600">
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
          )}
        </div>
      </DialogPopup>
    </Dialog>
  )
}
