import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'

import { cn } from './lib/cn'

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

type CheckboxProps = CheckboxPrimitive.Root.Props & {
  /** The checkbox is always rendered inside its own `<label>` — pass the label content here rather than wrapping `Checkbox` yourself, so the click/tap target always includes the text (WCAG 2.5.5) and no separate `htmlFor` wiring is needed. */
  label: React.ReactNode
  labelClassName?: string
}

/** Built on `@base-ui/react/checkbox` for the same reason as Accordion — a fully custom-styled control (brand-600 checked state, custom check glyph) still needs real `role="checkbox"`/keyboard semantics, which the primitive provides. */
function Checkbox({
  className,
  labelClassName,
  label,
  id,
  ...props
}: CheckboxProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'flex items-start gap-2.5 text-sm text-neutral-700 select-none',
        labelClassName
      )}
    >
      <CheckboxPrimitive.Root
        id={inputId}
        data-slot="checkbox"
        className={cn(
          // `border-neutral-500` (not the `border-input`/neutral-200 token) —
          // a checkbox's resting boundary is a UI-component boundary (SC
          // 1.4.11, needs ≥3:1); neutral-200/300/400 all measure <3:1 against
          // white (verified against packages/tokens/src/colors.ts hexes:
          // 200≈1.36:1, 300≈1.77:1, 400≈2.56:1), only 500+ clears it (≈3.95:1).
          'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-neutral-500 bg-white text-white transition-colors outline-none',
          'hover:not-data-disabled:border-neutral-600',
          'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
          'data-checked:border-brand-600 data-checked:bg-brand-600',
          // Checked + focused: the resting checked border and `--ring` are
          // the same brand-600 hex, so the default focus ring (which relies
          // on the border-color *change* for its contrast) is invisible on
          // an already-checked box. Force a full-opacity, thicker ring for
          // this compound state so focus stays perceivable (SC 2.4.7).
          'data-checked:focus-visible:ring-4 data-checked:focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:border-error-500',
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex data-unchecked:hidden">
          <CheckIcon className="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span>{label}</span>
    </label>
  )
}

export { Checkbox }
