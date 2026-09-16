# Piano di riscrittura delle descrizioni corsi

**Stato:** piano — **nessun `.mdx` è stato modificato.**
**Data:** 16 settembre 2026
**Branch:** `docs/piano-descrizioni`

---

## 1. Fonti (lette integralmente, nessun contenuto inventato)

| # | Fonte | Dettagli |
|---|-------|----------|
| F1 | `ECO-TER_Descrizioni_Corsi_rev_01.docx` | Revisione del responsabile. 1 190 paragrafi, 65 corsi (`Titolo2`), 684 run evidenziati: **247 gialli**, **437 verdi**. 3 paragrafi con stile `Testocommento` = commenti di Gaetano Trezza. |
| F2 | `Accordo Stato Regioni 20250417 atto-rep-n-59.pdf` | 412 pagine. Il testo utile è l'**Allegato A** (138 pagine interne), ripetuto 3 volte nel PDF (copia + 2 versioni sottoscritte). Riferimenti qui sotto = numerazione interna «Pag. X a 138». |
| F3 | `apps/website/content/courses/*.mdx` | 65 corsi sul sito. |

### Come sono state estratte

- **F1**: `docx` scompattato → `word/document.xml`, letti i `w:highlight val="yellow"|"green"` run per run e i paragrafi con `pStyle = Testocommento`.
  ⚠️ **Il `.docx` NON contiene `word/comments.xml`**: i commenti di Word non sono stati esportati come commenti veri, ma **appiattiti nel corpo del documento** come paragrafi con stile `Testocommento` (che inglobano anche il titolo del corso a cui erano ancorati, lasciando vuoto il `Titolo2` corrispondente). I commenti recuperabili sono quindi **solo 3** (§3). Se in Word ne esistevano altri, **sono andati persi in questo export** → vedi DUBBIO D1.
- **F2**: testo estratto pagina per pagina con PyMuPDF. ⚠️ Le tabelle moduli escono con le **colonne interlacciate** in estrazione testo semplice: l'estrazione definitiva dovrà usare il riconoscimento di tabella/clustering per colonna (vedi DUBBIO D9).

---

## 2. Legenda evidenziazioni (come le ho interpretate)

| Colore | Uso osservato nel documento | Conseguenza |
|--------|------------------------------|-------------|
| **GIALLO** (247 run) | Interventi puntuali del revisore dentro corsi che restano a catalogo: parole da correggere (acronimi in minuscolo, numeri, livelli), oppure **frasi intere già riscritte** da inserire così come sono. | Correzione da applicare. |
| **VERDE** (437 run) | Evidenzia **blocchi interi di corso** (titolo + tutta la scheda) di 4 corsi + il testo dei commenti. | Errore grave: corso da rimuovere/rifare. |

I 5 corsi toccati dal verde e/o dai commenti sono esattamente i 5 che sul sito hanno lo **schema "ricco"** scritto a mano (`objectives`, `prerequisites`, `curriculum` popolati): `rspp-modulo-a`, `antincendio-rischio-medio`, `primo-soccorso-b`, `auditor-interno-iso-9001`, `iso-45001-implementatore`. Gli altri 60 hanno schede generate automaticamente con `curriculum: []`.

---

## 3. Commenti di Gaetano Trezza (testuali, tutti e 3)

> **(par. 0862, ancorato a «RSPP – MODULO A: FORMAZIONE GENERALE»)**
> `CORSO DA SPOSTARE IN B03`

> **(par. 0992, ancorato a «Auditor Interno ISO 9001:2015»)**
> `Anche questo corso non esiste a catalogo`

> **(par. 1036, ancorato a «Implementatore ISO 45001:2018»)**
> `Anche questo corso non esiste a catalogo`

Nota: il codice **B03 è effettivamente libero** — la numerazione del sito salta da B02 a B04. La richiesta è coerente.
Nota: l'avverbio «**Anche** questo» implica un commento precedente dello stesso tenore, che nel `.docx` **non esiste più** → DUBBIO D1/D2.

---

## 4. Regole di merge applicate in questo piano

1. Corso del sito **presente nell'Accordo** → descrizione **sostituita** col testo ufficiale, strutturato:
   **Introduzione** + **Obiettivi di corso** + **Requisiti** + per ogni modulo (**nome modulo** + **contenuti del modulo**).
   **Esclusa sempre** la colonna «obiettivi formativi» delle tabelle modulo. Gli «Obiettivi» a livello di corso **restano**.
2. Le correzioni **gialle/verdi** e i commenti si applicano **comunque**, anche ai corsi non presenti nell'Accordo.
3. Corso **non nell'Accordo** → solo correzioni di Gaetano, nessun testo nuovo.
4. Mappatura non certa → **non forzata**, finisce nei DUBBI.

Azioni usate nelle schede: `sostituzione-da-Accordo` · `solo-correzioni` · `invariato` · `da-decidere`.

---

## 5. Quadro sintetico

- Corsi sul sito: **65**
- Mappati all'Accordo con certezza: **37** → `sostituzione-da-Accordo`
- Non nell'Accordo, con correzioni di Gaetano: **19** → `solo-correzioni`
- Non nell'Accordo, senza alcun segno: **5** → `invariato`
- Bloccati da una decisione del committente: **4** → `da-decidere`

| Categoria | Corsi | Nell'Accordo |
|---|---|---|
| Sicurezza sul lavoro | 53 | 37 |
| Ambiente | 5 | 0 |
| Sistemi di gestione | 2 | 0 |
| Benessere psico-sociale | 5 | 0 |

---

## 6. Schede corso

Formato: **slug** · titolo — **Accordo?** — *segni di Gaetano* — **azione**.
«già sul sito» = ho verificato il `.mdx` e la correzione risulta **già applicata**; «da applicare» = verificato, **non ancora applicata**.

### 6.1 Sicurezza — Lavoratori, preposti, dirigenti, datori di lavoro (A01–A15)

Tutti e 15 sono nell'Accordo. Attenzione: A01–A04 discendono **dalla stessa sezione** (§2.1) → DUBBIO D5.

