import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

/* ─────────────────────────────────────────────────────────────────────────
 * Genera i file MDX dei corsi in content/courses/ a partire dal catalogo
 * reale (content/raw/catalogo-corsi.json). Titoli, sottotitoli e
 * destinatari sono curati a mano per codice (per non alterare acronimi
 * tecnici — RSPP, PES/PAV, CEI, ecc. — con una title-case generica);
 * durata, modalità, partecipanti, normativa e testo descrittivo sono
 * derivati in modo deterministico dai dati sorgente.
 * ────────────────────────────────────────────────────────────────────── */

type RawRecord = {
  code: string
  activity: string
  category: string
  title: string
  sessions: string
  durationEach: string
  modality: string[]
  sincrona: string
  presenza: string
  minMax: string
  normativeRef: string
}

type Level = 'base' | 'intermedio' | 'avanzato'

type Meta = {
  title: string
  subtitle: string
  audience: string[]
  level: Level
  roleTag: string
}

const RAW_PATH = join(process.cwd(), 'content', 'raw', 'catalogo-corsi.json')
const COURSES_DIR = join(process.cwd(), 'content', 'courses')

/* Corsi già presenti come campioni ricchi — non duplicare */
const SKIP_CODES = new Set(['B03'])

/* Etichette dei livelli Benessere (sotto-moduli), tradotte in italiano */
const LEVEL_LABEL_IT: Record<string, string> = {
  BASIC: 'Base',
  ADVANCED: 'Avanzato',
  EXTENSIVE: 'Estensivo',
}

/* ─── Metadati curati per codice ────────────────────────────────────────── */

