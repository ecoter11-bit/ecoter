'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import {
  audienceNav,
  courseCategories,
  mainNav,
  modalityNav,
} from '@/config/nav'
import { AcademyTag, EcoterLogo } from '@/components/ui/LogoEcoter'
import { Container } from './Container'
import { MegaMenu } from './MegaMenu'
import { MobileNav } from './MobileNav'
import { SearchDialog } from './SearchDialog'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-[background-color,box-shadow,border-color] duration-200',
          scrolled
            ? 'border-b border-border bg-white/95 shadow-sm backdrop-blur-md'
            : 'border-b border-transparent bg-white'
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
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
            <MegaMenu
              mainNav={mainNav}
              courseCategories={courseCategories}
              audienceNav={audienceNav}
              modalityNav={modalityNav}
            />

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              {/* Search — desktop pill */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-neutral-50 pr-2.5 pl-3 text-sm text-neutral-500 transition-colors hover:border-neutral-300 hover:bg-white hover:text-foreground lg:flex"
                aria-label="Cerca corsi (⌘K)"
              >
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Cerca corsi…</span>
                <kbd className="ml-1.5 rounded border border-neutral-200 bg-white px-1 py-0.5 font-mono text-[10px] text-neutral-400">
                  ⌘K
                </kbd>
              </button>

              {/* Search — mobile icon */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-neutral-100 lg:hidden"
                aria-label="Cerca"
              >
                <Search
                  className="h-5 w-5 text-neutral-600"
                  aria-hidden="true"
                />
              </button>

              {/* CTA */}
              <Link
                href="/contatti"
                className="hidden h-9 items-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:inline-flex"
              >
                Richiedi info
              </Link>

              {/* Mobile hamburger */}
              <MobileNav
                mainNav={mainNav}
                courseCategories={courseCategories}
                audienceNav={audienceNav}
                modalityNav={modalityNav}
              />
            </div>
          </div>
        </Container>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