**`lavoratori-rischio-generale`** · A01 — Lavoratori – Rischio generale
- Accordo: **SÌ** — Allegato A, Parte II, §2.1 «CORSO PER LAVORATORI» → *Formazione Generale* (4 ore), Pag. 12-13. Ha «Obiettivi» di corso; la tabella è `Contenuti | ORE` (nessuna colonna «obiettivi formativi»).
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata sito 4h = Accordo ✓.

**`lavoratori-rischio-specifico-basso`** · A02
- Accordo: **SÌ** — Parte II, §2.1 → *Formazione Specifica*, 4 ore (classe di rischio basso), Pag. 13-15 + §2.1.1 «Condizioni particolari».
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 4h ✓.

**`lavoratori-rischio-specifico-medio`** · A03
- Accordo: **SÌ** — Parte II, §2.1 → *Formazione Specifica*, 8 ore (rischio medio).
- Gaetano (2 gialli):
  - `Codice A03 · Intermedio · Aula, Online · 8 ore (1 giornata) «·  4»–35 partecipanti`
  - `I gruppi sono composti da un minimo «di 4» a un massimo di 35 partecipanti.`
  → minimo partecipanti da correggere. **Già sul sito**: `participants.min: 6`. La correzione risulta **già applicata** (4 → 6).
- **Azione: `sostituzione-da-Accordo`** (+ nessuna correzione residua). Durata 8h ✓.

**`lavoratori-rischio-specifico-alto`** · A04
- Accordo: **SÌ** — Parte II, §2.1 → *Formazione Specifica*, 12 ore (rischio alto).
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 12h ✓.

