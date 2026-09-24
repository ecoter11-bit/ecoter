'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { buttonVariants, Kbd } from '@ecoter/ui'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { isNavItemActive, mainNav } from '@/config/nav'
import { AcademyTag, EcoterLogo } from '@/components/ui/LogoEcoter'
import { Container } from './Container'
import { MobileNav } from './MobileNav'
import { SearchDialog } from './SearchDialog'

const noSubscription = () => () => {}

/**
 * Etichetta della scorciatoia della ricerca: "⌘K" su Mac, "Ctrl K" altrove.
 * Sul server (e al primo render di idratazione) vale "Ctrl K", poi React
 * passa al valore del browser senza errori di idratazione.
 */
function useSearchShortcutLabel(): string {
  return useSyncExternalStore(
    noSubscription,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl K'),
    () => 'Ctrl K'
  )
}

/**
 * Header del sito (MODIFICHE del 23 e del 24/09/2026).
 * - Sempre staccato dalla pagina: bordo e ombra fissi, non solo quando si
 *   scorre.
 * - Voci da `mainNav`: Calendario corsi · Aziende e professionisti · Chi
 *   Siamo · FAQ · Contatti (niente più "Corsi" e mega menu), le stesse del
 *   menu mobile. La voce della pagina corrente è sottolineata, non solo
 *   colorata (WCAG 1.4.1).
 * - Cinque voci stanno in riga solo da `xl` (1280px): sotto c'è il menu a
 *   pannello (`MobileNav`), che così resta l'unico modo di navigare fino a
 *   1279px invece di una riga che va a capo.
 * - Ricerca vera sui corsi (`SearchDialog`), anche con Ctrl/⌘+K: bottone
 *   lungo "Cerca corsi…" da `lg`, icona sotto. Se cambi le voci, riprova
 *   la riga a 1280px con la barra di scorrimento: non deve sforare.
 */
export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const shortcutLabel = useSearchShortcutLabel()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((isOpen) => !isOpen)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className="sticky top-0 w-full border-b border-border bg-white/95 shadow-sm backdrop-blur-md"
        style={{ zIndex: 'var(--z-index-sticky)' }}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden"
              aria-label={`${siteConfig.name} — torna alla homepage`}
            >
              <EcoterLogo height={34} priority />
              <span
                className="hidden h-6 w-px bg-neutral-200 sm:block"
                aria-hidden="true"
              />
              <AcademyTag className="hidden text-neutral-600 sm:block" />
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden items-center gap-0.5 xl:flex"
              aria-label="Navigazione principale"
            >
              {mainNav.map((item) => {
                const active = isNavItemActive(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-lg px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                      active
                        ? 'bg-brand-50 text-brand-700 underline decoration-2 underline-offset-4'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Right actions */}
            <div className="flex shrink-0 items-center gap-1.5">
              {/* Search — bottone lungo, da lg */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-haspopup="dialog"
                aria-keyshortcuts="Control+K Meta+K"
                className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-neutral-50 pr-2.5 pl-3 text-sm whitespace-nowrap text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-white hover:text-foreground lg:flex"
              >
                <Search className="size-3.5" aria-hidden="true" />
                <span>Cerca corsi…</span>
                {/* "Ctrl K" solo sotto `xl`: da `xl` quello spazio serve alle
                    cinque voci del menu (a 1280px, con la barra di
                    scorrimento classica di Windows, la riga ha ~1100px). La
                    scorciatoia funziona comunque ed è dichiarata in
                    `aria-keyshortcuts`. */}
                <Kbd className="ml-1.5 xl:hidden" aria-hidden="true">
                  {shortcutLabel}
                </Kbd>
              </button>

              {/* Search — icona, sotto lg */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-haspopup="dialog"
                aria-keyshortcuts="Control+K Meta+K"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon-lg' }),
                  'text-neutral-600 lg:hidden'
                )}
                aria-label="Cerca corsi"
              >
                <Search className="size-5" aria-hidden="true" />
              </button>

              {/* CTA */}
              <Link
                href="/contatti"
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'hidden px-4 font-semibold sm:inline-flex'
                )}
              >
                Richiedi info
              </Link>

              {/* Mobile menu */}
              <MobileNav items={mainNav} />
            </div>
          </div>
        </Container>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
