import type * as React from 'react'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'

import { cn } from './lib/cn'

/**
 * Chevron rotates via `data-panel-open` (Base UI's own trigger data
 * attribute) — no JS state needed. Inlined rather than pulled from an icon
 * library: this package has none as a dependency yet (see CLAUDE.md "Cosa
 * NON fare" — don't add one without checking it's not already duplicated by
 * the site's lucide-react), and a single static chevron doesn't justify
 * introducing it here.
 */
function ChevronDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function Accordion({
  className,
  ...props
}: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        'flex flex-col divide-y divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-white',
        className
      )}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('group/item', className)}
      {...props}
    />
  )
}

/** Wraps Base UI's `Header` + `Trigger` — a heading (`<h3>` by default) around the interactive button, so consumers can't forget it and end up with an inaccessible accordion. */
function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // `border border-transparent` gives focus-visible:border-ring an actual
          // border-width to color — without it (Tailwind Preflight resets border
          // to 0-width) the color change renders nothing, and the ring alone
          // (~1.9:1) both fails 1.4.11 and gets clipped by the Root's
          // `overflow-hidden`. Same recipe as button.tsx/badge.tsx.
          'group flex w-full items-center gap-4 border border-transparent px-5 py-4 text-left outline-none transition-colors select-none',
          'hover:bg-neutral-50',
          'focus-visible:relative focus-visible:z-10 focus-visible:rounded-lg focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...props}
      >
        <span className="flex-1 font-heading text-base font-bold text-neutral-950">
          {children}
        </span>
        <ChevronDownIcon
          className="size-5 shrink-0 text-brand-600 transition-transform duration-200 group-data-panel-open:rotate-180"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/** Height-animates via Base UI's `--accordion-panel-height` CSS var (official recipe) — no JS measurement, respects `prefers-reduced-motion` through the sitewide transition-duration override. */
function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        'h-[var(--accordion-panel-height)] overflow-hidden text-sm text-neutral-600 transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0',
        className
      )}
      {...props}
    >
      <div className="px-5 pb-5">{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel }
