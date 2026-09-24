<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Il sito

Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4 + MDX + framer-motion. `@ecoter/website` nel workspace pnpm.

- `src/app/` — route: home, catalogo, schede corso, manifest/robots/sitemap. Il catalogo è fatto di pagine statiche: `/corsi` (scelta dell'area) → `/corsi/area/[area]` (Sicurezza: le sotto-aree; le altre aree: l'elenco dei corsi) → `/corsi/area/[area]/[sottoarea]` (elenco dei corsi). Gli indirizzi si costruiscono solo con `src/lib/catalog.ts`. Niente stato del catalogo nei parametri dell'URL: in produzione `router.replace`/`push` che cambiano solo i parametri della stessa pagina statica non vengono applicati (in `next dev` sì) — per navigare usare link a pagine vere; se serve aggiornare i parametri, l'API History nativa (`window.history.replaceState`). Verificare sempre anche con `next build` + `next start`.
- `src/components/sections/` — blocchi delle pagine. La home è essenziale (MODIFICHE del 23/09/2026): `HeroSection` (un ingresso per area + sito del gruppo) → `CorsiInCalendarioSection` (per ora "date in arrivo": le card delle edizioni andranno lì quando ci saranno le date) → `CtaFinaleSection`. Aree formative, "Perché ECOTER", "Come funziona", anteprima FAQ e vetrina "Corsi in evidenza" (con `featured-courses.json`) sono state tolte: se servissero di nuovo, sono nella storia git prima del merge di `feat/home-essenziale`.
- `src/components/layout/`, `src/components/catalog/`, `src/components/course/` — layout, catalogo, card corso.
- Header (`src/components/layout/Header.tsx`): voci da `mainNav` in `src/config/nav.ts` (Soluzioni Aziendali · Chi Siamo · FAQ · Contatti, uguali nel menu mobile), niente mega menu. Menu mobile e ricerca usano il `Dialog` di `@ecoter/ui` (focus intrappolato, Esc, ritorno del focus): non rifare finestre modali a mano.
- Ricerca dei corsi: `buildSearchIndex()` (`src/lib/content/search.ts`) → servito statico da `src/app/search-index.json/route.ts` (`force-static`, generato al build) → cercato nel browser da `searchCourseIndex()` (`src/lib/course-search.ts`, modulo puro importabile dai client component). Nessun servizio esterno.
- `src/lib/content/` + `content/` alla radice del package — corsi/categorie/sotto-aree come MDX + JSON, validati da `src/lib/validation/*.schema.ts` (zod). Le **sotto-aree** (`content/subcategories/`) esistono solo per `sicurezza`: la sotto-area di un corso si deriva dal prefisso del `code` di catalogo (A-F) in `src/lib/content/subcategory-mapping.ts`, salvo `subcategory` esplicita in frontmatter; `pnpm validate` verifica che ogni corso di sicurezza ne abbia esattamente una.
- `scripts/validate-content.ts` (`pnpm validate`) e `scripts/build-search-index.ts` (`pnpm build:search`) — rigenerano `content/generated/`. Quella copia dell'indice di ricerca è solo un'istantanea: il sito usa `/search-index.json`, generato a ogni build.
- Tema **chiaro, dark mode disabilitato** (`@custom-variant dark (&:is(.dark-never *))` in `globals.css` — non è un residuo, è intenzionale).

## Design system

`globals.css` importa `@ecoter/tokens/theme.css` — non aggiungere qui nuovi colori/raggi/ombre, vanno in `packages/tokens`. Il `Button` (e ogni componente condiviso) vive in `@ecoter/ui`; se serve un componente nuovo condivisibile, costruiscilo lì (skill `ecoter-design-system`), non dentro `src/components`.

## Font

`layout.tsx` carica Plus Jakarta Sans / Inter / JetBrains Mono via `next/font/google` (variabili `--font-display` / `--font-body` / `--font-mono`). Questi sono i font canonici (Decision 016) — non introdurne altri senza motivo esplicito.
