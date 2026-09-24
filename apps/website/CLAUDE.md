<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Il sito

Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4 + MDX + framer-motion. `@ecoter/website` nel workspace pnpm.

- `src/app/` — route: home, catalogo, schede corso, manifest/robots/sitemap. Il catalogo è fatto di pagine statiche: `/corsi` (scelta dell'area) → `/corsi/area/[area]` (Sicurezza: le sotto-aree; le altre aree: l'elenco dei corsi) → `/corsi/area/[area]/[sottoarea]` (elenco dei corsi). Gli indirizzi si costruiscono solo con `src/lib/catalog.ts`. Niente stato del catalogo nei parametri dell'URL: in produzione `router.replace`/`push` che cambiano solo i parametri della stessa pagina statica non vengono applicati (in `next dev` sì) — per navigare usare link a pagine vere; se serve aggiornare i parametri, l'API History nativa (`window.history.replaceState`). Verificare sempre anche con `next build` + `next start`.
- `src/components/sections/` — blocchi delle pagine. La home è solo la hero (MODIFICHE del 23 e del 24/09/2026): `HeroSection` con la scritta "Scopri i nostri corsi" (h2 che dà il nome alla lista), i tre bottoni verdi delle aree (`AreaLinkTile`) e "Visita il sito di ECO-TER". "Corsi in calendario" è diventata la pagina `/calendario-corsi` (per ora "date in arrivo": le edizioni andranno lì quando ci saranno le date). La fascia `CtaFinaleSection` è stata tolta solo dalla home: resta su Chi Siamo, FAQ e Aziende e professionisti. Aree formative, "Perché ECO-TER", "Come funziona", anteprima FAQ e vetrina "Corsi in evidenza" (con `featured-courses.json`) sono state tolte: se servissero di nuovo, sono nella storia git prima del merge di `feat/home-essenziale`.
- `src/components/layout/`, `src/components/catalog/`, `src/components/course/` — layout, catalogo, card corso.
- Header (`src/components/layout/Header.tsx`): voci da `mainNav` in `src/config/nav.ts` (Calendario corsi · Aziende e professionisti · Chi Siamo · FAQ · Contatti, uguali nel menu mobile; la pagina "Aziende e professionisti" sta su `/soluzioni/aziende`), niente mega menu. Le voci stanno nell'header da `xl` (1280px) in su, sotto c'è il menu mobile; il campo di ricerca c'è da `lg` in su (il suggerimento "Ctrl K" solo sotto `xl`), sotto resta l'icona. Da `xl` la riga dell'header ha 1120px, ~1100 con la barra di scorrimento classica di Windows, e oggi ne usa ~1080: se aggiungi o allunghi una voce, riprova a 1280px con la barra visibile. Menu mobile e ricerca usano il `Dialog` di `@ecoter/ui` (focus intrappolato, Esc, ritorno del focus): non rifare finestre modali a mano.
- Il nome è **ECO-TER Academy**, con il trattino (MODIFICHE del 24/09/2026), in testi, metadati ed email; la casa madre è ECO-TER Srl. I link al sito della casa madre dicono "Visita il sito di ECO-TER".
- Ricerca dei corsi: `buildSearchIndex()` (`src/lib/content/search.ts`) → servito statico da `src/app/search-index.json/route.ts` (`force-static`, generato al build) → cercato nel browser da `searchCourseIndex()` (`src/lib/course-search.ts`, modulo puro importabile dai client component). Nessun servizio esterno.
- `src/lib/content/` + `content/` alla radice del package — corsi/categorie/sotto-aree come MDX + JSON, validati da `src/lib/validation/*.schema.ts` (zod). Le **sotto-aree** (`content/subcategories/`) esistono solo per `sicurezza`: la sotto-area di un corso si deriva dal prefisso del `code` di catalogo (A-F) in `src/lib/content/subcategory-mapping.ts`, salvo `subcategory` esplicita in frontmatter; `pnpm validate` verifica che ogni corso di sicurezza ne abbia esattamente una.
- `scripts/validate-content.ts` (`pnpm validate`) e `scripts/build-search-index.ts` (`pnpm build:search`) — rigenerano `content/generated/`. Quella copia dell'indice di ricerca è solo un'istantanea: il sito usa `/search-index.json`, generato a ogni build.
- Tema **chiaro, dark mode disabilitato** (`@custom-variant dark (&:is(.dark-never *))` in `globals.css` — non è un residuo, è intenzionale).

## Design system

`globals.css` importa `@ecoter/tokens/theme.css` — non aggiungere qui nuovi colori/raggi/ombre, vanno in `packages/tokens`. Il `Button` (e ogni componente condiviso) vive in `@ecoter/ui`; se serve un componente nuovo condivisibile, costruiscilo lì (skill `ecoter-design-system`), non dentro `src/components`.

## Font

`layout.tsx` carica Plus Jakarta Sans / Inter / JetBrains Mono via `next/font/google` (variabili `--font-display` / `--font-body` / `--font-mono`). Questi sono i font canonici (Decision 016) — non introdurne altri senza motivo esplicito.
