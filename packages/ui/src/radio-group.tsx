import type * as React from 'react'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './lib/cn'

const radioOptionVariants = cva(
  'flex cursor-pointer items-start gap-2.5 text-sm text-neutral-700 select-none has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50',
  {
    variants: {
      variant: {
        /** Bare control + text, for a group sitting inside an already-bordered field. */
        plain: '',
        /**
         * Selectable card — the whole box is the target (WCAG 2.5.5). Resting
         * border is `neutral-500`, not `neutral-200`: it's a UI-component
         * boundary (SC 1.4.11, ≥3:1), same reasoning as `checkbox.tsx`.
         */
        card: 'rounded-lg border border-neutral-500 bg-white p-3.5 transition-colors hover:not-has-data-disabled:bg-neutral-50 has-data-checked:border-brand-600 has-data-checked:bg-brand-50',
      },
    },
    defaultVariants: {
      variant: 'plain',
    },
  }
)

type RadioOption = {
  value: string
  label: React.ReactNode
  /** Secondary line under the label — keep it short, it's part of the same click target. */
  description?: React.ReactNode
  disabled?: boolean
}

type RadioGroupProps = {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  disabled?: boolean
  required?: boolean
  /** `horizontal` only wraps on narrow viewports — the arrow-key order the primitive exposes is the DOM order either way. */
  orientation?: 'vertical' | 'horizontal'
  className?: string
  itemClassName?: string
} & VariantProps<typeof radioOptionVariants> &
  Pick<
    React.ComponentProps<'div'>,
    'id' | 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'aria-invalid'
  >

/**
 * Built on `@base-ui/react/radio-group` + `radio` — a radio group is exactly
 * the case where the primitive earns its keep: roving tabindex, arrow-key
 * selection and `role="radiogroup"`/`role="radio"` semantics are easy to get
 * subtly wrong by hand, and a native `<input type="radio">` can't carry the
 * card-shaped checked state this design system wants.
 *
 * Deliberately *not* labelled by the component itself: a `<label htmlFor>`
 * can't name a `role="radiogroup"` container, so the consumer wraps it in a
 * `<fieldset>`/`<legend>` (or any labelled element) and passes
 * `aria-labelledby` — see `OrderForm.tsx` in the website.
 */
function RadioGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  disabled,
  required,
  orientation = 'vertical',
  variant = 'plain',
  className,
  itemClassName,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      id={id}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next as string)}
      name={name}
      disabled={disabled}
      required={required}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-invalid={ariaInvalid}
      data-slot="radio-group"
      className={cn(
        'group flex gap-2.5',
        orientation === 'horizontal'
          ? 'flex-col sm:flex-row sm:flex-wrap'
          : 'flex-col',
        className
      )}
    >
      {options.map((option) => (
        <label
          key={option.value}
          data-slot="radio-option"
          className={cn(
            radioOptionVariants({ variant }),
            orientation === 'horizontal' && variant === 'card' && 'sm:flex-1',
            itemClassName
          )}
        >
          <RadioPrimitive.Root
            value={option.value}
            disabled={option.disabled}
            data-slot="radio"
            className={cn(
              // `border-input`, come il checkbox: è il confine a riposo di un
              // controllo form, non un separatore — SC 1.4.11 chiede ≥3:1 e il
              // token risolve a neutral-500 (≈3.95:1 su bianco).
              'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-input bg-white transition-colors outline-none',
              'hover:not-data-disabled:border-neutral-600',
              'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
              'data-checked:border-brand-600 data-checked:bg-brand-600',
              /* Checked + focused: the resting checked border and `--ring` are
               * the same brand-600 hex, so a ring that relies on the border
               * *change* for its contrast disappears on an already-selected
               * radio. Force a full-opacity, thicker ring for that compound
               * state so focus stays perceivable (SC 2.4.7) — same fix as
               * `checkbox.tsx`. */
              'data-checked:focus-visible:ring-4 data-checked:focus-visible:ring-ring',
              'data-disabled:cursor-not-allowed',
              /* `aria-invalid` lives on the group container (a radio group is
               * invalid as a whole, never one option), so the error boundary
               * is inherited from it rather than set on each control. */
              'group-aria-invalid:border-error-500'
            )}
          >
            <RadioPrimitive.Indicator className="size-2 rounded-full bg-white data-unchecked:hidden" />
          </RadioPrimitive.Root>
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="font-medium text-neutral-950">{option.label}</span>
            {option.description && (
              <span className="text-xs text-neutral-600">
                {option.description}
              </span>
            )}
          </span>
        </label>
      ))}
    </RadioGroupPrimitive>
  )
}

export { RadioGroup, radioOptionVariants }
export type { RadioOption }
