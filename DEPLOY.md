# Deploy

Guida per pubblicare `apps/website` (ECO-TER Academy, Next.js 16) da questo monorepo pnpm + Turborepo.

Due piattaforme documentate, entrambe valide e alternative fra loro:

- **[Netlify](#deploy-su-netlify)** — configurata nel repo via `netlify.toml` (radice).
- **[Vercel](#deploy-su-vercel)** — nessun file di config nel repo, tutto da dashboard.

In entrambi i casi il sito viene servito come app Next.js completa: le pagine statiche finiscono su CDN, mentre le rotte dinamiche (`/contatti`, `/ottieni-corso`) e le API `POST /api/contatti` e `POST /api/ottieni-corso` girano lato server.

---

## Deploy su Netlify

La configurazione è già nel repo: [`netlify.toml`](./netlify.toml) in radice. Dalla dashboard basta importare il repository, aggiungere le variabili d'ambiente e collegare il dominio.

### 1. Import del repository

1. Vai su [app.netlify.com](https://app.netlify.com) → crea/accedi a un account (piano gratuito va bene).
2. **Add new project → Import an existing project** → collega GitHub → seleziona `theveldtstudio/ecoter`.
3. Netlify rileva che il repo è un monorepo e chiede quale progetto pubblicare: seleziona **`apps/website`** (`@ecoter/website`).
4. Nello step delle build settings **non toccare nulla**: build command, publish directory e versione di Node arrivano da `netlify.toml` e hanno la precedenza sui valori della UI.

### 2. Cosa fa `netlify.toml`

| Impostazione | Valore | Perché |
|---|---|---|
| **Base directory** | radice del repo (default, non impostata) | Netlify sceglie il package manager dal lockfile presente nella base directory. `pnpm-lock.yaml` e `pnpm-workspace.yaml` stanno in radice: puntare la base su `apps/website` farebbe ricadere l'install su `npm install` e romperebbe le dipendenze `workspace:*` (`@ecoter/ui`, `@ecoter/tokens`) |
| **Build command** | `pnpm turbo run build --filter=@ecoter/website` | Turborepo costruisce il sito e, a monte, le sue dipendenze di workspace |
| **Publish directory** | `apps/website/.next` | Relativa alla base directory. Il Next.js Runtime ricava da qui la posizione dell'app dentro il monorepo |
| **`NODE_VERSION`** | `lts/*` | Stessa risoluzione usata dalla CI (`.github/workflows/ci.yml`). `NODE_VERSION` accetta qualunque stringa valida per `nvm`; il default del build image Netlify è comunque Node 24 |
| **Plugin** | `@netlify/plugin-nextjs` | Il Next.js Runtime (adapter OpenNext). Dichiarato in `netlify.toml` e **non** in `package.json`, così Netlify installa a ogni build l'ultima versione — è la raccomandazione ufficiale, pinnarlo servirebbe solo per bloccare una versione specifica |

> Se in futuro qualcuno imposta a mano la **Package directory** su `apps/website` nelle site settings, la config resta valida: `publish` continua a risolversi rispetto alla base directory (verificato in locale con `netlify build --filter @ecoter/website`).

### 3. pnpm 11.17.0 e Corepack

Il repo pinna `"packageManager": "pnpm@11.17.0"` nel `package.json` di radice. **Non serve nessuna variabile d'ambiente**: su Netlify il campo `packageManager` è il meccanismo documentato per la versione di pnpm, letto da Corepack — è l'equivalente di `ENABLE_EXPERIMENTAL_COREPACK` su Vercel, ma attivo di default.

Senza quel campo Netlify userebbe il suo default (pnpm 10.x). Da ricordare: per limiti di Corepack **non si possono usare range semver** in `packageManager`, serve una versione esatta (come quella già pinnata).

**Dal 24/09/2026 serve anche `MISE_PNPM_VERSION`** (già in `netlify.toml`, non va messa nella UI). Quel giorno l'immagine di build di Netlify è cambiata: pnpm ora arriva da mise, ma senza essere attivato ("pnpm installed but not activated"). L'install e il comando di radice partono, poi il `pnpm run build` che Turborepo lancia dentro `apps/website` passa dallo shim di mise e si ferma con `mise ERROR No version is set for shim: pnpm` (deploy di `484342a`, poi riparato). `MISE_PNPM_VERSION` dice a mise quale versione usare in ogni cartella. Deve essere uguale al `packageManager`: se aggiorni pnpm, aggiorna tutti e due.

Se un build fallisce con errori tipo `Cannot find matching keyid` in fase di install, è la firma del pacchetto pnpm che il Corepack del build image non riconosce: si risolve aggiornando il pin di pnpm oppure, come workaround temporaneo, impostando `COREPACK_INTEGRITY_KEYS=0` fra le variabili d'ambiente. In caso di errori di import dei moduli in build, Netlify documenta `PNPM_FLAGS=--shamefully-hoist` — non serve con questa configurazione, tienilo come piano B.

### 4. Variabili d'ambiente

Nessun segreto è nel repo — vedi `apps/website/.env.example` per la lista completa con commenti. Da aggiungere in **Project configuration → Environment variables**:

| Variabile | Obbligatoria? | Note |
|---|---|---|
| `RESEND_API_KEY` | No | Senza questa (+ `CONTACT_TO_EMAIL`), il form contatti valida e risponde OK ma logga invece di inviare l'email (stub, vedi `src/lib/contact/send-contact-email.ts`) |
| `CONTACT_TO_EMAIL` | No | Indirizzo che riceve le richieste dal form contatti. Va impostata insieme a `RESEND_API_KEY` per attivare l'invio reale |
| `ORDER_TO_EMAIL` | No | Destinatario delle richieste dal form "Ottieni corso" (`/ottieni-corso`). Senza, ricade su `academy@eco-ter.com`. L'invio reale richiede comunque `RESEND_API_KEY` |
| `CONTACT_FROM_EMAIL` | No | Mittente delle email inviate. Senza dominio verificato su Resend, ricade sul sandbox `onboarding@resend.dev` (ok per test, non per produzione) |
| `NEXT_PUBLIC_SITE_URL` | No | URL base per canonical/JSON-LD. Senza, usa `https://ecoteracademy.it` (dominio reale, registrato su Aruba). Utile solo per preview/staging su un dominio diverso |

Queste variabili sono lette a runtime dalla Function che serve il sito (eccetto `NEXT_PUBLIC_SITE_URL`, inlineata in build): impostale su **tutti i deploy context** o almeno su Production.

Per attivare davvero l'invio email in produzione servono un account [Resend](https://resend.com) (piano gratuito disponibile), una API key e un dominio mittente verificato lì — passaggio da fare quando pronti, non blocca il primo deploy.

### 5. Deploy

Premi **Deploy**. Il primo build richiede qualche minuto (installa l'intero workspace pnpm e non ha cache). Il Next.js Runtime trasforma automaticamente in **Netlify Functions**:

- le pagine renderizzate a richiesta — `/contatti`, `/ottieni-corso`;
- i route handler — `POST /api/contatti` e `POST /api/ottieni-corso`;

mentre home, catalogo, pagine corso, `sitemap.xml` e `robots.txt` restano statici su CDN. Al termine ottieni un URL tipo `ecoter-xxxx.netlify.app` — verifica homepage, catalogo corsi, almeno una pagina corso e l'invio di un form.

Da qui in poi ogni push su `master` genera un deploy di produzione; ogni PR genera una **Deploy Preview** con URL dedicato commentato su GitHub.

### 6. Collegare il dominio `ecoteracademy.it`

Il dominio è registrato su **Aruba**, intestato a ECO-TER SRL. Il pannello DNS Aruba non supporta record ALIAS/ANAME sull'apex, quindi si usa un record A.

1. Netlify → **Project configuration → Domain management → Add a domain** → `ecoteracademy.it`.
2. Scegli **usa il tuo DNS esterno** (non i Netlify DNS: il dominio resta gestito su Aruba).
3. Nel pannello DNS di Aruba crea:

   | Tipo | Host | Valore |
   |---|---|---|
   | `A` | `@` (vuoto) | `75.2.60.5` — load balancer Netlify |
   | `CNAME` | `www` | `<nome-progetto>.netlify.app` (il sottodominio Netlify del progetto) |

4. Attendi la propagazione (di solito minuti, fino a 24 ore). Netlify emette automaticamente il certificato TLS Let's Encrypt una volta verificato il DNS.

`ecoteracademy.it` è già il default nel codice (`apps/website/src/config/site.ts` + `content/settings/site.json`), quindi `NEXT_PUBLIC_SITE_URL` **non serve** in produzione. Impostala solo su deploy che girano su un dominio diverso (preview/staging), per correggere canonical URL e dati strutturati.

### Verifica in locale (facoltativa)

Con la [Netlify CLI](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/) installata:

```
netlify build --dry --filter @ecoter/website   # mostra il flusso di build senza eseguirlo
netlify build --filter @ecoter/website         # build completo come sul server
```

Su **Windows** il build completo arriva fino alla creazione della server Function e poi fallisce con `EEXIST: symlink` mentre ricrea i symlink di pnpm dentro il bundle: è un limite del bundler su filesystem Windows, non della configurazione. Il `--dry` invece è affidabile ovunque.

---

## Deploy su Vercel

Nessuna configurazione extra nel repo è necessaria: l'import da dashboard con le impostazioni sotto è sufficiente — Vercel riconosce Turborepo automaticamente e imposta da solo build/install/output command.

### 1. Import Git Repository

1. Vai su [vercel.com](https://vercel.com) → crea/accedi a un account (piano gratuito va bene).
2. **Add New… → Project**.
3. **Import Git Repository** → collega GitHub se non già fatto → seleziona `theveldtstudio/ecoter`.

### 2. Configura il progetto

Nello step "Configure Project", prima di deployare:

| Impostazione | Valore |
|---|---|
| **Root Directory** | `apps/website` (Edit → seleziona la cartella) |
| **Framework Preset** | Next.js (auto-rilevato dopo aver impostato la Root Directory) |
| **Build Command** | lascia default (Vercel usa `turbo run build`, auto-rilevato) |
| **Install Command** | lascia default (auto-rilevato da `pnpm-lock.yaml`) |
| **Output Directory** | lascia default (`.next`, auto-rilevato) |

Non serve creare un `vercel.json`: con la Root Directory impostata, Vercel configura da sé build/install/output command per un monorepo Turborepo (verificato sulla documentazione Vercel corrente, sezione "Deploying Turborepo to Vercel").

#### Node.js version

Non serve toccare nulla: il default Vercel per nuovi progetti è la **LTS più recente disponibile (24.x)**, la stessa che risolve `lts/*` nella CI GitHub Actions (`.github/workflows/ci.yml`). Restano quindi allineate senza pin espliciti in `package.json`.

#### Corepack — *da abilitare, importante*

Il repo pinna `"packageManager": "pnpm@11.17.0"` nel `package.json` di root. La tabella delle versioni pnpm supportate nativamente da Vercel arriva a pnpm 10 dedotto dal `pnpm-lock.yaml`: per una versione più recente come 11.x, Vercel potrebbe non indovinarla correttamente dal solo lockfile. Per farla rispettare esattamente:

1. Project → **Settings → Environment Variables**.
2. Aggiungi `ENABLE_EXPERIMENTAL_COREPACK` = `1` (tutti gli ambienti: Production, Preview, Development).

Con questa variable, Vercel usa Corepack e legge `packageManager` da `package.json` invece di indovinare la versione pnpm dal lockfile.

### 3. Variabili d'ambiente

Nessun segreto è nel repo — vedi `apps/website/.env.example` per la lista completa con commenti. Da aggiungere in **Settings → Environment Variables**:

| Variabile | Obbligatoria? | Note |
|---|---|---|
| `RESEND_API_KEY` | No | Senza questa (+ `CONTACT_TO_EMAIL`), il form contatti valida e risponde OK ma logga invece di inviare l'email (stub, vedi `src/lib/contact/send-contact-email.ts`) |
| `CONTACT_TO_EMAIL` | No | Indirizzo che riceve le richieste dal form contatti. Va impostata insieme a `RESEND_API_KEY` per attivare l'invio reale |
| `ORDER_TO_EMAIL` | No | Destinatario delle richieste dal form "Ottieni corso" (`/ottieni-corso`). Senza, ricade su `academy@eco-ter.com`. L'invio reale richiede comunque `RESEND_API_KEY` |
| `CONTACT_FROM_EMAIL` | No | Mittente delle email inviate. Senza dominio verificato su Resend, ricade sul sandbox `onboarding@resend.dev` (ok per test, non per produzione) |
| `NEXT_PUBLIC_SITE_URL` | No | URL base per canonical/JSON-LD. Senza, usa `https://ecoteracademy.it` (dominio reale, registrato su Aruba). Utile solo per preview/staging su un dominio diverso |
| `ENABLE_EXPERIMENTAL_COREPACK` | **Sì** | Vedi sopra — serve a far rispettare la versione pnpm pinnata |

Per attivare davvero l'invio email in produzione servono un account [Resend](https://resend.com) (piano gratuito disponibile), una API key e un dominio mittente verificato lì — passaggio da fare quando pronti, non blocca il primo deploy.

### 4. Deploy

Premi **Deploy**. Il primo build richiede qualche minuto (installa l'intero workspace pnpm). Al termine ottieni un URL di preview tipo `ecoter-xxxx.vercel.app` — verifica che homepage, catalogo corsi e almeno una pagina corso carichino correttamente.

Da qui in poi, ogni push su `master` genera un deploy di produzione automatico; ogni PR genera una preview con URL dedicato in un commento GitHub.

### 5. Collegare un dominio

1. Project → **Settings → Domains**.
2. Aggiungi il dominio `ecoteracademy.it` (registrato su Aruba, intestato a ECO-TER SRL) — i record DNS vanno creati nel pannello Aruba.
3. Vercel mostra i record DNS da creare (in genere un `CNAME` verso `cname.vercel-dns.com`, o un record `A` se è il dominio apex) — vanno aggiunti presso il provider DNS del dominio.
4. Attendi la propagazione (di solito minuti, può arrivare a qualche ora) — Vercel emette automaticamente il certificato TLS una volta verificato il DNS.

`ecoteracademy.it` è già il default nel codice (`apps/website/src/config/site.ts` + `content/settings/site.json`), quindi `NEXT_PUBLIC_SITE_URL` **non serve** in produzione. Impostala solo su deploy che girano su un dominio diverso (preview/staging), per correggere canonical URL e dati strutturati.