const META: Record<string, Meta> = {
  // Attività A — Sicurezza generale (D.Lgs 81/08 art. 36-37)
  A01: {
    title: 'Lavoratori – Rischio generale',
    subtitle:
      'Formazione base obbligatoria per lavoratori in aziende a rischio generale',
    audience: [
      'Lavoratori dipendenti di aziende classificate a rischio generale',
    ],
    level: 'base',
    roleTag: 'lavoratori',
  },
  A02: {
    title: 'Lavoratori – Rischio specifico basso',
    subtitle:
      'Formazione specifica obbligatoria per lavoratori in attività a rischio basso',
    audience: [
      'Lavoratori dipendenti di aziende classificate a rischio specifico basso',
    ],
    level: 'base',
    roleTag: 'lavoratori',
  },
  A03: {
    title: 'Lavoratori – Rischio specifico medio',
    subtitle:
      'Formazione specifica obbligatoria per lavoratori in attività a rischio medio',
    audience: [
      'Lavoratori dipendenti di aziende classificate a rischio specifico medio',
    ],
    level: 'intermedio',
    roleTag: 'lavoratori',
  },
  A04: {
    title: 'Lavoratori – Rischio specifico alto',
    subtitle:
      'Formazione specifica obbligatoria per lavoratori in attività a rischio alto',
    audience: [
      'Lavoratori dipendenti di aziende classificate a rischio specifico alto',
    ],
    level: 'avanzato',
    roleTag: 'lavoratori',
  },
  A05: {
    title: 'Aggiornamento lavoratori – Rischio basso, medio e alto',
    subtitle:
      'Aggiornamento periodico della formazione lavoratori per tutti i livelli di rischio specifico',
    audience: ['Lavoratori già formati che devono aggiornare la formazione'],
    level: 'intermedio',
    roleTag: 'lavoratori',
  },
  A06: {
    title: 'Preposti',
    subtitle: 'Formazione obbligatoria per lavoratori con funzioni di preposto',
    audience: ['Lavoratori investiti di funzioni di preposto'],
    level: 'intermedio',
    roleTag: 'preposti',
  },
  A07: {
    title: 'Aggiornamento preposti (validità biennale)',
    subtitle: 'Aggiornamento periodico obbligatorio per i preposti',
    audience: ['Preposti già formati che devono aggiornare la formazione'],
    level: 'intermedio',
    roleTag: 'preposti',
  },
  A08: {
    title: 'Dirigenti',
    subtitle:
      'Formazione obbligatoria per dirigenti in materia di sicurezza sul lavoro',
    audience: [
      'Dirigenti con responsabilità in materia di sicurezza sul lavoro',
    ],
    level: 'intermedio',
    roleTag: 'dirigenti',
  },
  A09: {
    title: 'Dirigenti – Modulo aggiuntivo cantieri',
    subtitle:
      'Modulo integrativo per dirigenti operanti in cantieri temporanei o mobili',
    audience: ['Dirigenti operanti in cantieri temporanei o mobili'],
    level: 'intermedio',
    roleTag: 'dirigenti',
  },
  A10: {
    title: 'Aggiornamento dirigenti',
    subtitle: 'Aggiornamento periodico obbligatorio per i dirigenti',
    audience: ['Dirigenti già formati che devono aggiornare la formazione'],
    level: 'intermedio',
    roleTag: 'dirigenti',
  },
  A11: {
    title: 'Datori di lavoro',
    subtitle:
      'Formazione per datori di lavoro che svolgono direttamente compiti di prevenzione e protezione',
    audience: [
      'Datori di lavoro che intendono svolgere direttamente i compiti di prevenzione e protezione',
    ],
    level: 'intermedio',
    roleTag: 'datori-di-lavoro',
  },
  A12: {
    title: 'Datori di lavoro – Modulo aggiuntivo cantieri',
    subtitle:
      'Modulo integrativo per datori di lavoro operanti in cantieri temporanei o mobili',
    audience: ['Datori di lavoro operanti in cantieri temporanei o mobili'],
    level: 'intermedio',
    roleTag: 'datori-di-lavoro',
  },
  A13: {
    title: 'Aggiornamento datori di lavoro',
    subtitle: 'Aggiornamento periodico obbligatorio per i datori di lavoro',
    audience: [
      'Datori di lavoro già formati che devono aggiornare la formazione',
    ],
    level: 'intermedio',
    roleTag: 'datori-di-lavoro',
  },
  A14: {
    title:
      'Lavoratori e datori di lavoro – Ambienti sospetti di inquinamento o confinati (D.P.R. 177/2011)',
    subtitle:
      'Formazione specialistica per attività in ambienti sospetti di inquinamento o confinati',
    audience: [
      'Lavoratori, datori di lavoro e lavoratori autonomi che operano in ambienti sospetti di inquinamento o confinati',
    ],
    level: 'avanzato',
    roleTag: 'ambienti-confinati',
  },
  A15: {
    title:
      'Aggiornamento – Ambienti sospetti di inquinamento o confinati (D.P.R. 177/2011)',
    subtitle:
      'Aggiornamento periodico per chi opera in ambienti sospetti di inquinamento o confinati',
    audience: [
      'Lavoratori, datori di lavoro e lavoratori autonomi già formati che devono aggiornare la formazione',
    ],
    level: 'avanzato',
    roleTag: 'ambienti-confinati',
  },
  A16: {
    title: 'Rappresentante dei lavoratori per la sicurezza (RLS)',
    subtitle:
      'Formazione obbligatoria per il rappresentante dei lavoratori per la sicurezza',
    audience: ['Lavoratori eletti o designati come RLS'],
    level: 'intermedio',
    roleTag: 'rls',
  },
  A17: {
    title: 'Aggiornamento RLS',
    subtitle: 'Aggiornamento periodico obbligatorio per l’RLS',
    audience: ['RLS già formati che devono aggiornare la formazione'],
    level: 'intermedio',
    roleTag: 'rls',
  },

  // Attività B — CSP/CSE, RSPP/ASPP, Formatori sicurezza
  B01: {
    title:
      'Coordinatori per la sicurezza in progettazione ed esecuzione (CSP/CSE) – 120h',
    subtitle:
      'Percorso completo per coordinatori della sicurezza nei cantieri temporanei o mobili',
    audience: [
      'Professionisti che intendono svolgere il ruolo di Coordinatore per la Sicurezza in fase di Progettazione (CSP) o di Esecuzione (CSE)',
    ],
    level: 'avanzato',
    roleTag: 'cspcse',
  },
  B02: {
    title: 'Aggiornamento coordinatori CSP/CSE – 40h',
    subtitle: 'Aggiornamento periodico per i coordinatori CSP/CSE',
    audience: [
      'Coordinatori CSP/CSE già formati che devono aggiornare la formazione',
    ],
    level: 'avanzato',
    roleTag: 'cspcse',
  },
  B04: {
    title: 'RSPP – Modulo B: propedeutico a tutti i settori – 48h',
    subtitle:
      'Modulo settoriale del percorso RSPP, propedeutico per chi ha già conseguito il Modulo A',
    audience: [
      'Chi ha già conseguito il Modulo A e deve proseguire il percorso RSPP',
    ],
    level: 'intermedio',
    roleTag: 'rspp',
  },
  B05: {
    title: 'RSPP – Modulo B SP1: Agricoltura, silvicoltura e zootecnia – 16h',
    subtitle:
      'Modulo settoriale RSPP per il macrosettore agricoltura-silvicoltura-zootecnia',
    audience: [
      'Chi svolge il ruolo di RSPP nel macrosettore agricoltura, silvicoltura e zootecnia',
    ],
    level: 'intermedio',
    roleTag: 'rspp',
  },
  B06: {
    title: 'RSPP – Modulo B SP2: Settore pesca – 12h',
    subtitle: 'Modulo settoriale RSPP per il settore pesca',
    audience: ['Chi svolge il ruolo di RSPP nel settore pesca'],
    level: 'intermedio',
    roleTag: 'rspp',
  },
  B07: {
    title: 'RSPP – Modulo B SP3: Settore costruzioni – 16h',
    subtitle: 'Modulo settoriale RSPP per il settore costruzioni',
    audience: ['Chi svolge il ruolo di RSPP nel settore costruzioni'],
    level: 'intermedio',
    roleTag: 'rspp',
  },
  B08: {
    title: 'RSPP – Modulo B SP4: Settore sanità residenziale – 12h',
    subtitle: 'Modulo settoriale RSPP per il settore sanità residenziale',
    audience: ['Chi svolge il ruolo di RSPP nel settore sanità residenziale'],
    level: 'intermedio',
    roleTag: 'rspp',
  },
  B09: {
    title: 'RSPP – Modulo B SP5: Settore chimico-petrolchimico – 16h',
    subtitle: 'Modulo settoriale RSPP per il settore chimico-petrolchimico',
    audience: ['Chi svolge il ruolo di RSPP nel settore chimico-petrolchimico'],
    level: 'intermedio',
    roleTag: 'rspp',
  },
  B10: {
    title: 'RSPP – Modulo C: Gestione e organizzazione – 24h',
    subtitle:
      'Modulo gestionale-organizzativo conclusivo del percorso RSPP, comune a tutti i settori',
    audience: [
      'Chi ha completato i Moduli A e B e deve concludere il percorso RSPP',
    ],
    level: 'avanzato',
    roleTag: 'rspp',
  },
  B11: {
    title: 'Aggiornamento RSPP – Tutti i settori – 40h',
    subtitle: 'Aggiornamento periodico per RSPP di tutti i settori',
    audience: ['RSPP già formati che devono aggiornare la formazione'],
    level: 'intermedio',
    roleTag: 'rspp',
  },
  B12: {
    title: 'Aggiornamento ASPP – Tutti i settori – 20h',
    subtitle: 'Aggiornamento periodico per ASPP di tutti i settori',
    audience: ['ASPP già formati che devono aggiornare la formazione'],
    level: 'intermedio',
    roleTag: 'aspp',
  },
  B13: {
    title: 'Datori di lavoro RSPP – Modulo comune – 8h',
    subtitle:
      'Modulo comune per datori di lavoro che svolgono direttamente il ruolo di RSPP (da integrare con il corso Datori di lavoro – A11)',
    audience: [
      'Datori di lavoro che intendono svolgere direttamente il ruolo di RSPP',
    ],
    level: 'intermedio',
    roleTag: 'datori-rspp',
  },
  B14: {
    title:
      'Datori di lavoro RSPP – Modulo integrativo settori SP1, SP3, SP4, SP5 – 16h',
    subtitle:
      'Modulo integrativo settoriale per datori di lavoro che svolgono il ruolo di RSPP',
    audience: [
      'Datori di lavoro RSPP operanti nei settori SP1, SP3, SP4 o SP5',
    ],
    level: 'intermedio',
    roleTag: 'datori-rspp',
  },
  B15: {
    title: 'Datori di lavoro RSPP – Modulo integrativo settore SP2 – 12h',
    subtitle:
      'Modulo integrativo settoriale per datori di lavoro che svolgono il ruolo di RSPP nel settore pesca (SP2)',
    audience: ['Datori di lavoro RSPP operanti nel settore SP2 (pesca)'],
    level: 'intermedio',
    roleTag: 'datori-rspp',
  },
  B16: {
    title: 'Aggiornamento datori di lavoro RSPP – Settori SP1-SP5 – 8h',
    subtitle:
      'Aggiornamento periodico per datori di lavoro RSPP operanti nei settori SP1-SP5',
    audience: [
      'Datori di lavoro RSPP già formati che devono aggiornare la formazione',
    ],
    level: 'intermedio',
    roleTag: 'datori-rspp',
  },
  B17: {
    title: 'Formatori della sicurezza – 24h',
    subtitle:
      'Percorso per chi intende svolgere attività di docenza in materia di sicurezza sul lavoro',
    audience: [
      'Professionisti che intendono svolgere attività di docenza in materia di sicurezza sul lavoro',
    ],
    level: 'avanzato',
    roleTag: 'formatori',
  },
  B18: {
    title: 'Aggiornamento formatori della sicurezza – 24h',
    subtitle: 'Aggiornamento periodico per i formatori della sicurezza',
    audience: [
      'Formatori della sicurezza già formati che devono aggiornare la formazione',
    ],
    level: 'avanzato',
    roleTag: 'formatori',
  },

  // Attività C — PLE, gru per autocarro, carrelli elevatori (art. 73)
  C01: {
    title: 'Addetti alle piattaforme di lavoro mobili elevabili (PLE)',
    subtitle:
      'Abilitazione per la conduzione di piattaforme di lavoro mobili elevabili, con o senza stabilizzatori',
    audience: [
      'Lavoratori addetti alla conduzione di piattaforme di lavoro mobili elevabili',
    ],
    level: 'base',
    roleTag: 'ple',
  },
  C02: {
    title: 'Aggiornamento addetti PLE',
    subtitle: 'Aggiornamento periodico per addetti alla conduzione di PLE',
    audience: ['Addetti PLE già formati che devono aggiornare la formazione'],
    level: 'base',
    roleTag: 'ple',
  },
  C03: {
    title: 'Addetti alla conduzione di gru per autocarro',
    subtitle: 'Abilitazione per la conduzione di gru per autocarro',
    audience: ['Lavoratori addetti alla conduzione di gru per autocarro'],
    level: 'base',
    roleTag: 'gru',
  },
  C04: {
    title: 'Aggiornamento addetti gru per autocarro',
    subtitle:
      'Aggiornamento periodico per addetti alla conduzione di gru per autocarro',
    audience: [
      'Addetti gru per autocarro già formati che devono aggiornare la formazione',
    ],
    level: 'base',
    roleTag: 'gru',
  },
  C05: {
    title: 'Addetti alla conduzione di carrelli elevatori semoventi',
    subtitle: 'Abilitazione per la conduzione di carrelli elevatori semoventi',
    audience: [
      'Lavoratori addetti alla conduzione di carrelli elevatori semoventi',
    ],
    level: 'base',
    roleTag: 'carrelli-elevatori',
  },
  C06: {
    title: 'Aggiornamento addetti carrelli elevatori semoventi',
    subtitle:
      'Aggiornamento periodico per addetti alla conduzione di carrelli elevatori semoventi',
    audience: [
      'Addetti carrelli elevatori già formati che devono aggiornare la formazione',
    ],
    level: 'base',
    roleTag: 'carrelli-elevatori',
  },

  // Attività D — PES/PAV/PEI, impianti elettrici (art. 82, CEI 11-27:2025)
  D01: {
    title: 'PES/PAV – Persone esperte e avvertite (Norme CEI 11-27:2025)',
    subtitle:
      "Formazione per l'abilitazione a lavori elettrici sotto tensione o in prossimità",
    audience: [
      'Lavoratori che operano su impianti elettrici in qualità di Persona Esperta (PES) o Avvertita (PAV)',
    ],
    level: 'avanzato',
    roleTag: 'pes-pav',
  },
  D02: {
    title: "PEI – Persone idonee all'esecuzione (Norme CEI 11-27:2025)",
    subtitle:
      'Formazione per l’esecuzione di semplici manovre e verifiche su impianti elettrici',
    audience: [
      'Lavoratori che eseguono semplici manovre e verifiche su impianti elettrici come Persona Idonea (PEI)',
    ],
    level: 'base',
    roleTag: 'pei',
  },
  D03: {
    title: 'Aggiornamento PES/PAV (Norme CEI 11-27:2025)',
    subtitle: 'Aggiornamento periodico per PES/PAV',
    audience: ['PES/PAV già formati che devono aggiornare la formazione'],
    level: 'avanzato',
    roleTag: 'pes-pav',
  },
  D04: {
    title:
      'Responsabili e addetti alla manutenzione delle cabine elettriche (CEI 78-17)',
    subtitle:
      'Formazione specialistica per la manutenzione delle cabine elettriche',
    audience: [
      'Responsabili e addetti alla manutenzione delle cabine elettriche',
    ],
    level: 'avanzato',
    roleTag: 'cabine-elettriche',
  },

  // Attività E — Valutazione rischi specifici (D.Lgs 81/08)
  E01: {
    title: 'Gestione e valutazione del rischio chimico',
    subtitle:
      'Formazione sulla gestione e valutazione del rischio chimico nei luoghi di lavoro',
    audience: [
      'RSPP, ASPP, preposti e lavoratori coinvolti nella gestione del rischio chimico',
    ],
    level: 'intermedio',
    roleTag: 'rischio-chimico',
  },
  E02: {
    title: 'Gestione e valutazione del rischio rumore',
    subtitle:
      'Formazione sulla gestione e valutazione del rischio rumore nei luoghi di lavoro',
    audience: [
      'RSPP, ASPP, preposti e lavoratori coinvolti nella gestione del rischio rumore',
    ],
    level: 'intermedio',
    roleTag: 'rischio-rumore',
  },
  E03: {
    title: 'Gestione e valutazione del rischio vibrazioni',
    subtitle:
      'Formazione sulla gestione e valutazione del rischio vibrazioni nei luoghi di lavoro',
    audience: [
      'RSPP, ASPP, preposti e lavoratori coinvolti nella gestione del rischio vibrazioni',
    ],
    level: 'intermedio',
    roleTag: 'rischio-vibrazioni',
  },
  E04: {
    title:
      'Gestione e valutazione del rischio movimentazione manuale dei carichi (MMC)',
    subtitle:
      'Formazione sulla gestione e valutazione del rischio da movimentazione manuale dei carichi',
    audience: [
      'RSPP, ASPP, preposti e lavoratori coinvolti nella movimentazione manuale dei carichi',
    ],
    level: 'intermedio',
    roleTag: 'movimentazione-carichi',
  },
  E05: {
    title: 'Gestione e valutazione del rischio biologico',
    subtitle:
      'Formazione sulla gestione e valutazione del rischio biologico nei luoghi di lavoro',
    audience: [
      'RSPP, ASPP, preposti e lavoratori coinvolti nella gestione del rischio biologico',
    ],
    level: 'intermedio',
    roleTag: 'rischio-biologico',
  },

  // Attività F — Attrezzature a pressione (Direttiva PED, DM 329/04)
  F01: {
    title:
      'Identificazione ed esercizio di impianti e attrezzature a pressione',
    subtitle:
      'Formazione su Direttiva PED, DM 329/04 e pratiche CIVA-INAIL per impianti e attrezzature a pressione',
    audience: [
      'Responsabili e addetti all’esercizio di impianti e attrezzature a pressione',
    ],
    level: 'intermedio',
    roleTag: 'attrezzature-pressione',
  },

  // Attività G — Ambiente (D.Lgs 152/06)
  G01: {
    title: 'Gestione operativa dei rifiuti',
    subtitle:
      'Formazione sulla gestione operativa dei rifiuti ai sensi del D.Lgs 152/06',
    audience: ['Addetti e responsabili della gestione dei rifiuti aziendali'],
    level: 'base',
    roleTag: 'gestione-rifiuti',
  },
  G02: {
    title: 'Gestione delle terre e rocce da scavo',
    subtitle:
      'Formazione sulla gestione delle terre e rocce da scavo alla luce dei decreti vigenti',
    audience: [
      'Tecnici e responsabili di cantiere coinvolti nella gestione di terre e rocce da scavo',
    ],
    level: 'base',
    roleTag: 'terre-rocce-scavo',
  },
  G03: {
    title: 'Gestione delle emergenze ambientali',
    subtitle: 'Formazione sulla gestione delle emergenze ambientali in azienda',
    audience: [
      'Addetti e responsabili della gestione delle emergenze ambientali',
    ],
    level: 'base',
    roleTag: 'emergenze-ambientali',
  },
  G04: {
    title:
      'Sostenibilità per le PMI – Il bilancio di sostenibilità come strumento strategico',
    subtitle:
      'Formazione sulla sostenibilità per le PMI e sul bilancio di sostenibilità come strumento strategico',
    audience: [
      'Imprenditori e responsabili di PMI interessati alla sostenibilità aziendale',
    ],
    level: 'intermedio',
    roleTag: 'sostenibilita',
  },

  // Attività H — Criteri Ambientali Minimi
  H01: {
    title: 'CAM nel processo edilizio – Dalla progettazione al cantiere',
    subtitle:
      'Formazione sui Criteri Ambientali Minimi (CAM) applicati al processo edilizio',
    audience: [
      'Professionisti e tecnici coinvolti nella progettazione e realizzazione di opere edili',
    ],
    level: 'base',
    roleTag: 'cam-edilizia',
  },

  // Attività L — Benessere psico-sociale (corsi singoli, non raggruppati)
  L01: {
    title: 'Mindfulness',
    subtitle:
      'Percorso per favorire il benessere psicologico e la gestione dello stress',
    audience: [
      'Lavoratori e team aziendali interessati alla gestione dello stress',
    ],
    level: 'base',
    roleTag: 'mindfulness',
  },
}

