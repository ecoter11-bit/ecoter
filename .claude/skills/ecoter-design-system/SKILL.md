---
name: ecoter-design-system
description: >
  Use whenever building or modifying a UI component for ECOTER Academy — a new
  component in packages/ui, a new variant/state on an existing one, or any
  page/section change in apps/website that touches visual styling. Enforces
  the token → component → variants/states → a11y → Storybook workflow,
  naming conventions, the canonical palette/typography (Decision 016), motion
  rules, and aesthetic do/don't. Also use when asked to "add a component",
  "add a variant", "restyle X", or when reviewing whether existing UI code
  is design-system compliant.
---

# ECOTER design system — how to build a component here

This is the operating procedure for `packages/ui` and any styling work in `apps/website`. Read root `CLAUDE.md` first for the non-negotiable rules; this skill is the how-to.

## The five-step build order

Do these **in order**. Don't write variant styling before the token exists; don't write a story before the states are real.

1. **Token first.** Check `packages/tokens/src/colors.ts` (+ `radii.ts`, `shadows.ts`, `spacing.ts`, `motion.ts`, `typography.ts`) and `packages/tokens/theme.css` for what you need. If it's missing, add it there — both the CSS (`@theme` or `@theme inline`, matching the existing pattern) and the TS export, in the same change. Never invent a one-off hex/px value at the component level.
2. **Component anatomy.** Root element + parts, typed props, `data-slot="component-name"` on the root (and on parts, if the component has them) so styling and testing can target it from outside without fragile selectors. Prefer an accessible headless primitive (`@base-ui/react`) over building interaction behavior from scratch.
3. **Variants & sizes via `cva`.** One `cva(...)` call defining `variants` (e.g. `variant`, `size`) and `defaultVariants`, exactly like `packages/ui/src/button.tsx`. Compose classes with the local `cn()` (`packages/ui/src/lib/cn.ts`), not string concatenation.
4. **States are real CSS, not props-that-fake-it.** `hover:`, `focus-visible:`, `disabled:`, `active:`, `aria-invalid:` as Tailwind variants on the component's own classes. Never ship a component whose "hover state" only exists in a Storybook story via an extra className — if it's not triggered by the real pseudo-class/attribute, it doesn't count.
5. **A11y, then Storybook — not the other way round.** Get real keyboard/focus/contrast behavior working first (see `a11y-auditor` subagent), then write the story to demonstrate it. A story is documentation of behavior that already works, not a substitute for it.

## Storybook story checklist

Every component needs, at minimum:
- A `Default` story with sensible default args.
- An `AllVariants` (or equivalently named) story showing every `variant`.
- An `AllSizes` story if the component has a `size` axis.
- A `Disabled` story if the component supports it.
- Real interactivity for hover/focus — don't build a fake "focus" story with manual classes; a short comment pointing out that Tab/hover on the live story demonstrates it is enough.
- `parameters.layout` set appropriately (`centered` for small standalone components).

Storybook config lives in `packages/ui/.storybook/`; styling comes from `packages/ui/src/styles.css` (`@import 'tailwindcss'; @import '@ecoter/tokens/theme.css';`) — a component that looks right in Storybook looks right on the site, because it's the same theme file.

## Canonical palette & typography (rebrand 2026-07-31 — supersedes Decision 016, which itself superseded the original Decision Log)

| Role | Value |
|---|---|
| Primary | action green — canonical `#6fb933` (logo/decorative only); `brand-600` `#4a7c22` for text/buttons/links (the lightest stop that clears WCAG AA on white — pure `#6fb933` is ~2.4:1) |
| Secondary | blue `#185fad` — "sicurezza" category family |
| Accent | teal `#388081` — **sparingly**, not as a general-purpose color (categoria "sistemi di gestione"/"qualità") |
| Accent (decorative) | oro/ambra, derived from `#FFF200` — "management" category, badges, underlines, step numerals |
| Ink | `#313132` — real corporate text color (verified on sicurezzalavoroeambiente.it) |
| Neutrals | warm grays (see `packages/tokens/src/colors.ts` `neutral` scale) |
| Theme | light only — there is no dark mode (`@custom-variant dark (&:is(.dark-never *))` in `globals.css` is intentional) |
| Headings | Plus Jakarta Sans |
| Body | Inter |
| Mono | JetBrains Mono |

All colors extracted from the parent company's live site (sicurezzalavoroeambiente.it) and its official logo (`Ecoter-logo-01.svg`) — see `packages/tokens/src/colors.ts` for the full per-stop contrast rationale. Do **not** use `#3B82F6` / `#14B86A` / General Sans / Sora / IBM Plex Mono (original Decision Log) nor `#1e3e87` / `#18b096` (Decision 016) as targets — both are superseded. If you find code or a comment referencing either as the goal, flag it, don't "fix" current code toward them.

## Motion

Use `packages/tokens/src/motion.ts` (`duration`, `easing`) — don't hand-write `transition-duration`/`cubic-bezier` values. Default to `duration.normal` / `ease-standard` for UI micro-interactions; reserve `deliberate`/`spring` for hero-level moments, not routine hovers. Always respect `prefers-reduced-motion` (handled globally — don't bypass it with inline styles or JS-driven animation that ignores the media query).

## Aesthetic do/don't (Decision 004 & 005)

- **Benchmark, don't clone.** Stripe/Vercel/Linear/Notion are a bar for craft and restraint — reference for *quality*, never copy their layouts/components verbatim.
- **Avoid the "AI look"** (Decision 005): no gratuitous gradients-on-everything, no glowing/floating blobs for decoration's sake, no excessive rounded-everything + soft-shadow-everything combo applied uniformly regardless of context, no emoji-as-icons in production UI, no center-everything layouts that ignore real content hierarchy.
- One primary action per view. If two buttons look equally important, that's a hierarchy bug, not a design choice.
- Teal (`eco`) is a signal (success, "go", accreditation, "sistemi di gestione"), not a decoration — if more than ~10% of a view is teal, that's very likely a misuse. Green (`brand`) is different post-rebrand: it's the primary action color, used broadly (buttons, links, hero accents) — that's intentional, not the pre-rebrand "sparingly" rule.

## Naming

- Token names are semantic (`primary`, `foreground`, `midnight`, `technical-green`), not positional (`blue-1`, `dark-color`). See `packages/tokens/CLAUDE.md`.
- Component files/exports: `PascalCase` component, `camelCase` variant function (`buttonVariants`), one component's public surface per file, re-exported from `packages/ui/src/index.ts`.

## When you're done

Run `pnpm --filter @ecoter/ui lint`, `pnpm --filter @ecoter/ui type-check`, and open the story in `pnpm --filter @ecoter/ui storybook` to look at it — don't declare a component finished from reading the code alone. Then consider dispatching `design-reviewer` and `a11y-auditor` before calling the task done.
