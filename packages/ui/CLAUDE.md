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

`pnpm --filter @ecoter/ui storybook` (dev) / `build-storybook`. Framework `@storybook/react-vite`, styling via lo stesso `@tailwindcss/postcss` del sito (vedi `postcss.config.mjs`). Addon `a11y` sempre attivo — un finding non va mai ignorato in silenzio (il contrasto della variante `destructive` era un debito noto, risolto: usa `text-destructive-muted-foreground`, non `text-destructive`, su `bg-destructive/10`).

## Ricetta colore per componenti a stato (solid/soft/outline × colore semantico)

Fissata con `badge.tsx` — riusala per il prossimo componente con la stessa forma (variante stile × colore semantico), non ri-derivare i contrasti da zero:

- **solid**: bg allo stop più scuro che passa AA su testo bianco (spesso `-600`/`-700`, non `-400`/`-500` — es. `eco-400` è ~2.7:1, `eco-600` è ~5.8:1), `text-white`, hover `brightness-90` (uniforme su tutti i colori, non serve uno stop più scuro dedicato per ognuno).
- **soft**: bg allo stop `-50` (tinta), testo allo stop più chiaro che passa comunque AA (`-600` o `-700` a seconda del colore). **Hover: `brightness-95`, non uno stop di bg più scuro** (es. `hover:bg-*-100`) — su warning/amber lo stop successivo scende sotto 4.5:1 (verificato: 4.75 → 4.42).
- **outline**: bg bianco, bordo allo stop `-500`/`-600` (mai `-100`/`-200` — non passano mai i 3:1 richiesti da SC 1.4.11 per i confini di componenti UI: `neutral-200` è ~1.36:1), testo stesso stop di soft (contrasto su bianco è sempre ≥ contrasto su tinta `-50`).
- **focus-visible**: `border-ring` (bordo pieno, non traslucido) + `ring-2 ring-ring/50` come glow supplementare — il ring da solo a opacità 50% è ~1.9:1 e non basta da solo per SC 1.4.11; il bordo pieno con `--ring` è ~4.4:1 su bianco. **Eccezioni**: se il bordo a riposo è già `--ring` (es. `outline-brand` di `button.tsx`), al focus il bordo non cambia e resterebbe solo il glow al 50%: lì il ring va pieno (`focus-visible:ring-ring`, ~5:1 su bianco). Su un bottone pieno dello stesso verde (`default`) il bordo sparisce nel fondo: ring pieno staccato di 2px (`focus-visible:ring-ring focus-visible:ring-offset-2`). E per togliere il contorno nativo si usa `focus-visible:outline-hidden`, non `outline-none`: in Tailwind v4 `outline-hidden` lascia un contorno trasparente che in modalità a contrasto elevato (forced colors) diventa visibile, e lì serve perché il ring (un box-shadow) sparisce. Va limitato a `focus-visible:`, altrimenti in quella modalità il contorno resta acceso anche a riposo e il focus non si distingue più.

Verifica sempre i contrasti sui valori hex reali in `@ecoter/tokens` (non fidarti della posizione nella scala) — vedi `packages/ui/src/badge.tsx` per il calcolo commentato inline.

## Cosa NON fare

- Non importare nulla da `apps/website` (la dipendenza va nell'altro verso).
- Non aggiungere una nuova libreria di icone/animazione senza verificare che non duplichi qualcosa già usato dal sito.
- Non pubblicare (`build`) finché non serve davvero fuori dal monorepo — oggi Next/Turbopack e Vite consumano il sorgente TS direttamente.