/* Gruppi Benessere — L02-L05 vengono ricostruiti dai sotto-moduli */
type BenessereGroup = {
  parentCode: string
  childCodes: string[]
  title: string
  subtitle: string
  audience: string[]
  roleTag: string
}

const BENESSERE_GROUPS: BenessereGroup[] = [
  {
    parentCode: 'L02',
    childCodes: ['L2.1', 'L2.2'],
    title: 'Empowerment',
    subtitle: 'Percorso personale di potenziamento delle risorse individuali',
    audience: [
      'Lavoratori e professionisti interessati a un percorso di empowerment personale',
    ],
    roleTag: 'empowerment',
  },
  {
    parentCode: 'L03',
    childCodes: ['L3.1', 'L3.2', 'L3.3'],
    title: 'Counseling',
    subtitle: 'Percorso individuale per favorire il benessere psicologico',
    audience: [
      'Persone interessate a un percorso individuale di counseling psicologico',
    ],
    roleTag: 'counseling',
  },
  {
    parentCode: 'L04',
    childCodes: ['L4.1', 'L4.2'],
    title: 'Bilancio delle competenze',
    subtitle:
      'Percorso di analisi e valorizzazione delle competenze professionali',
    audience: [
      'Lavoratori e professionisti interessati a un bilancio delle proprie competenze',
    ],
    roleTag: 'bilancio-competenze',
  },
  {
    parentCode: 'L05',
    childCodes: ['L5.1', 'L5.2'],
    title: 'Analisi del benessere organizzativo',
    subtitle:
      'Valutazione per elevare il livello di benessere percepito all’interno dell’organizzazione',
    audience: [
      'Organizzazioni interessate a valutare e migliorare il benessere percepito dai propri lavoratori',
    ],
    roleTag: 'benessere-organizzativo',
  },
]

