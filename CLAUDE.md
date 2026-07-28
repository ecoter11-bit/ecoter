# ECOTER Academy — manuale operativo

Sito di formazione professionale accreditata (sicurezza, qualità, ambiente, antincendio, management). Monorepo **pnpm + Turborepo**:

- `apps/website` — Next.js 16 / React 19, il sito.
- `packages/tokens` (`@ecoter/tokens`) — sorgente di verità dei design token.
- `packages/ui` (`@ecoter/ui`) — libreria componenti + Storybook.
- `packages/config` — **in arrivo** (config condivisa: eslint/tsconfig/tailwind base). Non ancora creato.

Dettagli specifici di ogni package sono nel suo `CLAUDE.md` (letto automaticamente quando si lavora in quella cartella).

## Comandi

```
pnpm --filter <pkg> dev|build|lint|type-check
```

`<pkg>` = `@ecoter/website`, `@ecoter/ui`, `@ecoter/tokens`. Da root, `pnpm dev|build|lint|type-check` delega a Turborepo su tutto il workspace. Se `pnpm`/`turbo` "nudi" non risolvono (corepack non abilitato globalmente), usa `corepack pnpm ...`.

## Regole non negoziabili

1. **Design system = sorgente di verità.** Niente valori hardcoded — colori, spazi, raggi, ombre, font sempre da `@ecoter/tokens` (via classi Tailwind generate dal tema, mai hex/px liberi) e componenti sempre da `@ecoter/ui` quando esistono. Un componente nuovo o una variante nuova nascono nel design system, non ad-hoc dentro una pagina.

2. **Palette canonica — Decision 016.** Tema chiaro. Primary blu istituzionale `#1e3e87`, accento verde teal `#18b096` (usato con parsimonia, non come colore diffuso), neutri grigi caldi. Font: **Plus Jakarta Sans** (titoli), **Inter** (testo), **JetBrains Mono** (codice/dati tecnici). Il Decision Log originale (`#3B82F6` / `#14B86A` / General Sans / IBM Plex Mono) è **superato** — non usarlo come riferimento, non "correggere" verso quei valori.

3. **Accessibilità — baseline WCAG 2.1 AA.** Contrasto colore, focus visibile su ogni elemento interattivo, piena operabilità da tastiera, HTML semantico e ARIA corretto. Non è opzionale né rimandabile a un secondo passaggio.

4. **Next.js 16 è recente.** Prima di toccare config o API di Next, leggi la guida pertinente in `apps/website/node_modules/next/dist/docs/`. Rispetta gli avvisi di deprecazione — non fidarti della memoria di training su Next.

5. **Git.** Un branch per task. Conventional Commits. Un task si chiude solo con lint + type-check + build verdi (per i package toccati).

6. **Estetica.** Evitare il "look da AI" generico (Decision 005). Benchmark qualitativi: Stripe, Vercel, Linear, Notion (Decision 004) — sono un riferimento di livello, non template da copiare 1:1.

## Contesto escluso

`node_modules`, `.next`, `.turbo`, `dist`, `storybook-static`, `*.tsbuildinfo` sono in `.gitignore` (fuori da ricerche/history). `pnpm-lock.yaml` è tracciato ma non va letto né editato a mano — è generato, vedi `.claude/settings.json` (`permissions.deny`). Eccezione deliberata: `node_modules` **non** è bloccato in lettura, perché la regola 4 richiede di leggere `apps/website/node_modules/next/dist/docs/`.

## Subagent disponibili

- **design-reviewer** — dopo ogni modifica UI (componenti, sezioni, pagine): verifica zero hardcode, uso corretto di `@ecoter/ui`, gerarchia visiva, responsive, motion sobrio.
- **a11y-auditor** — dopo ogni modifica UI: audit WCAG 2.1 AA (contrasto, focus, tastiera, ARIA).

Invocali con l'Agent tool passando `subagent_type` col nome esatto. Vedi `.claude/agents/*.md` per lo scope completo.

## Skill di progetto

`ecoter-design-system` — flusso end-to-end per costruire/modificare un componente in `packages/ui` (token → componente → varianti/stati → a11y → storia Storybook). Si autoinvoca quando il task riguarda un componente UI; vedi `.claude/skills/ecoter-design-system/SKILL.md`.
