# Rifinitura delle descrizioni corsi

**Branch:** `chore/rifinitura-descrizioni` — **Data:** 17 settembre 2026
**Fonti:** solo `Accordo Stato Regioni 20250417 atto-rep-n-59.pdf` (Allegato A) e
`ECO-TER_Descrizioni_Corsi_rev_01.docx`. Nessun testo inventato.

---

## 1. Come sono stati verificati i topics

I 570 topics dei 37 corsi «sostituzione-da-Accordo» sono stati confrontati uno per uno
con il testo dell'Allegato A, riestratto da capo.

La prima estrazione (commit `99bbf01`) tagliava le voci sui ritorni a capo perché le
tabelle moduli del PDF non hanno separatori di riga fra una voce e l'altra: sono
**il rientro** a distinguere l'inizio di una voce dalla sua continuazione. La nuova
estrazione usa quella regola — una voce comincia dove la riga parte dal margine
sinistro della cella, le righe rientrate sono continuazioni — più:

- individuazione della colonna «Contenuti del modulo» dall'intestazione (non «la più larga»,
  che sbagliava colonna su alcune pagine);
- separatori di riga solo se attraversano tutta la tabella (gli underline di riga non contano);
- ricucitura delle voci spezzate dal salto pagina.

Confronto per topic: una voce del sito è corretta se compare nell'Allegato **e** finisce
dove finisce una frase o una voce della fonte. Chi non passava questo test è stato
riportato al testo integrale del PDF.

Dopo l'intervento restano 8 segnalazioni automatiche, tutte verificate a mano e tutte
falsi positivi (elenchi `a)`/`b)`/`c)` con parentesi non bilanciata, sotto-voci `✓`
legittimamente ripetute, «Titolo I», ellissi `..` vs `...`).

**Topics: 570 → 558** (−18 frammenti, +6 voci ri-separate o ripristinate). Moduli: 65 → 64.

## 2. Interventi per corso

| Corso | Codice | Completate | Ricostruite | Duplicati rimossi | Altro |
|---|---|---|---|---|---|
| addetti-alla-conduzione-di-carrelli-elevatori-semoventi | C05 | 5 | 2 | 1 | 1 voce ri-separata in 2; 3 titoli di modulo ricuciti |
| addetti-alla-conduzione-di-gru-per-autocarro | C03 | 5 | 1 | 2 | — |
| addetti-alle-piattaforme-di-lavoro-mobili-elevabili-ple | C01 | 4 | 1 | 3 | — |
| coordinatori-per-la-sicurezza…-csp-cse-120h | B01 | 3 | — | 2 | — |
| datori-di-lavoro-rspp-modulo-comune-8h | B13 | 1 | — | — | 1 voce ri-separata in 2; voce «VDT» ripristinata |
| datori-di-lavoro | A11 | 2 | — | — | 1 voce ricomposta; 1 voce ri-separata in 2 |
| datori-di-lavoro-modulo-aggiuntivo-cantieri | A12 | 1 | — | — | — |
| dirigenti | A08 | 1 | — | — | 2 voci ricomposte |
| dirigenti-modulo-aggiuntivo-cantieri | A09 | 2 | — | 1 | 2 moduli spezzati unificati in 1 |
| rspp-modulo-a | B03 | 3 | — | 2 | — |
| rspp-modulo-b-propedeutico-a-tutti-i-settori-48h | B04 | — | — | — | 1 voce ri-separata in 3 (UD4) |
| rspp-modulo-c-gestione-e-organizzazione-24h | B10 | 5 | — | 2 | 1 voce ricomposta; «T eam» → «Team» |
| **Totale** | | **32** | **4** | **13** | |

Legenda: *completate* = frase tagliata, chiusa col testo del PDF · *ricostruite* = voce
con testo mescolato fra due voci diverse, riscritta dalla fonte · *duplicati rimossi* =
frammenti che ripetevano la coda della voce precedente · *ricomposte* = voce spezzata a
metà (dentro una parentesi o un riferimento normativo) riunita in una sola.

Gli altri 25 corsi da Accordo non avevano difetti.

## 3. Altri punti

- **D01** (`pes-pav-…`): «è necessaria anche essere persone idonee (PEI)» →
  «è necessario essere anche persone idonee (PEI)». Solo grammatica.
- **`content/categories/ambiente.json`**: `description`, `longDescription` e il blocco
  `seo` riscritti sui 5 corsi realmente a catalogo (G01 rifiuti, G02 terre e rocce da
  scavo, G03 emergenze ambientali, G04 bilancio di sostenibilità PMI, H01 CAM in
  edilizia). Sparite ISO 14001, emissioni in atmosfera e gestione delle acque: nessun
  corso le copre.
- **`order` della categoria benessere-psico-sociale**: già `3` (portato da 4 a 3 nel
  commit `99bbf01`, con l'uscita di Sistemi di Gestione). Le tre categorie sono
  Sicurezza 1 · Ambiente 2 · Benessere 3, senza buchi. Nessuna modifica necessaria.

## 4. Contenuti non recuperabili

Nessuno: ogni completamento viene dal testo dell'Allegato A, nessun passaggio è stato
ricostruito a intuito.

Tre annotazioni sulla fonte, lasciate com'è perché è così che scrive l'Accordo:

- **B04, UD2** (`rspp-modulo-b-propedeutico…mdx`): il topic «Organizzazione dei processi
  produttivi e del lavoro: • cenni… • innovazione tecnologica…» porta i «•» dentro il
  testo. Resta una voce sola di proposito: a pag. 30 interna quei «•» sono **sotto-voci
  rientrate** sotto UD2, non voci sorelle. Separarle le promuoverebbe a pari livello e
  cambierebbe la gerarchia della fonte. UD4, invece, sono tre righe allo stesso rientro —
  voci sorelle — e infatti è stata separata in tre topic.
  L'audit a11y segnala qui un **Medium pre-esistente** (WCAG 1.3.1): quei «•» sono testo
  piatto, non una `<ul>` annidata, quindi la relazione di sotto-punto non è
  programmaticamente determinabile. Non si risolve col contenuto: servirebbe che
  `CourseModule.topics` ammetta sotto-elenchi. Fuori da questo task, da valutare a parte;

- il punto 2.6 del modulo pratico gru per autocarro (pag. 48 interna) finisce con
  «…stabilizzatori, jib, ecc.,» — virgola finale nell'originale, sul sito chiusa con il punto;
- «standard tecnico- strutturali» (A11) e «UNITÀ DIDATTICA» spezzate a capo nel PDF
  restano tali dove il testo è citato alla lettera.

**Limite del controllo:** è una verifica *per topic* — trova frasi tronche, frammenti
duplicati e testi mescolati. Non è un audit di completezza modulo per modulo: un elenco
puntato del PDF mai trasferito sul sito non emerge da questo confronto. L'unico caso
emerso (la voce «VDT» di B13, pag. 22 interna) è stato ripristinato leggendo la pagina.
