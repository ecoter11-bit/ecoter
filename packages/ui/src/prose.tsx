import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './lib/cn'

/**
 * Long-form typography wrapper for editorial/legal bodies (privacy policy,
 * cookie policy, and any future page that is mostly running text).
 *
 * Styles its descendants by tag rather than exposing a part per element: the
 * consumer writes plain semantic HTML (`h2`/`p`/`ul`/`strong`/`a`) and gets
 * the site's scale, so a legal text stays readable as markup and its outline
 * stays correct. `@tailwindcss/typography` (`prose`) is deliberately not used
 * — it isn't installed anywhere in the monorepo and its defaults are its own
 * type scale, not this one.
 *
 * Every descendant rule is scoped `:not([data-slot])`. A descendant selector
 * (`.prose a`, specificity 0,1,1) outranks a utility class (0,1,0), so
 * without that guard a `Button`, `Badge` or `Alert` dropped into a body would
 * have its own colors/weights silently overridden — a failure with no error
 * attached. Every component in this package sets `data-slot` on its root, so
 * the exclusion is exact: library components style themselves, bare HTML gets
 * the prose scale.
 *
 * The scale mirrors the website's `CourseMdxContent` element map (the other
 * long-form surface on the site) one step up in the outline: there the body
 * lives under a page `<h2>`, here the sections *are* the page's `<h2>`s. Keep
 * the two in sync if either moves — with one deliberate difference, the link
 * underline (see the links block below).
 */
const proseVariants = cva(
  [
    'text-pretty',
    // Headings — `font-heading` + neutral-950, the site's heading treatment.
    '[&_h2:not([data-slot])]:font-heading [&_h2:not([data-slot])]:font-bold [&_h2:not([data-slot])]:text-neutral-950',
    '[&_h3:not([data-slot])]:font-heading [&_h3:not([data-slot])]:font-bold [&_h3:not([data-slot])]:text-neutral-950',
    // A heading opening the block must not push it off its container's
    // padding — direct children only, so a heading nested inside some other
    // block keeps its rhythm.
    '[&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0',
    // Body
    '[&_p:not([data-slot])]:leading-relaxed [&_p:not([data-slot])]:text-neutral-600',
    '[&_strong:not([data-slot])]:font-semibold [&_strong:not([data-slot])]:text-neutral-950',
    '[&_em:not([data-slot])]:italic',
    // Lists
    '[&_ul:not([data-slot])]:list-disc [&_ol:not([data-slot])]:list-decimal',
    '[&_ul:not([data-slot])]:text-neutral-600 [&_ol:not([data-slot])]:text-neutral-600',
    '[&_ul:not([data-slot])]:marker:text-brand-600 [&_ol:not([data-slot])]:marker:text-brand-600',
    '[&_li:not([data-slot])]:leading-relaxed',
    // Links — underlined (not color alone) so they stay identifiable inside a
    // paragraph. The underline is `brand-600`, not the `brand-300` used in
    // `CourseMdxContent`: at ~1.5:1 against the page that hairline is barely
    // there, and here it is the only cue separating a link from body text for
    // a reader who can't rely on the green/grey hue difference.
    // focus-visible is declared here rather than inherited from the consuming
    // app's base layer, so the state is real in Storybook too.
    '[&_a:not([data-slot])]:rounded-sm [&_a:not([data-slot])]:font-medium [&_a:not([data-slot])]:text-brand-700',
    '[&_a:not([data-slot])]:underline [&_a:not([data-slot])]:decoration-brand-600 [&_a:not([data-slot])]:underline-offset-2',
    '[&_a:not([data-slot])]:transition-colors [&_a:not([data-slot]):hover]:text-brand-800 [&_a:not([data-slot]):hover]:decoration-brand-800',
    '[&_a:not([data-slot]):focus-visible]:outline-2 [&_a:not([data-slot]):focus-visible]:outline-offset-2 [&_a:not([data-slot]):focus-visible]:outline-ring',
    // A link inside `<strong>` keeps the bold: the `a` rule and the `strong`
    // rule have equal specificity and the `a` is the matched element, so
    // without this the emphasis is silently dropped to `font-medium`.
    '[&_strong_a:not([data-slot])]:font-semibold',
    // Rules
    '[&_hr:not([data-slot])]:border-neutral-200',
  ],
  {
    variants: {
      size: {
        /** Page body — the reading size for a full legal/editorial page. */
        default: [
          'text-base',
          '[&_h2:not([data-slot])]:mt-10 [&_h2:not([data-slot])]:mb-4 [&_h2:not([data-slot])]:text-2xl',
          '[&_h3:not([data-slot])]:mt-8 [&_h3:not([data-slot])]:mb-3 [&_h3:not([data-slot])]:text-lg',
          '[&_p:not([data-slot])]:mb-4',
          '[&_ul:not([data-slot])]:mb-4 [&_ol:not([data-slot])]:mb-4',
          '[&_ul:not([data-slot])]:space-y-1.5 [&_ol:not([data-slot])]:space-y-1.5',
          '[&_ul:not([data-slot])]:pl-5 [&_ol:not([data-slot])]:pl-5',
          '[&_hr:not([data-slot])]:my-10',
        ],
        /** Fine print — same scale one step down (inline notes, excerpts). */
        sm: [
          'text-sm',
          '[&_h2:not([data-slot])]:mt-8 [&_h2:not([data-slot])]:mb-3 [&_h2:not([data-slot])]:text-lg',
          '[&_h3:not([data-slot])]:mt-6 [&_h3:not([data-slot])]:mb-2 [&_h3:not([data-slot])]:text-base',
          '[&_p:not([data-slot])]:mb-3',
          '[&_ul:not([data-slot])]:mb-3 [&_ol:not([data-slot])]:mb-3',
          '[&_ul:not([data-slot])]:space-y-1 [&_ol:not([data-slot])]:space-y-1',
          '[&_ul:not([data-slot])]:pl-4 [&_ol:not([data-slot])]:pl-4',
          '[&_hr:not([data-slot])]:my-8',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

type ProseProps = React.ComponentPropsWithRef<'div'> &
  VariantProps<typeof proseVariants>

function Prose({ size, className, children, ref, ...props }: ProseProps) {
  return (
    <div
      ref={ref}
      data-slot="prose"
      className={cn(proseVariants({ size, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

type ProseColophonProps = React.ComponentPropsWithRef<'p'>

/**
 * Closing line of a long-form document — "Ultimo aggiornamento: …", a source
 * note, a version stamp. A part rather than a bare `<p>` in each page,
 * because the treatment (rule above it, one step down in size) is the same
 * wherever it appears and would otherwise be re-typed per page.
 *
 * Fine print at both `Prose` sizes: it is the one line in the document that
 * shouldn't compete with the body, so it stays `text-sm` in the `sm` variant
 * too. Italic by class rather than by wrapping the text in `<em>`: it is
 * metadata, not stressed emphasis — the look is the same, the semantics are
 * honest.
 */
function ProseColophon({
  className,
  children,
  ref,
  ...props
}: ProseColophonProps) {
  return (
    <p
      ref={ref}
      data-slot="prose-colophon"
      className={cn(
        'mt-10 border-t border-neutral-200 pt-6 text-sm leading-relaxed text-neutral-600 italic',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export { Prose, ProseColophon, proseVariants }
export type { ProseProps, ProseColophonProps }
