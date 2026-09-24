# ECO-TER Academy

Monorepo del sito di formazione professionale accreditata ECO-TER Academy (sicurezza sul lavoro, qualità, ambiente, antincendio, management) — pnpm workspaces + Turborepo.

## Struttura

```
apps/
  website/          Sito Next.js 16 / React 19 — @ecoter/website
packages/
  tokens/           Design token, sorgente di verità — @ecoter/tokens
  ui/               Libreria componenti + Storybook — @ecoter/ui
  config/           (in arrivo) config condivisa eslint/tsconfig/tailwind
```

## Comandi

Da root (delega a Turborepo su tutto il workspace):

```
pnpm dev
pnpm build
pnpm lint
pnpm type-check
pnpm build-storybook
```

Su un singolo package:

```
pnpm --filter @ecoter/website dev|build|lint|type-check
pnpm --filter @ecoter/ui storybook|build-storybook|lint|type-check
pnpm --filter @ecoter/tokens lint|type-check
```

Se `pnpm`/`turbo` "nudi" non risolvono sul tuo shell (corepack non abilitato globalmente), usa `corepack pnpm ...`.

## Design system — regola non negoziabile

Niente colori/spazi/raggi/ombre/font hardcoded. Tutto passa da `@ecoter/tokens` (CSS + export TS) e dai componenti `@ecoter/ui`. Vedi [`CLAUDE.md`](./CLAUDE.md) per le regole complete e [`.claude/skills/ecoter-design-system/`](./.claude/skills/ecoter-design-system/SKILL.md) per il workflow di costruzione componenti.

## Documentazione

- [`CLAUDE.md`](./CLAUDE.md) — manuale operativo del monorepo (regole, palette canonica, a11y, git).
- [`apps/website/CLAUDE.md`](./apps/website/CLAUDE.md) — note specifiche del sito Next.js.
- [`packages/tokens/CLAUDE.md`](./packages/tokens/CLAUDE.md) — regole dei design token.
- [`packages/ui/CLAUDE.md`](./packages/ui/CLAUDE.md) — contratto per ogni componente condiviso.

## CI

Ogni push su `master` e ogni pull request eseguono lint, type-check, build e `build-storybook` su tutto il workspace (`.github/workflows/ci.yml`).
