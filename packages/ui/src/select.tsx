import type * as React from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'

import { cn } from './lib/cn'

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

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

type SelectOption = { label: string; value: string }

type SelectProps = {
  items: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  id?: string
  name?: string
  disabled?: boolean
  required?: boolean
  className?: string
} & Pick<
  React.ComponentProps<'button'>,
  'aria-invalid' | 'aria-describedby' | 'aria-required' | 'aria-label'
>

/**
 * Built on `@base-ui/react/select` — a native `<select>` can't be given a
 * custom popup skin consistent with the rest of the design system (options
 * list, highlighted state), so unlike Input/Textarea this one does need the
 * primitive. Exposes a single `items`-driven API (not the full compound
 * Root/Trigger/Popup surface) since every consumer so far just needs a
 * plain labelled dropdown, not a custom composition.
 */
function Select({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Seleziona…',
  id,
  name,
  disabled,
  required,
  className,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
  'aria-required': ariaRequired,
  'aria-label': ariaLabel,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next as string)}
      disabled={disabled}
      required={required}
      name={name}
    >
      <SelectPrimitive.Trigger
        id={id}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        aria-required={ariaRequired}
        aria-label={ariaLabel}
        data-slot="select-trigger"
        className={cn(
          'group flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-input bg-white px-3 text-sm text-neutral-950 transition-colors outline-none',
          'hover:not-data-disabled:bg-neutral-50',
          'data-popup-open:border-ring',
          'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
          'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50',
          'aria-invalid:border-error-500 aria-invalid:focus-visible:border-error-500 aria-invalid:focus-visible:ring-error-500/30',
          className
        )}
      >
        <SelectPrimitive.Value
          className="truncate data-placeholder:text-neutral-600"
          placeholder={placeholder}
        />
        <SelectPrimitive.Icon>
          <ChevronDownIcon className="size-4 shrink-0 text-neutral-500 transition-transform duration-200 group-data-popup-open:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner
          className="outline-none select-none"
          style={{ zIndex: 'var(--z-index-dropdown)' }}
          sideOffset={4}
        >
          <SelectPrimitive.Popup
            className={cn(
              'max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-lg outline-none',
              'transition-[transform,opacity] duration-100 ease-out',
              'data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0'
            )}
          >
            <SelectPrimitive.List>
              {items.map((item) => (
                <SelectPrimitive.Item
                  key={item.value}
                  value={item.value}
                  className="grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 py-2 pr-4 pl-3 text-sm text-neutral-700 outline-none select-none data-highlighted:bg-brand-50 data-highlighted:text-brand-700"
                >
                  <SelectPrimitive.ItemIndicator className="col-start-1 text-brand-600">
                    <CheckIcon className="size-3.5" />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText className="col-start-2">
                    {item.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

export { Select }
export type { SelectOption }
