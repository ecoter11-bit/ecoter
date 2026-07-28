# @ecoter/tokens

Sorgente di verità dei design token. Ogni colore/spazio/raggio/ombra/font/durata usato nel monorepo nasce (o viene documentato) qui — non in `apps/website` o `packages/ui`.

## Regole

- **`theme.css` e i moduli TS in `src/` restano sincronizzati.** Non esiste (ancora) un codegen: se cambi un valore in uno, cambialo anche nell'altro nella stessa modifica. Non lasciarli divergere.
- **Naming semantico, non solo di scala.** Oltre alle scale numeriche (`brand-500`, `eco-400`, ...) mantieni/estendi gli alias semantici della Decision 016 (`midnight`, `slate`, `ice`, `white`, `technical-green`, `blue`) e i ruoli (`background`, `foreground`, `primary`, `accent`, `muted`, `border`, `ring`). Chi consuma i token deve poter ragionare per ruolo, non per numero di scala.
- **`theme.css` usa `@theme` per valori statici e `@theme inline` solo quando il valore deve puntare a un'altra custom property** (es. i ruoli semantici che risolvono a `:root`, o gli alias Decision 016 che risolvono alle scale esistenti). Non invertire i due: `@theme` non risolve `var()`.
- **Palette canonica = Decision 016**, non il Decision Log originale (superato) — vedi CLAUDE.md di root. Se trovi un valore che non corrisponde né all'uno né all'altro, segnalalo invece di "correggerlo" silenziosamente.
- Font: solo **nomi**/variabili qui (`typography.ts`). Il caricamento vero (next/font) resta responsabilità di `apps/website`.
- Nessuna dipendenza da React/DOM in questo package — è consumato sia da CSS puro sia da JS/motion.
