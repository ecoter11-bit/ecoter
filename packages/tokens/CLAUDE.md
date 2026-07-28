# @ecoter/tokens

Sorgente di verità dei design token. Ogni colore/spazio/raggio/ombra/font/durata usato nel monorepo nasce (o viene documentato) qui — non in `apps/website` o `packages/ui`.

## Regole

- **`theme.css` e i moduli TS in `src/` restano sincronizzati — sempre, stessa modifica.** Non è un codegen, è disciplina: cambi un valore in uno, cambialo nell'altro. `pnpm --filter @ecoter/tokens check-sync` è un tripwire (non un test completo) che verifica che ogni valore letterale esportato da `src/*.ts` compaia in `theme.css` — lancialo dopo ogni modifica ai token.
- **Naming semantico, non solo di scala.** Oltre alle scale numeriche (`brand-500`, `eco-400`, ...) mantieni/estendi gli alias semantici della Decision 016 (`midnight`, `slate`, `ice`, `white`, `technical-green`, `blue`) e i ruoli (`background`, `foreground`, `primary`, `accent`, `muted`, `border`, `ring`). Chi consuma i token deve poter ragionare per ruolo, non per numero di scala.
- **`theme.css` usa `@theme` per valori statici e `@theme inline` solo quando il valore deve puntare a un'altra custom property** (es. i ruoli semantici che risolvono a `:root`, o gli alias Decision 016 che risolvono alle scale esistenti). Non invertire i due: `@theme` non risolve `var()`.
- **Palette e tipografia canoniche = Decision 016** — vedi root `CLAUDE.md`. Sono i valori che il sito già mostra: non esiste più un "target" da rincorrere. Se trovi un valore che non corrisponde a nulla di documentato qui, segnalalo invece di inventare una terza versione.
- Font: solo **nomi**/variabili qui (`typography.ts`, `fontFamily`). Il caricamento vero (next/font) resta responsabilità di `apps/website`.
- z-index: scala semantica in `zIndex.ts` + `theme.css` (`--z-index-*`) — Tailwind non ha un namespace `@theme` per z-index, quindi sono custom property semplici, usabili via valori arbitrari (`z-[var(--z-index-modal)]`), non utility generate.
- Nessuna dipendenza da React/DOM in questo package — è consumato sia da CSS puro sia da JS/motion.