**`aggiornamento-lavoratori-rischio-basso-medio-e-alto`** · A05
- Accordo: **SÌ** — Parte III, §1.1 «Lavoratori», Pag. 83 (quinquennale, minimo 6 ore). ⚠️ Testo discorsivo, **senza tabella moduli**.
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`** (solo Introduzione + Obiettivi generali di Parte III §1; nessun modulo). Durata 6h ✓.

**`preposti`** · A06
- Accordo: **SÌ** — Parte II, §2.2 «CORSO PER PREPOSTI», Pag. 15-17. Ha **Obiettivi** *e* **Requisiti di accesso** («Al corso per preposti si accede solo dopo aver frequentato la formazione (generale e specifica) per lavoratori»). Durata minima 12 ore. Tabella a 4 moduli: *Giuridico normativo* · *Gestione e organizzazione della sicurezza* · *Valutazione delle situazioni di rischio e controllo della corretta esecuzione da parte dei lavoratori delle attività* · *Comunicazione e informazione*.
- Gaetano (2 gialli, **incoerenti fra loro** → DUBBIO D3):
  - sottotitolo: `Formazione obbligatoria per lavoratori con «mansioni» di preposto`
  - descrizione: `Formazione obbligatoria per lavoratori «con ruolo» di preposto. Il corso è rivolto ai lavoratori che svolgono «il ruolo» di preposto.`
  - **Già sul sito**: «con **funzioni** di preposto» / «Lavoratori investiti di **funzioni** di preposto» — cioè una **terza** variante, né «mansioni» né «ruolo».
- **Azione: `sostituzione-da-Accordo`** + decidere il lemma (D3). Durata 12h ✓.

**`aggiornamento-preposti-validita-biennale`** · A07
- Accordo: **SÌ** — Parte III, §1.2 «Preposti», Pag. 83 (cadenza biennale, minimo 6 ore). Senza tabella moduli.
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 6h + biennale ✓.

**`dirigenti`** · A08
- Accordo: **SÌ** — Parte II, §2.3 «CORSO PER DIRIGENTE», Pag. 17-19. Obiettivi a)–e), durata minima 12 ore, tabella moduli (giuridico normativo, gestione e organizzazione, valutazione dei rischi, comunicazione/formazione).
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 12h ✓.

**`dirigenti-modulo-aggiuntivo-cantieri`** · A09
- Accordo: **SÌ** — Parte II, §2.3, «**Modulo aggiuntivo "Cantieri"**: durata minima 6 ore», Pag. 19. Modulo unico: *Compiti specifici del dirigente dell'impresa affidataria nei cantieri temporanei e mobili*.
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 6h ✓. Da citare il collegamento all'art. 97 c. 3-ter D.Lgs. 81/2008.

**`aggiornamento-dirigenti`** · A10
- Accordo: **SÌ** — Parte III, §1.3 «Dirigenti», Pag. 83 (quinquennale, minimo 6 ore).
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 6h ✓.

**`datori-di-lavoro`** · A11
- Accordo: **SÌ** — Parte II, §3 «CORSO PER DATORE DI LAVORO», Pag. 19-21. Obiettivi a)–e), **durata minima 16 ore**, tabella moduli.
- Gaetano (1 giallo, frase intera riscritta):
  - `…durata complessiva di 16 ore suddivisa «in 2 o 4 incontri/giornate, erogabili in modalità online o in presenza.»`
  - **Da applicare**: sul sito c'è ancora «suddivisa in 2 incontri/giornate, erogabile in modalità in aula e online».
- **Azione: `sostituzione-da-Accordo`** + inserire la formulazione gialla su giornate/modalità. Durata 16h ✓.

**`datori-di-lavoro-modulo-aggiuntivo-cantieri`** · A12
- Accordo: **SÌ** — Parte II, §3, «**Modulo aggiuntivo "Cantieri"**: durata minima 6 ore», Pag. 21. Modulo unico: *Compiti specifici del datore di lavoro dell'impresa affidataria nei cantieri temporanei e mobili*.
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 6h ✓.

**`aggiornamento-datori-di-lavoro`** · A13
- Accordo: **SÌ** — Parte III, §1.4 «Datore di lavoro», Pag. 84 (quinquennale, minimo 6 ore; se frequentato il modulo «Cantiere», l'aggiornamento copre anche quei temi).
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 6h ✓.

**`lavoratori-e-datori-di-lavoro-ambienti-sospetti-di-inquinamento-o-confinati-d-p-r-177-2011`** · A14
- Accordo: **SÌ** — Parte II, §7, Pag. 40-41. Obiettivi a)–d), **durata minima 12 ore**, 2 moduli: *Giuridico-Tecnico (4 ore)* e *Parte Pratica (8 ore)*. Presente anche «Requisiti dei docenti».
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 12h ✓.

**`aggiornamento-ambienti-sospetti-di-inquinamento-o-confinati-d-p-r-177-2011`** · A15
- Accordo: **SÌ** — Parte III, §5, Pag. 84 (quinquennale, minimo 4 ore **di parte pratica**).
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 4h ✓.

### 6.2 Sicurezza — RLS (A16–A17)

**`rappresentante-dei-lavoratori-per-la-sicurezza-rls`** · A16 — 32h
- Accordo: **NO**. L'RLS compare **solo** nelle tabelle crediti/aggiornamento degli allegati (`RLS 4/8 ore annue`, art. 37 D.Lgs. 81/2008): nessun programma, nessuna tabella moduli. La formazione RLS resta rinviata alla contrattazione collettiva.
- Gaetano: nessun segno.
- **Azione: `invariato`**.

**`aggiornamento-rls`** · A17 — 8h
- Accordo: **NO** (stesso motivo). Il riferimento «4/8 ore annue» degli allegati è coerente con le 8h del sito ma **non è una descrizione di corso**.
- Gaetano: nessun segno.
- **Azione: `invariato`**.

### 6.3 Sicurezza — Coordinatori, RSPP/ASPP, formatori (B01–B18 + Modulo A)

**`coordinatori-per-la-sicurezza-in-progettazione-ed-esecuzione-csp-cse-120h`** · B01
- Accordo: **SÌ** — Parte II, §6 «CORSO DI FORMAZIONE PER I COORDINATORI PER LA PROGETTAZIONE E PER L'ESECUZIONE DEI LAVORI (Allegato XIV D.Lgs. 81/08)», Pag. 36-39. Obiettivi (9 punti), **durata minima 120 ore**, tabella moduli (*Modulo giuridico 28 ore*, ecc.), + «Verifica finale di apprendimento» e «Modalità di svolgimento dei corsi».
- Gaetano (2 gialli): `…in fase di progettazione «(CSP)» o di esecuzione «(CSE).»`
  → **da applicare**: sul sito le sigle sono minuscole («(csp)», «(cse)»).
- **Azione: `sostituzione-da-Accordo`** + fix maiuscole sigle. Durata 120h ✓.

**`aggiornamento-coordinatori-csp-cse-40h`** · B02
- Accordo: **SÌ** — Parte III, §4 «Coordinatore per la sicurezza», Pag. 84 (quinquennale, **40 ore**, stesse modalità RSPP).
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 40h ✓.

**`rspp-modulo-a`** · *(senza codice)* — RSPP – Modulo A: Formazione Generale, 28h
- Accordo: **SÌ** — Parte II, §5.2 «MODULO A», Pag. 25-28. Introduzione («Il Modulo A costituisce il corso base per lo svolgimento della funzione di RSPP e di ASPP… propedeutico per l'accesso agli altri moduli»), elenco di ciò che il modulo «deve consentire di conoscere», **durata minima complessiva 28 ore**, «Articolazione dei contenuti minimi del Modulo A» in unità didattiche (A1 – 8 ore, …). Requisiti/esoneri in §5.1 + Allegato I.
- Gaetano: **COMMENTO** → `CORSO DA SPOSTARE IN B03`.
- **Azione: `sostituzione-da-Accordo`** + **assegnare `code: B03`** e ricollocarlo nella sequenza B (oggi il file non ha `code`). Durata 28h ✓.
- Nota: la scheda attuale contiene contenuti scritti a mano non tracciabili all'Accordo (es. «OHSAS 18001», «Modello 231», prezzo `490 EUR`): la sostituzione li elimina. Il prezzo va deciso a parte (D8).

**`rspp-modulo-b-propedeutico-a-tutti-i-settori-48h`** · B04
- Accordo: **SÌ** — Parte II, §5.3 «MODULO B» → *Modulo B comune a tutti i settori produttivi*, **48 ore**, Pag. 28-31. Introduzione + elenco conoscenze/abilità + «Articolazione dei contenuti minimi del Modulo B comune (48 ore)» in UD1…UDn. Requisito: il Modulo A è propedeutico; il B comune è propedeutico ai moduli di specializzazione.
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Durata 48h ✓.

**`rspp-modulo-b-sp1-agricoltura-silvicoltura-e-zootecnia-16h`** · B05
- Accordo: **SÌ** — §5.3, *Modulo B-SP1: Agricoltura, silvicoltura e zootecnia (16 ore)*, Pag. 31. Contenuti in UD1–UD11. ATECO A 01-02.
- Gaetano: nessun segno. **Azione: `sostituzione-da-Accordo`**. 16h ✓.

**`rspp-modulo-b-sp2-settore-pesca-12h`** · B06
- Accordo: **SÌ** — §5.3, *Modulo B-SP2: Pesca (12 ore)*. ATECO A 03.
- Gaetano: nessun segno. **Azione: `sostituzione-da-Accordo`**. 12h ✓.

**`rspp-modulo-b-sp3-settore-costruzioni-16h`** · B07
- Accordo: **SÌ** — §5.3, *Modulo B-SP3: Costruzioni (16 ore)*. ATECO F.
- Gaetano: nessun segno. **Azione: `sostituzione-da-Accordo`**. 16h ✓.

**`rspp-modulo-b-sp4-settore-sanita-residenziale-12h`** · B08
- Accordo: **SÌ** — §5.3, *Modulo B-SP4: Sanità residenziale (12 ore)*. ATECO Q (86.1, 87).
- Gaetano: nessun segno. **Azione: `sostituzione-da-Accordo`**. 12h ✓.

**`rspp-modulo-b-sp5-settore-chimico-petrolchimico-16h`** · B09
- Accordo: **SÌ** — §5.3, *Modulo B-SP5: Chimico-Petrolchimico (16 ore)*. ATECO C (19, 20).
- Gaetano: nessun segno. **Azione: `sostituzione-da-Accordo`**. 16h ✓.

**`rspp-modulo-c-gestione-e-organizzazione-24h`** · B10
- Accordo: **SÌ** — Parte II, §5.4 «MODULO C», Pag. 33-36. «Corso di specializzazione per le sole funzioni di RSPP», **24 ore**, elenco conoscenze/abilità, «Articolazione dei contenuti minimi del Modulo C» (UD C1 – 8 ore, …).
- Gaetano: nessun segno. **Azione: `sostituzione-da-Accordo`**. 24h ✓.

**`aggiornamento-rspp-tutti-i-settori-40h`** · B11
- Accordo: **SÌ** — Parte III, §3, Pag. 84: quinquennale dalla fine del Modulo B comune, **RSPP: 40 ore**, distribuibili nel quinquennio.
- Gaetano (1 giallo): `Il corso è rivolto a «RSPP» già formati…` → **da applicare** (sul sito: «rivolto a **rspp** già formati», sigla in minuscolo).
- **Azione: `sostituzione-da-Accordo`** + fix maiuscole. 40h ✓.

**`aggiornamento-aspp-tutti-i-settori-20h`** · B12
- Accordo: **SÌ** — Parte III, §3, Pag. 84: **ASPP: 20 ore**.
- Gaetano (1 giallo): `Il corso è rivolto a «ASPP» già formati…` → **da applicare** (sul sito «aspp»).
- **Azione: `sostituzione-da-Accordo`** + fix maiuscole. 20h ✓.

**`datori-di-lavoro-rspp-modulo-comune-8h`** · B13
- Accordo: **SÌ** — Parte II, §4 «CORSO PER DATORE DI LAVORO CHE SVOLGE DIRETTAMENTE I COMPITI DI PREVENZIONE E PROTEZIONE (art. 34)», *Modulo comune: durata 8 ore*, Pag. 22-23. Obiettivi + «Articolazione del percorso formativo» + **requisito di accesso esplicito**: «Al modulo comune si accede dopo aver frequentato il corso propedeutico per datore di lavoro di cui al punto 3» (= A11). Moduli: *Il processo di valutazione: criteri e metodologie* · *I fattori di rischio e misure di prevenzione e protezione* · *Esercitazione*.
- Gaetano (1 giallo): `…svolgere direttamente il ruolo di «RSPP».` → **da applicare** (sul sito «di rspp»).
- **Azione: `sostituzione-da-Accordo`** + fix maiuscole. 8h ✓.

**`datori-di-lavoro-rspp-modulo-integrativo-settori-sp1-sp3-sp4-sp5-16h`** · B14
- Accordo: **SÌ, ma con disallineamento** — Parte II, §4, «Moduli tecnici-integrativi», Pag. 23-24. L'Accordo ne prevede **quattro**: *Modulo integrativo 1 – Agricoltura, Silvicoltura, Zootecnia (16 ore)*; *2 – Pesca (12 ore)*; *3 – Costruzioni (16 ore)*; *4 – Chimico-Petrolchimico (16 ore)*. **Non esiste un modulo integrativo "Sanità residenziale"** per il datore di lavoro-RSPP, mentre il titolo del corso sul sito cita «SP4».
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`** → ma **il titolo va corretto** in «settori SP1, SP3, SP5» (o rinominato secondo i nomi dell'Accordo). → **DUBBIO D4**.

**`datori-di-lavoro-rspp-modulo-integrativo-settore-sp2-12h`** · B15
- Accordo: **SÌ** — Parte II, §4, *Modulo integrativo 2 – Pesca (12 ore)*.
- Gaetano (1 giallo): `…operanti nel settore «SP2» (pesca).` → **da applicare** (sul sito «settore sp2»).
- **Azione: `sostituzione-da-Accordo`** + fix maiuscole. 12h ✓.

**`aggiornamento-datori-di-lavoro-rspp-settori-sp1-sp5-8h`** · B16
- Accordo: **SÌ** — Parte III, §2 «Datore di lavoro che svolge i compiti del servizio di prevenzione e protezione», Pag. 84: quinquennale dalla conclusione del modulo comune, **minimo 8 ore**; se frequentati i moduli specialistici l'aggiornamento li copre.
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. 8h ✓.

**`formatori-della-sicurezza-24h`** · B17
- Accordo: **NO**. L'Accordo non descrive un corso per formatori: la Parte I, §2 «Requisiti dei docenti» rinvia alla normativa vigente (D.I. 6 marzo 2013).
- Gaetano: nessun segno.
- **Azione: `invariato`**.

**`aggiornamento-formatori-della-sicurezza-24h`** · B18
- Accordo: **NO** (stesso motivo). Gaetano: nessun segno.
- **Azione: `invariato`**.

### 6.4 Sicurezza — Attrezzature art. 73 c. 5 (C01–C06)

**`addetti-alle-piattaforme-di-lavoro-mobili-elevabili-ple`** · C01 — 10h
- Accordo: **SÌ** — Parte II, §8.3.1 «Corso di formazione teorico-pratico per lavoratori addetti alla conduzione di piattaforme di lavoro mobili elevabili (PLE)», Pag. 43-45. Tabella `Modulo | Obiettivi | Contenuti del Modulo`: *1. Teorico-Tecnico (4 ore)*; *2. Parte Pratica PLE che operano su stabilizzatori (4 ore)*; *3. Parte Pratica PLE che possono operare senza stabilizzatori (4 ore)*; *4. Parte Pratica PLE con e senza stabilizzatori (6 ore)* + sezione «Verifica». Requisiti generali (area e attrezzature) in §8.1, requisiti docenti in §8.2.
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. Le 10h del sito = 4 (teorico) + 6 (modulo 4, «con o senza stabilizzatori») ✓ coerente col sottotitolo attuale.

**`aggiornamento-addetti-ple`** · C02 — 4h
- Accordo: **SÌ** — Parte III, §6, Pag. 84 (quinquennale, minimo **4 ore di parte pratica**).
- Gaetano (1 giallo): `Il corso è rivolto a addetti «PLE» già formati…` → **da applicare** (sul sito «addetti ple»).
- **Azione: `sostituzione-da-Accordo`** + fix maiuscole. 4h ✓.

**`addetti-alla-conduzione-di-gru-per-autocarro`** · C03 — 12h
- Accordo: **SÌ** — Parte II, §8.3.2, Pag. 47-48. *1. Teorico-Tecnico (4 ore)* + *2. Modulo pratico (8 ore)* + «Verifica».
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. 4+8 = 12h ✓.

**`aggiornamento-addetti-gru-per-autocarro`** · C04 — 4h
- Accordo: **SÌ** — Parte III, §6. Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. 4h ✓.

**`addetti-alla-conduzione-di-carrelli-elevatori-semoventi`** · C05 — 12h
- Accordo: **SÌ** — Parte II, §8.3.4 «…carrelli elevatori semoventi con conducente a bordo», Pag. 54-56. *1. Teorico-Tecnico (8 ore)* + parti pratiche (4 ore ciascuna per tipologia) + «Verifica».
- Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. 8+4 = 12h ✓. Da chiarire quale/quali parti pratiche eroga ECOTER (D6).

**`aggiornamento-addetti-carrelli-elevatori-semoventi`** · C06 — 4h
- Accordo: **SÌ** — Parte III, §6. Gaetano: nessun segno.
- **Azione: `sostituzione-da-Accordo`**. 4h ✓.

### 6.5 Sicurezza — Rischio elettrico (D01–D04) — nessuno nell'Accordo

**`pes-pav-persone-esperte-e-avvertite-norme-cei-11-27-2025`** · D01
- Accordo: **NO** (materia CEI 11-27, art. 82 D.Lgs. 81/08).
- Gaetano (3 gialli):
  - sottotitolo: `Formazione per l'abilitazione a lavori elettrici «fuori tensione», sotto tensione o in prossimità` → **aggiungere «fuori tensione»** (sul sito manca).
  - descrizione: `…in qualità di persona esperta («PES») o avvertita («PAV»)` → **fix maiuscole** (sul sito «(pes)», «(pav)»).
  - la frase finale già presente nel docx «Per i lavori sotto tensione in BT è necessaria anche essere persone idonee (PEI)» **non è sul sito** → da inserire (rivedendo la concordanza: «è necessario essere anche persone idonee»).
- **Azione: `solo-correzioni`**.

**`pei-persone-idonee-all-esecuzione-norme-cei-11-27-2025`** · D02 — **riscrittura integrale già fornita da Gaetano**
- Accordo: **NO**.
- Gaetano (4 gialli, tutti testo nuovo; sul sito c'è ancora la versione vecchia):
  - titolo: `PEI – «Persona Idonea» (Norme CEI 11-27:2025)` → il sito ha «PEI – Persone idonee all'esecuzione (Norme CEI 11-27:2025)».
  - sottotitolo: `«Formazione per lavoratori PES o PAV che devono intervenire su impianti BT sotto tensione.»` → sostituisce «Formazione per l'esecuzione di semplici manovre e verifiche su impianti elettrici».
  - descrizione: `«Formazione per il lavoratore PES o PAV che devono eseguire lavori su impianti elettrici sotto tensione. Il corso è rivolto a lavoratori, PES o PAV, che devono eseguire lavori su impianti elettrici sotto tensione come persona idonea (PEI).»`
  - destinatari: `Lavoratori, «PES o PAV, che devono eseguire lavori su impianti elettrici sotto tensione come persona idonea (PEI).»`
- **Azione: `solo-correzioni`** (di fatto riscrittura completa con il testo di Gaetano). Nota: nel docx l'indice riporta ancora il titolo vecchio con «- CEI EN 61447», il corpo no → D7.

**`aggiornamento-pes-pav-norme-cei-11-27-2025`** · D03
- Accordo: **NO**.
- Gaetano (1 giallo): `Il corso è rivolto a «PES/PAV» già formati…` → **da applicare** (sul sito «pes/pav»).
- **Azione: `solo-correzioni`**.

**`responsabili-e-addetti-alla-manutenzione-delle-cabine-elettriche-cei-78-17`** · D04
- Accordo: **NO**.
- Gaetano (4 gialli):
  - `Codice D04 · Avanzato · Aula · 8 ore (1 giornata) «·  2 – 6 partecipanti»` → **da applicare**: sul sito `min: 4 / max: 35`.
  - `Riferimenti normativi: D.Lgs 81/08 art. 82; CEI 11-27:2025, «CEI 78-17»` → **da applicare**: `normativeRef` sul sito non contiene CEI 78-17.
  - `«Il percorso è strutturato secondo le norme CEI 78-17, CEI 11-27:2025 e dal D. Lgs 81/08 art. 82, ha una durata complessiva di 8 ore ed è erogabile in presenza.»` → frase riscritta, da sostituire.
  - `I gruppi sono composti da un minimo di «2 a un massimo di 6 partecipanti».`
- **Azione: `solo-correzioni`**.

### 6.6 Sicurezza — Rischi specifici e attrezzature a pressione (E01–E05, F01) — nessuno nell'Accordo

**`gestione-e-valutazione-del-rischio-chimico`** · E01 — Accordo: **NO**.
Gaetano (2 gialli): `…rivolto a «RSPP», «ASPP», preposti e lavoratori…` → fix maiuscole, **da applicare** (sito: «rspp, aspp»). **Azione: `solo-correzioni`**.

**`gestione-e-valutazione-del-rischio-rumore`** · E02 — Accordo: **NO**.
Gaetano: idem, `«RSPP»`, `«ASPP»` → fix maiuscole. **Azione: `solo-correzioni`**.

**`gestione-e-valutazione-del-rischio-vibrazioni`** · E03 — Accordo: **NO**.
Gaetano: idem, `«RSPP»`, `«ASPP»`. **Azione: `solo-correzioni`**.

**`gestione-e-valutazione-del-rischio-movimentazione-manuale-dei-carichi-mmc`** · E04 — Accordo: **NO**.
Gaetano: `…rivolto a «RSPP, ASPP», preposti…`. **Azione: `solo-correzioni`**.

**`gestione-e-valutazione-del-rischio-biologico`** · E05 — Accordo: **NO**.
Gaetano: `…rivolto a «RSPP, ASPP», preposti…`. **Azione: `solo-correzioni`**.

*(Nota: i rischi chimico/rumore/vibrazioni/biologico/MMC compaiono nell'Accordo solo come **argomenti** dentro i Moduli B e la formazione specifica lavoratori, mai come corsi autonomi: non sono mappabili.)*

**`identificazione-ed-esercizio-di-impianti-e-attrezzature-a-pressione`** · F01 — Accordo: **NO** (Direttiva PED / DM 329/04).
Gaetano (1 giallo): `Codice F01 · «Base» · Aula, Online · 4 ore…` → **da applicare**: sul sito `level: intermedio`, va portato a `base`. **Azione: `solo-correzioni`**.

### 6.7 Sicurezza — Corsi flaggati in VERDE (emergenze)

**`antincendio-rischio-medio`** · *(senza codice)* — 8h, D.M. 02/09/2021
- Accordo: **NO**. Anzi, la Parte III dell'Accordo dice espressamente che la formazione antincendio/primo soccorso (artt. 44, 45, 46) **non è valida ai fini dell'aggiornamento** delle figure dell'Accordo.
- Gaetano: **l'intera scheda è evidenziata in VERDE** (titolo, sottotitolo, descrizione, obiettivi, prerequisiti, programma: par. 0774-0812). Nessun testo di commento sopravvissuto nell'export.
- **Azione: `da-decidere`** → DUBBIO D2. Il verde, per come è usato sugli altri corsi, significa «corso da rimuovere/non a catalogo», ma qui manca la frase esplicita.

**`primo-soccorso-b`** · *(senza codice)* — 12h, D.M. 388/2003
- Accordo: **NO** (stesso motivo).
- Gaetano: **intera scheda in VERDE** (par. 0814-0860).
- **Azione: `da-decidere`** → DUBBIO D2.

### 6.8 Ambiente (G01–G04, H01) — nessuno nell'Accordo

**`gestione-operativa-dei-rifiuti`** · G01 — Accordo: **NO** (D.Lgs. 152/06).
Gaetano (1 giallo): `«Il corso ha come riferimento il D.Lgs 152/06 ed ha» una durata complessiva di 4 ore…` → riformulazione (oggi sul sito: «Il percorso è previsto da D.Lgs 152/06 e ha…»). **Azione: `solo-correzioni`**.

**`gestione-delle-terre-e-rocce-da-scavo`** · G02 — Accordo: **NO**.
Gaetano (2 gialli): stessa riformulazione «Il corso ha come riferimento il D.Lgs 152/06 ed ha…»; + **nuovo destinatario da aggiungere**: `«HSE; Preposti; RSPP/ASPP; CSP/CSE; Direttori Ambientali; Direttore dei lavori»` (sul sito `targetAudience` ha solo «Tecnici e responsabili di cantiere…»). **Azione: `solo-correzioni`**.

**`gestione-delle-emergenze-ambientali`** · G03 — Accordo: **NO**.
Gaetano (3 gialli): `Formazione sulla gestione «pratica» delle emergenze ambientali…` (aggiungere «pratica»); riformulazione «Il corso ha come riferimento il D.Lgs 152/06 ed ha…»; nuovo destinatario `«HSE; Preposti; RSPP/ASPP; CSP/CSE; Direttori Ambientali; Direttore dei lavori»`. **Azione: `solo-correzioni`**.

**`sostenibilita-per-le-pmi-il-bilancio-di-sostenibilita-come-strumento-strategico`** · G04 — Accordo: **NO**.
Gaetano (4 gialli):
- `Codice G04 «·  Base» · Aula, Online · 4 ore…` → **da applicare**: sul sito `level: intermedio` → `base`.
- `…responsabili di «PMI» interessati…` → fix maiuscole (sito: «di pmi»).
- `Il corso «si basa sul D.Lgs 152/06» e ha una durata…` → riformulazione.
- `…un minimo di 4 «ad» un massimo di 35 partecipanti.` → «ad» al posto di «a».
**Azione: `solo-correzioni`**.

**`cam-nel-processo-edilizio-dalla-progettazione-al-cantiere`** · H01 — Accordo: **NO** (CAM).
Gaetano: **nessun segno** (l'evidenziazione verde vicina appartiene al titolo di sezione «Sistemi di Gestione», non a questo corso). **Azione: `invariato`**.

### 6.9 Sistemi di gestione — flaggati in VERDE + commento

**`auditor-interno-iso-9001`** · *(senza codice)* — ISO 9001:2015, 16h
- Accordo: **NO**.
- Gaetano: **COMMENTO** → `Anche questo corso non esiste a catalogo`; **intera scheda in VERDE** (par. 0993-1034), **compreso il titolo di sezione** `Sistemi di Gestione   2 corsi`.
- **Azione: `da-decidere`** → rimozione del corso (e, se entrambi i corsi ISO escono, dell'intera categoria `sistemi-di-gestione`) → DUBBIO D2.

**`iso-45001-implementatore`** · *(senza codice)* — ISO 45001:2018, 24h
- Accordo: **NO**.
- Gaetano: **COMMENTO** → `Anche questo corso non esiste a catalogo`; **intera scheda in VERDE** (par. 1037-1085).
- **Azione: `da-decidere`** → DUBBIO D2.

### 6.10 Benessere psico-sociale (L01–L05) — nessuno nell'Accordo

**`mindfulness`** · L01 — Accordo: **NO**.
Gaetano (3 gialli):
- `Codice L01 · Base · Aula · 12 ore («8 incontri)»` → «incontri», non «giornate».
- `…durata complessiva di 12 ore suddivisa «in 8 incontri da 1,5 h,» erogabile…` → **da applicare** (sito: «suddivisa in 8 incontri/giornate»).
- destinatari da sostituire con: `«Manager, Dirigenti, Preposti, HSEQ, RSPP/ASPP, Gruppi Interaziendali Omogenei per ruolo;»` (sito: «Lavoratori e team aziendali interessati alla gestione dello stress»).
**Azione: `solo-correzioni`**.

**`empowerment`** · L02 — Accordo: **NO**.
Gaetano (3 gialli):
- `Codice L02 · «Base/Advanced» · Aula, Online · 8 ore (8 giornate) «·  partecipanti one to one»` → livello «Base/Advanced» (sito: `level: base`) e dicitura «one to one» (sito ha già `participants 1/1` ✓).
- `…8 ore suddivisa in «8 incontri di 1h,» erogabile…` → «incontri di 1h», non «incontri/giornate».
- destinatari: `«Manager, Dirigenti, Preposti, HSEQ, RSPP/ASPP»`.
**Azione: `solo-correzioni`**.

**`counseling`** · L03 — Accordo: **NO**.
Gaetano (4 gialli):
- `Codice L03 · «Base/Advanced/Extensive · in Aula e/o Online · totale percorso circa 9.0 ore suddiviso in 11 giornate da 50 minuti partecipanti one to one»`
- `Il percorso ha una durata «complessiva di 9.0 ore suddiviso in 11 incontri da 50 minuti, erogabile in modalità in aula e online. I percorsi sono erogabili anche singolarmente.»`
- `…livelli progressivi «erogabili singolarmente» (Base, Avanzato, Estensivo)…`
- `In sintesi: … «della durata di 9.0 ore».`
→ **da applicare**: sul sito `hours: 9.2`. Vedi D6 (9.0 vs 9.2 = 11 × 50 min ≈ 9,17 h).
**Azione: `solo-correzioni`**.

**`bilancio-delle-competenze`** · L04 — Accordo: **NO**.
Gaetano (4 gialli):
- `Codice L04 «·  Base/Advanced · Aula, Online · 3.4 ore (4 incontri da 50 minuti cadauno)» · 2–10 partecipanti`
- `…suddivisa in «4 incontri da 50minuti cadaun»o, erogabile…`
- destinatari: `«Manager, Dirigenti, Preposti, HSEQ, RSPP/ASPP»`
- **nuovo paragrafo descrittivo da inserire** (oggi assente sul sito): `«Il Bilancio delle Competenze è un percorso strutturato di orientamento e sviluppo personale che accompagna le persone nella conoscenza, valorizzazione e potenziamento delle proprie competenze. Trova applicazione anche in ambito organizzativo come strumento per mappare il capitale umano, individuare i bisogni formativi, sostenere lo sviluppo professionale e favorire decisioni più consapevoli.»`
**Azione: `solo-correzioni`**.

**`analisi-del-benessere-organizzativo`** · L05 — Accordo: **NO**. *Il corso con più materiale nuovo.*
Gaetano (gialli, par. 1161-1188):
- sottotitolo: `Valutazione per «rilevare» il livello di benessere percepito all'interno dell'organizzazione (EWQ)` → **da applicare**: sul sito c'è «per **elevare**» (refuso) e manca «(EWQ)».
- `Codice L05 · «Base/Advanced» · Aula, Online · 4 ore «(4 incontri di 1h)» · 2–30 partecipanti`
- descrizione, estensione: `…benessere percepito dai propri lavoratori«, offrendo una fotografia dei principali fattori che influenzano la qualità della vita lavorativa»`
- `…4 ore suddivisa in «4 incontri da 1h», erogabile…`
- **blocco EWQ interamente nuovo da inserire**: `«L'EWQ è uno strumento di misura dello stress lavoro correlato che poggia su criteri pragmatici. Le tre dimensioni principali con le relative sottoscale sono le seguenti:»` → `1. Benessere Psicologico (1a Resilienza, 1b Mentalità Positiva, 1c Salute fisica)`, `2. Soddisfazione Lavorativa (2a Supervisione, 2b Rapporto con i Colleghi, 2c Motivazione/Impegno)`, `3. Carico di lavoro`; + il paragrafo «Attraverso la raccolta e l'analisi aggregata dei dati…»; + l'elenco «Quando il questionario viene utilizzato a livello di gruppi di lavoro…» con i 7 punti da «verificare la presenza di stress occupazionale…» a «…valutare l'efficacia dei programmi volti ad innescare l'accrescimento del benessere psicologico e della soddisfazione lavorativa in azienda.»
**Azione: `solo-correzioni`** (nei fatti: riscrittura estesa, tutta con testo fornito da Gaetano).

---

## 7. Corsi presenti nell'Accordo ma NON sul sito

Tutti nella Parte II, §8.3 (attrezzature art. 73 c. 5). Sono opportunità di catalogo, non lacune da colmare d'ufficio.

| Rif. Accordo | Corso | Pag. |
|---|---|---|
| §8.3.3 | Gru a torre | 50-53 |
| §8.3.5 | Gru mobili | 58-61 |
| §8.3.6 | Trattori agricoli o forestali | 62-64 |
| §8.3.7 | Escavatori, pale caricatrici frontali, terne e autoribaltabili a cingoli | 65-69 |
| §8.3.8 | Pompe per calcestruzzo | 70-71 |
| §8.3.9 | Macchina agricola raccoglifrutta (CRF) | 73-74 |
| §8.3.10 | Caricatori per la movimentazione di materiali (CMM) | 76-77 |
| §8.3.11 | Carriponte | 78-80 |

Inoltre l'Accordo contiene parti **trasversali** non legate a un singolo corso, oggi assenti dal sito e potenzialmente utili (Parte I soggetti formatori e requisiti docenti; Parte IV progettazione/erogazione, incluse le regole per la **videoconferenza sincrona**; Parte V crediti formativi; Allegato IV macrocategorie di rischio e corrispondenze ATECO 2007).

## 8. Corsi sul sito ma NON nell'Accordo (28)

`A16` RLS · `A17` Aggiornamento RLS · `B17` Formatori · `B18` Aggiornamento formatori · `D01` PES/PAV · `D02` PEI · `D03` Aggiornamento PES/PAV · `D04` Cabine elettriche · `E01` Chimico · `E02` Rumore · `E03` Vibrazioni · `E04` MMC · `E05` Biologico · `F01` Attrezzature a pressione · Antincendio Rischio Medio · Primo Soccorso Gruppo B · `G01` Rifiuti · `G02` Terre e rocce · `G03` Emergenze ambientali · `G04` Sostenibilità PMI · `H01` CAM · Auditor ISO 9001 · Implementatore ISO 45001 · `L01` Mindfulness · `L02` Empowerment · `L03` Counseling · `L04` Bilancio competenze · `L05` Benessere organizzativo.

---

## 9. DUBBI da chiarire prima di scrivere una riga di `.mdx`

**D1 — I commenti di Gaetano sono incompleti.** Il `.docx` non ha `word/comments.xml`: sopravvivono solo 3 commenti appiattiti nel corpo. La formula «**Anche** questo corso non esiste a catalogo» prova che esisteva almeno un commento precedente ora perduto. → *Serve il file originale da cui è stato fatto l'export (o la versione Word con i commenti attivi).*

**D2 — Cosa significa operativamente il VERDE.** I 4 corsi interamente verdi sono `antincendio-rischio-medio`, `primo-soccorso-b`, `auditor-interno-iso-9001`, `iso-45001-implementatore`; per gli ultimi due il commento dice «non esiste a catalogo». Per i primi due **non c'è nessun commento**. Le opzioni sono: (a) rimuovere tutti e 4; (b) rimuovere solo i 2 ISO e riscrivere i 2 di emergenza; (c) altro. **Non ho forzato l'interpretazione.** Se escono entrambi i corsi ISO va decisa anche la sorte della categoria `sistemi-di-gestione` (titolo di sezione anch'esso evidenziato in verde).

**D3 — Preposto: «mansioni», «ruolo» o «funzioni»?** Gaetano evidenzia «mansioni» nel sottotitolo e «con ruolo»/«il ruolo» nella descrizione; il sito oggi usa una terza parola, «funzioni». L'Accordo (§2.2) parla di «funzioni loro attribuite dalla normativa (art. 19)». Serve il lemma definitivo.

**D4 — B14 cita SP4 (sanità residenziale) che per il datore di lavoro-RSPP non esiste.** L'Accordo §4 prevede 4 moduli integrativi: Agricoltura (16h), Pesca (12h), Costruzioni (16h), Chimico-Petrolchimico (16h). Il titolo del corso va corretto — ma è una modifica di **catalogo**, non di descrizione: serve conferma.

**D5 — A01-A04 vengono tutti dalla stessa sezione §2.1.** Introduzione e Obiettivi dell'Accordo sono identici per i quattro: applicando la regola alla lettera si otterrebbero 4 schede con lo stesso cappello e solo i contenuti/durata diversi. Va deciso se accettarlo, se differenziare l'introduzione, o se accorpare i 4 corsi come fa l'Accordo (un unico «Corso per lavoratori» con modulo generale + specifico).

**D6 — Numeri da confermare.**
- `counseling` L03: Gaetano scrive «9.0 ore», il sito ha `9.2`; 11 incontri × 50 min = 9,17 h. Quale valore va pubblicato?
- `addetti-alla-conduzione-di-carrelli-elevatori-semoventi` C05: l'Accordo articola più parti pratiche per tipologia di carrello; le 12h del sito corrispondono a teorico (8h) + **una** parte pratica (4h). Va indicato quale/quali abilitazioni ECOTER rilascia.

**D7 — Titolo PEI.** L'indice del `.docx` riporta «PEI – Persone idonee all'esecuzione (Norme CEI 11-27:2025 - CEI EN 61447)», il corpo del `.docx` «PEI – **Persona Idonea** (Norme CEI 11-27:2025)» con l'evidenziazione sul nome, il sito la versione lunga senza CEI EN 61447. Quale titolo e quali riferimenti normativi?

**D8 — `rspp-modulo-a` ha `pricing: fixed 490 EUR`**, unico corso con prezzo pubblicato, mentre il `.docx` dichiara «I prezzi non sono pubblicati online». Con lo spostamento a B03 va deciso se il prezzo resta.

**D9 — Dove vanno i moduli dell'Accordo nello schema `.mdx`.** Oggi 60 schede su 65 hanno `curriculum: []` e la descrizione è un corpo Markdown breve. I moduli dell'Accordo possono andare (a) nel `curriculum` strutturato (come già fa `rspp-modulo-a`), oppure (b) come sezioni Markdown nel corpo. La scelta condiziona anche il rendering della pagina corso. **Raccomandazione: `curriculum` strutturato** — è già supportato dallo schema e dal componente, e tiene i dati interrogabili.

**D10 — Nota tecnica sull'estrazione.** Le tabelle `Modulo | Obiettivi formativi | Contenuti del modulo` del PDF, in estrazione testo semplice, escono con le colonne interlacciate riga per riga. Per garantire che la colonna «obiettivi formativi» venga davvero **scartata** e non finisca mescolata ai contenuti, l'estrazione definitiva va fatta con riconoscimento di tabella per coordinate (PyMuPDF `find_tables()` o clustering sulle `x` dei blocchi), con **rilettura di controllo corso per corso** prima di scrivere gli `.mdx`.

**D11 — Il sito è già più avanti del `.docx` in alcuni punti.** Il `.docx` è una fotografia all'8 settembre 2026 e alcune correzioni risultano già applicate (es. A03 partecipanti 4 → 6; A06 «funzioni»). Ogni correzione gialla va quindi verificata contro lo stato attuale del `.mdx` prima di essere applicata — in questo piano l'ho fatto corso per corso e l'ho annotato con «già sul sito» / «da applicare».
