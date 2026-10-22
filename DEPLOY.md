# Deploy

Guida per pubblicare `apps/website` (ECO-TER Academy, Next.js 16) da questo monorepo pnpm + Turborepo.

- **Repository:** [`ecoter11-bit/ecoter`](https://github.com/ecoter11-bit/ecoter), **pubblico**.
- **Hosting:** Netlify, configurato nel repo con [`netlify.toml`](./netlify.toml) (radice). Sito in produzione: https://ecoteracademy.it.

Il sito è servito come app Next.js completa:

- **statiche su CDN:** home, catalogo (`/corsi`, aree, sotto-aree, percorsi), schede corso, `/contatti`, `/calendario-corsi`, le altre pagine informative, `sitemap.xml`, `robots.txt`, `search-index.json`;
- **dinamiche (Netlify Functions):** le pagine `/ottieni-corso` e `/richiedi-informazioni` (leggono `?corso=<slug>`) e le API `POST /api/contatti` e `POST /api/ottieni-corso`.

> **Il repo deve restare pubblico.** Con il piano Free di Netlify i deploy da un repo **privato** sono limitati a un solo contributor: i push di altre persone non verrebbero pubblicati. Se il repo diventasse privato, serve un piano Netlify a pagamento.

---

## 1. Import del repository

1. Vai su [app.netlify.com](https://app.netlify.com) → accedi con l'account del team.
2. **Add new project → Import an existing project** → collega GitHub → seleziona `ecoter11-bit/ecoter`.
3. Se Netlify chiede quale progetto del monorepo pubblicare, seleziona **`apps/website`** (`@ecoter/website`). La base directory resta comunque la radice del repo (vedi sotto).
4. Nello step delle build settings **non toccare nulla**: build command, publish directory e versione di Node arrivano da `netlify.toml` e hanno la precedenza sui valori della UI.

## 2. Cosa fa `netlify.toml`

| Impostazione | Valore | Perché |
|---|---|---|
| **Base directory** | radice del repo (default, non impostata) | Netlify sceglie il package manager dal lockfile presente nella base directory. `pnpm-lock.yaml` e `pnpm-workspace.yaml` stanno in radice: puntare la base su `apps/website` farebbe ricadere l'install su `npm install` e romperebbe le dipendenze `workspace:*` (`@ecoter/ui`, `@ecoter/tokens`) |
| **Build command** | `pnpm turbo run build --filter=@ecoter/website` | Turborepo costruisce il sito e, a monte, le sue dipendenze di workspace |
| **Publish directory** | `apps/website/.next` | Relativa alla base directory. Il Next.js Runtime ricava da qui la posizione dell'app dentro il monorepo |
| **`NODE_VERSION`** | `lts/*` | Stessa risoluzione usata dalla CI (`.github/workflows/ci.yml`). `NODE_VERSION` accetta qualunque stringa valida per `nvm` |
| **`MISE_PNPM_VERSION`** | `11.17.0` | Vedi il punto 3 |
| **Plugin** | `@netlify/plugin-nextjs` | Il Next.js Runtime (adapter OpenNext). Dichiarato in `netlify.toml` e **non** in `package.json`, così Netlify installa a ogni build l'ultima versione, come raccomandato |

> Se in futuro qualcuno imposta a mano la **Package directory** su `apps/website` nelle site settings, la config resta valida: `publish` continua a risolversi rispetto alla base directory (verificato in locale con `netlify build --filter @ecoter/website`).

## 3. pnpm 11.17.0 e Corepack

Il repo pinna `"packageManager": "pnpm@11.17.0"` nel `package.json` di radice: su Netlify è il meccanismo documentato per la versione di pnpm, letto da Corepack. Senza quel campo Netlify userebbe il suo default (pnpm 10.x). Per limiti di Corepack **non si possono usare range semver** in `packageManager`, serve una versione esatta.

**Dal 24/09/2026 serve anche `MISE_PNPM_VERSION`** (già in `netlify.toml`, non va messa nella UI). Quel giorno l'immagine di build di Netlify è cambiata: pnpm arriva da mise, ma senza essere attivato ("pnpm installed but not activated"). L'install e il comando di radice partono, poi il `pnpm run build` che Turborepo lancia dentro `apps/website` passa dallo shim di mise e si ferma con `mise ERROR No version is set for shim: pnpm`. `MISE_PNPM_VERSION` dice a mise quale versione usare in ogni cartella. Deve essere uguale al `packageManager`: se aggiorni pnpm, aggiorna tutti e due.

Se un build fallisce con errori tipo `Cannot find matching keyid` in fase di install, è la firma del pacchetto pnpm che il Corepack del build image non riconosce: si risolve aggiornando il pin di pnpm oppure, come workaround temporaneo, impostando `COREPACK_INTEGRITY_KEYS=0` fra le variabili d'ambiente. In caso di errori di import dei moduli in build, Netlify documenta `PNPM_FLAGS=--shamefully-hoist`: non serve con questa configurazione, tienilo come piano B.

## 4. Variabili d'ambiente e form

Nessun segreto è nel repo: vedi `apps/website/.env.example` per la lista completa con commenti. Si impostano in **Project configuration → Environment variables**.

I due moduli del sito:

- **Richiedi informazioni** (`/richiedi-informazioni?corso=<slug>`, dal bottone "Richiedi informazioni sul corso" della scheda) → `POST /api/contatti`;
- **Ottieni corso** (`/ottieni-corso?corso=<slug>`) → `POST /api/ottieni-corso`.

**Comportamento senza chiave:**

- **in sviluppo** (`next dev`): se manca la configurazione, la richiesta viene validata, scritta nel log del server e la risposta è OK, senza inviare email;
- **in produzione**: se manca `RESEND_API_KEY` (e, per `/api/contatti`, anche `CONTACT_TO_EMAIL`), le API rispondono **503** con il messaggio "Al momento l'invio non è disponibile", seguito da email e telefono dell'Academy. Nessuna richiesta va persa in silenzio, ma i form non funzionano.

| Variabile | In produzione | Note |
|---|---|---|
| `RESEND_API_KEY` | **Obbligatoria** | Chiave [Resend](https://resend.com). Senza, entrambi i form rispondono 503 |
| `CONTACT_TO_EMAIL` | **Obbligatoria** | Chi riceve le richieste di "Richiedi informazioni". Senza, `/api/contatti` risponde 503 |
| `CONTACT_FROM_EMAIL` | **Obbligatoria** | Mittente di entrambe le email, su un **dominio verificato** in Resend (es. `ECO-TER Academy <academy@eco-ter.com>`). Senza, ricade sul sandbox `onboarding@resend.dev`, che Resend usa solo per i test e non consegna a destinatari qualsiasi |
| `ORDER_TO_EMAIL` | Facoltativa | Chi riceve le richieste di "Ottieni corso". Senza, ricade su `academy@eco-ter.com` |
| `NEXT_PUBLIC_SITE_URL` | Non serve | URL base per canonical, Open Graph e JSON-LD. Senza, usa `https://ecoteracademy.it`. Serve solo su deploy con un dominio diverso (preview/staging) |

Le variabili sono lette a runtime dalla Function che serve il sito (tranne `NEXT_PUBLIC_SITE_URL`, inserita nel codice al build): impostale almeno sul context **Production**.

## 5. Deploy

Ogni push su `master` genera un deploy di produzione; ogni PR genera una **Deploy Preview** con URL dedicato commentato su GitHub. Il primo build richiede qualche minuto (installa l'intero workspace pnpm e non ha cache).

Dopo un deploy verifica homepage, catalogo, almeno una scheda corso, `/sitemap.xml` e l'invio di un form (quest'ultimo solo se concordato, perché manda email vere).

## 6. Dominio `ecoteracademy.it`

Il dominio è registrato su **Aruba**, intestato a ECO-TER SRL, ed è già collegato. Il pannello DNS Aruba non supporta record ALIAS/ANAME sull'apex, quindi si usa un record A:

| Tipo | Host | Valore |
|---|---|---|
| `A` | `@` (vuoto) | `75.2.60.5`, load balancer Netlify |
| `CNAME` | `www` | `<nome-progetto>.netlify.app` (il sottodominio Netlify del progetto) |

Il dominio è gestito sul DNS di Aruba, non sui Netlify DNS. Netlify emette da solo il certificato TLS Let's Encrypt una volta verificato il DNS.

`ecoteracademy.it` è già il default nel codice (`apps/website/src/config/site.ts` + `content/settings/site.json`), quindi `NEXT_PUBLIC_SITE_URL` **non serve** in produzione.

## Verifica in locale (facoltativa)

Con la [Netlify CLI](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/) installata:

```
netlify build --dry --filter @ecoter/website   # mostra il flusso di build senza eseguirlo
netlify build --filter @ecoter/website         # build completo come sul server
```

Su **Windows** il build completo arriva fino alla creazione della server Function e poi fallisce con `EEXIST: symlink` mentre ricrea i symlink di pnpm dentro il bundle: è un limite del bundler su filesystem Windows, non della configurazione. Il `--dry` invece è affidabile ovunque.

Senza CLI basta `pnpm --filter @ecoter/website build` e poi `pnpm --filter @ecoter/website start`.

---

## Nota: Vercel (alternativa non usata)

Il sito potrebbe girare anche su Vercel (Root Directory `apps/website`, variabile `ENABLE_EXPERIMENTAL_COREPACK=1` per rispettare la versione di pnpm, stesse variabili d'ambiente del punto 4), ma **non è la piattaforma in uso** e questa configurazione non è mantenuta né verificata.
