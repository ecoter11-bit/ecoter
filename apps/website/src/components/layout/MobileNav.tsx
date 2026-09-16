'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronRight,
  HardHat,
  HeartHandshake,
  Leaf,
  Menu,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { EcoterLogo } from '@/components/ui/LogoEcoter'
import type { NavCategory, NavGroup, NavItem } from '@/config/nav'

const ICON_MAP: Record<string, LucideIcon> = {
  HardHat,
  Leaf,
  HeartHandshake,
}

type MobileNavProps = {
  mainNav: NavItem[]
  courseCategories: NavCategory[]
  modalityNav: NavGroup
}

export function MobileNav({
  mainNav,
  courseCategories,
  modalityNav,
}: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const pathname = usePathname()

  // Render-time state reset on route change (avoids setState-in-effect)
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    if (open) setOpen(false)
    if (expandedSection !== null) setExpandedSection(null)
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const toggleSection = (key: string) =>
    setExpandedSection((prev) => (prev === key ? null : key))

  const otherNavItems = mainNav.filter((item) => item.href !== '/corsi')

  return (
    <>
      {/* Hamburger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-neutral-100 lg:hidden"
        aria-label={open ? 'Chiudi menu' : 'Apri menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5 text-neutral-700" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Menu className="h-5 w-5 text-neutral-700" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-neutral-950/50 lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="mobile-panel"
              id="mobile-nav-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1.0] }}
              className="fixed top-0 right-0 z-50 flex h-full w-80 max-w-[calc(100vw-3rem)] flex-col bg-white shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu di navigazione"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setOpen(false)}
                  aria-label={`${siteConfig.name} — homepage`}
                >
                  <EcoterLogo height={28} />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 transition-colors hover:bg-neutral-100"
                  aria-label="Chiudi menu"
                >
                  <X className="h-5 w-5 text-neutral-600" aria-hidden="true" />
                </button>
              </div>

              {/* Nav content */}
              <nav
                className="flex-1 overflow-y-auto px-3 py-3"
                aria-label="Menu mobile"
              >
                {/* Corsi — expandable */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleSection('corsi')}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
                    aria-expanded={expandedSection === 'corsi'}
                  >
                    Corsi
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-neutral-400 transition-transform duration-200',
                        expandedSection === 'corsi' && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedSection === 'corsi' && (
                      <motion.div
                        key="corsi-section"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.22,
                          ease: [0.0, 0.0, 0.2, 1.0],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-2 pt-1 pb-2">
                          <p className="mb-1.5 px-2 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                            Aree tematiche
                          </p>
                          <ul className="space-y-0.5" role="list">
                            {courseCategories.map((cat) => {
                              const Icon = ICON_MAP[cat.icon]
                              return (
                                <li key={cat.href}>
                                  <Link
                                    href={cat.href}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-neutral-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                                  >
                                    {Icon && (
                                      <Icon
                                        className="h-4 w-4 text-neutral-500"
                                        aria-hidden="true"
                                      />
                                    )}
                                    {cat.label}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>

                          <div className="my-3 border-t border-border" />

                          <p className="mb-1.5 px-2 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                            {modalityNav.label}
                          </p>
                          <ul className="space-y-0.5" role="list">
                            {modalityNav.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-foreground"
                                >
                                  <ChevronRight
                                    className="h-3.5 w-3.5 text-neutral-400"
                                    aria-hidden="true"
                                  />
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other nav items */}
                {otherNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
                  >
                    {item.label}
                    <ChevronRight
                      className="h-4 w-4 text-neutral-400"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </nav>

              {/* Panel footer */}
              <div className="border-t border-border px-4 py-4">
                <Link
                  href="/contatti"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Richiedi informazioni
                </Link>
                {siteConfig.email && (
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="transition-colors hover:text-foreground"
                    >
                      {siteConfig.email}
                    </a>
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