/* ─── Helper: parsing dati sorgente ──────────────────────────────────────── */

function parseHourToken(token: string): number {
  const hMatch = token.match(/(\d+)\s*h/)
  const mMatch = token.match(/(\d+)\s*[’']/)
  const hours = hMatch ? parseInt(hMatch[1]!, 10) : 0
  const minutes = mMatch ? parseInt(mMatch[1]!, 10) : 0
  return hours + minutes / 60
}

function computeDurationHours(sessions: number, durationEach: string): number {
  if (durationEach.includes('+')) {
    return durationEach
      .split('+')
      .reduce((sum, token) => sum + parseHourToken(token), 0)
  }
  return sessions * parseHourToken(durationEach)
}

function round1(n: number): number {
  return Math.round(n * 10) / 10
}

function parseMinMax(raw: string): { min: number; max: number } | undefined {
  const s = raw.trim()
  if (!s || s === '-') return undefined
  const twoNum = s.match(/(\d+)\s*[/-]\s*(\d+)/)
  if (twoNum)
    return { min: parseInt(twoNum[1]!, 10), max: parseInt(twoNum[2]!, 10) }
  const oneNum = s.match(/(\d+)/)
  if (oneNum) {
    const n = parseInt(oneNum[1]!, 10)
    return { min: n, max: n }
  }
  return undefined
}

function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseModality(mods: string[]): ('aula' | 'online')[] {
  return mods.filter(
    (m): m is 'aula' | 'online' => m === 'aula' || m === 'online'
  )
}

function modalityLabelsIt(mods: string[]): string {
  const labels = mods.map((m) => (m === 'aula' ? 'in aula' : 'online'))
  return labels.join(' e ')
}

function parseNormativeRef(raw: string): string[] | undefined {
  const s = raw.trim()
  if (!s) return undefined
  return s
    .split('·')
    .map((part) => part.trim())
    .filter(Boolean)
}

/* ─── Testo descrittivo (excerpt + body), generato in modo uniforme ─────── */

function buildExcerpt(
  subtitle: string,
  normativeRef: string[] | undefined,
  hours: number
): string {
  const normPart = normativeRef?.length
    ? `, ai sensi di ${normativeRef[0]}`
    : ''
  return `${subtitle}${normPart}, della durata di ${hours} ore.`
}

function buildBody(params: {
  title: string
  subtitle: string
  audience: string[]
  normativeRef: string[] | undefined
  hours: number
  days: number | undefined
  modality: string[]
  participants: { min: number; max: number } | undefined
  hasLevels: boolean
  levelTitles: string[]
}): string {
  const {
    subtitle,
    audience,
    normativeRef,
    hours,
    days,
    modality,
    participants,
    hasLevels,
    levelTitles,
  } = params

  const daysClause =
    days && days > 1 ? ` suddivisa in ${days} incontri/giornate` : ''
  const modalityClause = modality.length
    ? `, erogabile in modalità ${modalityLabelsIt(modality)}`
    : ''

  const p1 = `${subtitle}. Il corso è rivolto a ${audience.join('; ').toLowerCase()}.`

  const p2 = normativeRef?.length
    ? `Il percorso è previsto da ${normativeRef.join(', ')} e ha una durata complessiva di ${hours} ore${daysClause}${modalityClause}.`
    : `Il percorso ha una durata complessiva di ${hours} ore${daysClause}${modalityClause}.`

  const p3 = normativeRef?.length
    ? 'Al termine è rilasciato un attestato di frequenza valido ai fini di legge, previa verifica di apprendimento.'
    : 'Al termine è rilasciato un attestato di partecipazione.'

  const paragraphs = [p1, p2, p3]

  if (participants) {
    paragraphs.push(
      participants.min === participants.max
        ? participants.min === 1
          ? 'Il percorso è individuale, riservato a un singolo partecipante.'
          : `Il percorso è riservato a gruppi di ${participants.min} partecipanti.`
        : `I gruppi sono composti da un minimo di ${participants.min} a un massimo di ${participants.max} partecipanti.`
    )
  }

  if (hasLevels) {
    paragraphs.push(
      `Il percorso è organizzato in livelli progressivi (${levelTitles.join(', ')}), descritti nel programma.`
    )
  }

  return paragraphs.join('\n\n')
}

function buildCertification(hasNormativeRef: boolean): string {
  return hasNormativeRef
    ? 'Attestato di frequenza valido ai fini di legge, rilasciato al termine del percorso formativo previa verifica di apprendimento.'
    : 'Attestato di partecipazione rilasciato al termine del percorso.'
}

/* ─── Costruzione frontmatter + scrittura file ──────────────────────────── */

type LevelDetail = { title: string; hours: number }

type CourseUnit = {
  code: string
  category: string
  meta: Meta
  hours: number
  days: number | undefined
  modality: ('aula' | 'online')[]
  participants: { min: number; max: number } | undefined
  normativeRef: string[] | undefined
  aggiornamento: boolean
  levels: LevelDetail[]
}

function writeCourseFile(unit: CourseUnit): string {
  const {
    code,
    category,
    meta,
    hours,
    days,
    modality,
    participants,
    normativeRef,
    aggiornamento,
    levels,
  } = unit
  const levelTitles = levels.map((l) => l.title)

  const slug = slugify(meta.title)
  const excerpt = buildExcerpt(meta.subtitle, normativeRef, hours)
  const body = buildBody({
    title: meta.title,
    subtitle: meta.subtitle,
    audience: meta.audience,
    normativeRef,
    hours,
    days,
    modality,
    participants,
    hasLevels: levels.length > 0,
    levelTitles,
  })

  const curriculum = levels.map((level) => ({
    title: `Livello ${level.title}`,
    topics: [],
    durationHours: level.hours,
  }))

  const tags = [
    category,
    meta.roleTag,
    ...(aggiornamento ? ['aggiornamento'] : []),
  ]

  const frontmatter: Record<string, unknown> = {
    title: meta.title,
    subtitle: meta.subtitle,
    excerpt,
    code,
    category,
    level: meta.level,
    modality,
    duration: days ? { hours, days } : { hours },
    pricing: { type: 'on-request' },
    certification: buildCertification(Boolean(normativeRef?.length)),
    targetAudience: meta.audience,
    curriculum,
    tags,
    featured: false,
    status: 'published',
    ...(normativeRef?.length ? { normativeRef } : {}),
    ...(participants ? { participants } : {}),
  }

  const file = matter.stringify(body, frontmatter)
  const filepath = join(COURSES_DIR, `${slug}.mdx`)
  writeFileSync(filepath, file, 'utf-8')
  return slug
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

function main() {
  if (!existsSync(RAW_PATH)) {
    console.error(`File sorgente non trovato: ${RAW_PATH}`)
    process.exit(1)
  }
  if (!existsSync(COURSES_DIR)) {
    mkdirSync(COURSES_DIR, { recursive: true })
  }

  const records: RawRecord[] = JSON.parse(readFileSync(RAW_PATH, 'utf-8'))
  const byCode = new Map(records.map((r) => [r.code, r]))

  const generated: { slug: string; category: string; code: string }[] = []
  const handledCodes = new Set<string>()

  /* Gruppi Benessere prima (consumano più record ciascuno) */
  for (const group of BENESSERE_GROUPS) {
    const children = group.childCodes
      .map((c) => byCode.get(c))
      .filter((r): r is RawRecord => Boolean(r))

    if (children.length !== group.childCodes.length) {
      throw new Error(`Sotto-moduli mancanti per ${group.parentCode}`)
    }

    let totalHours = 0
    let totalSessions = 0
    const levels: LevelDetail[] = []
    let participants: { min: number; max: number } | undefined

    for (const child of children) {
      const sessions = parseInt(child.sessions, 10)
      const h = round1(computeDurationHours(sessions, child.durationEach))
      totalHours += h
      totalSessions += sessions
      const rawLabel = child.title
        .replace(/^MODULO\s+/i, '')
        .trim()
        .toUpperCase()
      const label = LEVEL_LABEL_IT[rawLabel] ?? rawLabel
      levels.push({ title: label, hours: h })
      const p = parseMinMax(child.minMax)
      if (p) participants = p // livelli omogenei, stesso minMax
    }

    const unit: CourseUnit = {
      code: group.parentCode,
      category: children[0]!.category,
      meta: {
        title: group.title,
        subtitle: group.subtitle,
        audience: group.audience,
        level: 'base',
        roleTag: group.roleTag,
      },
      hours: round1(totalHours),
      days: totalSessions,
      modality: parseModality(children[0]!.modality),
      participants,
      normativeRef: undefined,
      aggiornamento: false,
      levels,
    }

    const slug = writeCourseFile(unit)
    generated.push({ slug, category: unit.category, code: group.parentCode })

    handledCodes.add(group.parentCode)
    for (const c of group.childCodes) handledCodes.add(c)
  }

  /* Corsi singoli */
  for (const record of records) {
    if (handledCodes.has(record.code)) continue
    if (SKIP_CODES.has(record.code)) continue

    const meta = META[record.code]
    if (!meta) {
      throw new Error(`Metadati mancanti per il codice ${record.code}`)
    }

    const sessions = parseInt(record.sessions, 10)
    const hours = round1(computeDurationHours(sessions, record.durationEach))
    const days = Number.isFinite(sessions) ? sessions : undefined

    const unit: CourseUnit = {
      code: record.code,
      category: record.category,
      meta,
      hours,
      days,
      modality: parseModality(record.modality),
      participants: parseMinMax(record.minMax),
      normativeRef: parseNormativeRef(record.normativeRef),
      aggiornamento: /AGGIORNAMENTO/i.test(record.title),
      levels: [],
    }

    const slug = writeCourseFile(unit)
    generated.push({ slug, category: unit.category, code: record.code })
  }

  console.log(`\n✅ Generati ${generated.length} corsi in ${COURSES_DIR}\n`)
  const byCategory = new Map<string, number>()
  for (const g of generated) {
    byCategory.set(g.category, (byCategory.get(g.category) ?? 0) + 1)
  }
  for (const [cat, count] of byCategory) {
    console.log(`  ${cat}: ${count}`)
  }
}

main()
