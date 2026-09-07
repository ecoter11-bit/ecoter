<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Il sito

Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4 + MDX + framer-motion. `@ecoter/website` nel workspace pnpm.

- `src/app/` — route: home, `/corsi` (catalogo, con `CatalogClient.tsx` lato client), manifest/robots/sitemap.
- `src/components/sections/` — blocchi di homepage (Hero, WhyEcoter, AreaFormative, FaqPreview, CtaFinale, ...).
- `src/components/layout/`, `src/components/catalog/`, `src/components/course/` — layout, catalogo, card corso.
- `src/lib/content/` + `content/` alla radice del package — corsi/categorie/sotto-aree come MDX + JSON, validati da `src/lib/validation/*.schema.ts` (zod). Le **sotto-aree** (`content/subcategories/`) esistono solo per `sicurezza`: la sotto-area di un corso si deriva dal prefisso del `code` di catalogo (A-F) in `src/lib/content/subcategory-mapping.ts`, salvo `subcategory` esplicita in frontmatter; `pnpm validate` verifica che ogni corso di sicurezza ne abbia esattamente una.
- `scripts/validate-content.ts` (`pnpm validate`) e `scripts/build-search-index.ts` (`pnpm build:search`) — rigenerano `content/generated/`.
- Tema **chiaro, dark mode disabilitato** (`@custom-variant dark (&:is(.dark-never *))` in `globals.css` — non è un residuo, è intenzionale).

## Design system

`globals.css` importa `@ecoter/tokens/theme.css` — non aggiungere qui nuovi colori/raggi/ombre, vanno in `packages/tokens`. Il `Button` (e ogni componente condiviso) vive in `@ecoter/ui`; se serve un componente nuovo condivisibile, costruiscilo lì (skill `ecoter-design-system`), non dentro `src/components`.

## Font

`layout.tsx` carica Plus Jakarta Sans / Inter / JetBrains Mono via `next/font/google` (variabili `--font-display` / `--font-body` / `--font-mono`). Questi sono i font canonici (Decision 016) — non introdurne altri senza motivo esplicito.
