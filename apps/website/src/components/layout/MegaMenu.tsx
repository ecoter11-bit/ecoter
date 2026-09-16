'use client'

import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  HardHat,
  HeartHandshake,
  Leaf,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavCategory, NavGroup, NavItem } from '@/config/nav'

const ICON_MAP: Record<string, LucideIcon> = {
  HardHat,
  Leaf,
  HeartHandshake,
}

function CategoryIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = ICON_MAP[name]
  if (!Icon) return null
  return <Icon className={className} aria-hidden="true" />
}

type MegaMenuProps = {
  mainNav: NavItem[]
  courseCategories: NavCategory[]
  modalityNav: NavGroup
}

export function MegaMenu({
  mainNav,
  courseCategories,
  modalityNav,
}: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const openMenu = useCallback((key: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setActiveMenu(key)
  }, [])

  const scheduleClose = useCallback(() => {
    timerRef.current = setTimeout(() => setActiveMenu(null), 180)
  }, [])

  const cancelClose = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const close = useCallback(() => setActiveMenu(null), [])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav
      className="hidden items-center gap-0.5 lg:flex"
      aria-label="Navigazione principale"
    >
      {mainNav.map((item) => {
        const isMegaTrigger = item.href === '/corsi'
        const active = isActive(item.href)

        if (isMegaTrigger) {
          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => openMenu('corsi')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={cn(
                  'flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  active || activeMenu === 'corsi'
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-foreground'
                )}
                aria-expanded={activeMenu === 'corsi'}
                aria-haspopup="true"
                onClick={() =>
                  setActiveMenu(activeMenu === 'corsi' ? null : 'corsi')
                }
              >
                {item.label}
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform duration-200',
                    activeMenu === 'corsi' && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {activeMenu === 'corsi' && (
                  <motion.div
                    key="mega-corsi"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18, ease: [0.0, 0.0, 0.2, 1.0] }}
                    className="absolute top-full left-1/2 z-50 mt-2 w-[640px] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-white shadow-xl"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    role="region"
                    aria-label="Menu corsi"
                  >
                    <div className="grid grid-cols-[1fr_220px] divide-x divide-border">
                      {/* Left: categories */}
                      <div className="p-5">
                        <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          Aree tematiche
                        </p>
                        <ul className="grid gap-1" role="list">
                          {courseCategories.map((cat) => (
                            <li key={cat.href}>
                              <Link
                                href={cat.href}
                                onClick={close}
                                className="group flex items-center gap-2.5 rounded-lg p-2.5 text-sm text-neutral-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                              >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600 transition-colors group-hover:bg-brand-100 group-hover:text-brand-600">
                                  <CategoryIcon
                                    name={cat.icon}
                                    className="h-4 w-4"
                                  />
                                </span>
                                <span className="leading-tight font-medium">
                                  {cat.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/corsi"
                          onClick={close}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                        >
                          Vedi tutti i corsi
                          <ArrowRight
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>

                      {/* Right: modality */}
                      <div className="flex flex-col gap-5 bg-neutral-50 p-5">
                        <div>
                          <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            {modalityNav.label}
                          </p>
                          <ul className="space-y-0.5" role="list">
                            {modalityNav.items.map((navItem) => (
                              <li key={navItem.href}>
                                <Link
                                  href={navItem.href}
                                  onClick={close}
                                  className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white hover:text-foreground"
                                >
                                  <ArrowRight
                                    className="h-3 w-3 text-neutral-400"
                                    aria-hidden="true"
                                  />
                                  {navItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-brand-50 text-brand-600'
                : 'text-neutral-700 hover:bg-neutral-100 hover:text-foreground'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
