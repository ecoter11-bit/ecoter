# @ecoter/ui

Libreria componenti condivisa + Storybook. Consumata da `apps/website` via `workspace:*`.

## Contratto per ogni componente (nessuna eccezione)

Un componente non è "fatto" finché non ha tutti e cinque:

1. **Anatomia** — struttura chiara (root + parti), props tipizzate, `data-slot` dove utile per lo styling da fuori.
2. **Varianti e dimensioni** — via `class-variance-authority` (`cva`), come `button.tsx`. Niente combinazioni di classi improvvisate nel componente consumatore.
3. **Stati** — hover, focus-visible, disabled (e active/aria-invalid dove pertinente) espressi come vere pseudo-classi/attributi CSS nel componente, mai simulati altrove.
4. **A11y** — primitive accessibili (`@base-ui/react` dove possibile), semantica corretta, contrasto verificato (vedi subagent `a11y-auditor`).
5. **Storia Storybook** — almeno: variante di default, tutte le varianti, tutte le dimensioni, stato disabled. Hover/focus si verificano interagendo dal vivo con la storia, non vanno "finti" con classi extra.

## Solo token

Zero valori hardcoded. Ogni colore/spazio/raggio/ombra è una classe Tailwind che risolve a `@ecoter/tokens` (via `@ecoter/tokens/theme.css`, importato in `.storybook/preview.ts` tramite `src/styles.css`). Se il token che serve non esiste, va aggiunto in `packages/tokens` — non inventato qui con un valore arbitrario.

## Storybook

`pnpm --filter @ecoter/ui storybook` (dev) / `build-storybook`. Framework `@storybook/react-vite`, styling via lo stesso `@tailwindcss/postcss` del sito (vedi `postcss.config.mjs`). Addon `a11y` sempre attivo — un finding non è automaticamente un bug da fixare subito (es. il contrasto della variante `destructive` è un debito noto, tracciato per la Fase 2), ma va sempre guardato, non ignorato in silenzio.

## Cosa NON fare

- Non importare nulla da `apps/website` (la dipendenza va nell'altro verso).
- Non aggiungere una nuova libreria di icone/animazione senza verificare che non duplichi qualcosa già usato dal sito.
- Non pubblicare (`build`) finché non serve davvero fuori dal monorepo — oggi Next/Turbopack e Vite consumano il sorgente TS direttamente.
