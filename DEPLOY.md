# Deploy su Vercel

Guida per pubblicare `apps/website` (ECOTER Academy, Next.js 16) da questo monorepo pnpm + Turborepo. Nessuna configurazione extra nel repo è necessaria: l'import da dashboard con le impostazioni sotto è sufficiente — Vercel riconosce Turborepo automaticamente e imposta da solo build/install/output command.

## 1. Import Git Repository

1. Vai su [vercel.com](https://vercel.com) → crea/accedi a un account (piano gratuito va bene).
2. **Add New… → Project**.
3. **Import Git Repository** → collega GitHub se non già fatto → seleziona `theveldtstudio/ecoter`.

## 2. Configura il progetto

Nello step "Configure Project", prima di deployare:

| Impostazione | Valore |
|---|---|
| **Root Directory** | `apps/website` (Edit → seleziona la cartella) |
| **Framework Preset** | Next.js (auto-rilevato dopo aver impostato la Root Directory) |
| **Build Command** | lascia default (Vercel usa `turbo run build`, auto-rilevato) |
| **Install Command** | lascia default (auto-rilevato da `pnpm-lock.yaml`) |
| **Output Directory** | lascia default (`.next`, auto-rilevato) |

Non serve creare un `vercel.json`: con la Root Directory impostata, Vercel configura da sé build/install/output command per un monorepo Turborepo (verificato sulla documentazione Vercel corrente, sezione "Deploying Turborepo to Vercel").

### Node.js version

Non serve toccare nulla: il default Vercel per nuovi progetti è la **LTS più recente disponibile (24.x)**, la stessa che risolve `lts/*` nella CI GitHub Actions (`.github/workflows/ci.yml`). Restano quindi allineate senza pin espliciti in `package.json`.

### Corepack — *da abilitare, importante*

Il repo pinna `"packageManager": "pnpm@11.17.0"` nel `package.json` di root. La tabella delle versioni pnpm supportate nativamente da Vercel arriva a pnpm 10 dedotto dal `pnpm-lock.yaml`: per una versione più recente come 11.x, Vercel potrebbe non indovinarla correttamente dal solo lockfile. Per farla rispettare esattamente:

1. Project → **Settings → Environment Variables**.
2. Aggiungi `ENABLE_EXPERIMENTAL_COREPACK` = `1` (tutti gli ambienti: Production, Preview, Development).

Con questa variable, Vercel usa Corepack e legge `packageManager` da `package.json` invece di indovinare la versione pnpm dal lockfile.

## 3. Variabili d'ambiente

Nessun segreto è nel repo — vedi `apps/website/.env.example` per la lista completa con commenti. Da aggiungere in **Settings → Environment Variables**:

| Variabile | Obbligatoria? | Note |
|---|---|---|
| `RESEND_API_KEY` | No | Senza questa (+ `CONTACT_TO_EMAIL`), il form contatti valida e risponde OK ma logga invece di inviare l'email (stub, vedi `src/lib/contact/send-contact-email.ts`) |
| `CONTACT_TO_EMAIL` | No | Indirizzo che riceve le richieste dal form contatti. Va impostata insieme a `RESEND_API_KEY` per attivare l'invio reale |
| `ORDER_TO_EMAIL` | No | Destinatario delle richieste dal form "Ottieni corso" (`/ottieni-corso`). Senza, ricade su `academy@eco-ter.com`. L'invio reale richiede comunque `RESEND_API_KEY` |
| `CONTACT_FROM_EMAIL` | No | Mittente delle email inviate. Senza dominio verificato su Resend, ricade sul sandbox `onboarding@resend.dev` (ok per test, non per produzione) |
| `NEXT_PUBLIC_SITE_URL` | No | URL base per canonical/JSON-LD. Senza, usa `https://academy.ecoter.it`. Utile solo se il dominio finale è diverso |
| `ENABLE_EXPERIMENTAL_COREPACK` | **Sì** | Vedi sopra — serve a far rispettare la versione pnpm pinnata |

Per attivare davvero l'invio email in produzione servono un account [Resend](https://resend.com) (piano gratuito disponibile), una API key e un dominio mittente verificato lì — passaggio da fare quando pronti, non blocca il primo deploy.

## 4. Deploy

Premi **Deploy**. Il primo build richiede qualche minuto (installa l'intero workspace pnpm). Al termine ottieni un URL di preview tipo `ecoter-xxxx.vercel.app` — verifica che homepage, catalogo corsi e almeno una pagina corso carichino correttamente.

Da qui in poi, ogni push su `master` genera un deploy di produzione automatico; ogni PR genera una preview con URL dedicato in un commento GitHub.

## 5. Collegare un dominio

1. Project → **Settings → Domains**.
2. Aggiungi il dominio (es. `academy.ecoter.it`).
3. Vercel mostra i record DNS da creare (in genere un `CNAME` verso `cname.vercel-dns.com`, o un record `A` se è il dominio apex) — vanno aggiunti presso il provider DNS del dominio.
4. Attendi la propagazione (di solito minuti, può arrivare a qualche ora) — Vercel emette automaticamente il certificato TLS una volta verificato il DNS.

Se il dominio finale è diverso da `academy.ecoter.it`, aggiorna anche `NEXT_PUBLIC_SITE_URL` (punto 3) per correggere canonical URL e dati strutturati.
