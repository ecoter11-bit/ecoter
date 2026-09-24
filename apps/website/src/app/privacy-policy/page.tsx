import type { Metadata } from 'next'
import Link from 'next/link'
import { Prose, ProseColophon } from '@ecoter/ui'
import { Container } from '@/components/layout'
import { absoluteUrl } from '@/lib/utils'

/**
 * Testo legale approvato — vedi
 * `ECO-TER_Academy_Privacy_Cookie_BOZZA.md` (fuori dalla repo, presso il
 * committente). Le clausole vanno riportate alla lettera: qualsiasi modifica
 * al contenuto passa dal Titolare, non dal design system. Qui si tocca solo
 * l'impaginazione. La data di ultimo aggiornamento è scritta a mano (non
 * `new Date()`): indica quando il testo è cambiato, non quando la pagina è
 * stata renderizzata.
 */
const LAST_UPDATED = '22 settembre 2026'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Informativa sul trattamento dei dati personali raccolti tramite il sito ECO-TER Academy: titolare, basi giuridiche, finalità, conservazione e diritti dell’interessato.',
  alternates: {
    canonical: absoluteUrl('/privacy-policy'),
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="border-b border-neutral-200 bg-white">
        <Container className="py-12 lg:py-16">
          <p className="mb-3 text-brand-700 overline">Informativa</p>
          <h1 className="max-w-2xl font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-pretty text-neutral-600">
            Informativa sul trattamento dei dati personali raccolti tramite il
            sito ecoteracademy.it
          </p>
        </Container>
      </div>

      <div className="bg-neutral-25">
        <Container className="section-padding">
          <Prose className="mx-auto max-w-3xl">
            <h2>1. Premessa e riferimenti normativi</h2>
            <p>
              Questa informativa illustra il trattamento dei dati personali
              raccolti tramite il sito <strong>ecoteracademy.it</strong>,
              inclusi quelli acquisiti mediante cookie tecnici e i moduli online
              eventualmente attivi sul sito. Si rivolge a chiunque acceda o
              utilizzi il sito e descrive modalità di raccolta, utilizzo e
              tutela dei dati personali, nonché i diritti riconosciuti dalla
              legge. Non riguarda altri siti o servizi raggiungibili tramite
              eventuali collegamenti esterni.
            </p>
            <p>
              È fornita in osservanza delle principali normative in materia, tra
              cui il Regolamento (UE) 2016/679 (GDPR) e la Direttiva 2002/58/CE
              (ePrivacy), oltre ad altre norme eventualmente applicabili.
            </p>

            <h2>2. Titolare del trattamento e contatti</h2>
            <p>I dati personali sono trattati dal Titolare:</p>
            <p>
              <strong>ECO-TER SRL</strong> — via del Lavoro, 2 — 40065 Pianoro
              (BO) — P.IVA 02252491200.
            </p>
            <p>
              Recapiti: <a href="mailto:info@eco-ter.com">info@eco-ter.com</a> ·{' '}
              <a href="mailto:academy@eco-ter.com">academy@eco-ter.com</a> ·
              tel. <a href="tel:+390514690064">+39 051 4690064</a>.
            </p>
            <p>
              Per ogni informazione sul trattamento o per esercitare i propri
              diritti, gli interessati possono contattare il Titolare ai
              recapiti indicati.
            </p>

            <h2>3. Basi giuridiche del trattamento</h2>
            <p>
              Il trattamento si fonda, a seconda dei casi, su una o più delle
              seguenti basi:
            </p>
            <ul>
              <li>
                <strong>
                  Esecuzione di misure precontrattuali o contrattuali:
                </strong>{' '}
                per rispondere alle richieste inviate tramite i moduli, gestire
                l&apos;iscrizione ai corsi e la relativa fatturazione.
              </li>
              <li>
                <strong>Adempimento di obblighi di legge:</strong> in
                particolare fiscali, contabili e amministrativi.
              </li>
              <li>
                <strong>Legittimo interesse del Titolare:</strong> per garantire
                la sicurezza informatica del sito, prevenire abusi e frodi, e
                tutelare i propri diritti anche in sede giudiziaria.
              </li>
            </ul>

            <h2>4. Quali dati raccogliamo</h2>
            <ul>
              <li>
                <strong>Dati di navigazione e tecnici:</strong> indirizzo IP,
                identificatori del dispositivo, dati su browser e sistema
                operativo, pagine richieste, orari di connessione, log tecnici.
                Raccolti tramite i soli cookie tecnici (vedi{' '}
                <Link href="/cookie-policy">Cookie Policy</Link>).
              </li>
              <li>
                <strong>
                  Dati forniti tramite il modulo &ldquo;Richiedi informazioni /
                  Contatti&rdquo;:
                </strong>{' '}
                nome, indirizzo email, telefono, eventuale corso di interesse e
                contenuto del messaggio.
              </li>
              <li>
                <strong>
                  Dati forniti tramite il modulo &ldquo;Ottieni corso&rdquo;
                  (richiesta di iscrizione con dati di fatturazione):
                </strong>{' '}
                ragione sociale oppure nome e cognome; partita IVA e/o codice
                fiscale; codice destinatario SDI o indirizzo PEC; indirizzo di
                fatturazione; persona di riferimento; numero di partecipanti;
                email e telefono; eventuali note.
              </li>
            </ul>
            <p>
              Il sito <strong>non utilizza</strong> cookie o strumenti di
              profilazione, analitici o di marketing.
            </p>

            <h2>5. Finalità</h2>
            <p>
              I dati sono trattati per: rispondere alle richieste degli utenti;
              gestire l&apos;iscrizione e l&apos;erogazione dei corsi e i
              connessi adempimenti amministrativi, contabili e fiscali
              (fatturazione); garantire la sicurezza e il corretto funzionamento
              del sito.
            </p>

            <h2>6. Modalità e tempi di conservazione</h2>
            <p>
              I dati sono trattati prevalentemente con strumenti elettronici,
              secondo principi di liceità, correttezza, minimizzazione,
              integrità e riservatezza. Tempi di conservazione:
            </p>
            <ul>
              <li>
                <strong>Dati di navigazione e tecnici:</strong> per il tempo
                strettamente necessario alle finalità di sicurezza e, di norma,
                non oltre 12 mesi.
              </li>
              <li>
                <strong>Dati inviati tramite i moduli:</strong> per il tempo
                necessario a dare riscontro alla richiesta e, in caso di
                iscrizione, per la durata del rapporto e i successivi termini
                imposti da obblighi di legge (in particolare contabili e
                fiscali).
              </li>
            </ul>

            <h2>7. Destinatari dei dati</h2>
            <p>
              Ai dati possono accedere, nei limiti delle rispettive competenze:
              soggetti interni autorizzati e istruiti dal Titolare; fornitori
              terzi nominati <strong>Responsabili del trattamento</strong>, tra
              cui il fornitore di <strong>hosting del sito (Netlify)</strong> e
              il fornitore per l&apos;
              <strong>invio delle email dei moduli (Resend)</strong>;
              consulenti; autorità pubbliche competenti nei limiti di legge.
              L&apos;elenco aggiornato dei responsabili esterni è disponibile su
              richiesta ai recapiti del Titolare.
            </p>

            <h2>8. Trasferimenti dei dati</h2>
            <p>
              I dati sono trattati, di regola, all&apos;interno dell&apos;Unione
              Europea / Spazio Economico Europeo. L&apos;utilizzo di alcuni
              fornitori può comportare un trasferimento verso paesi terzi: nel
              caso di trasferimenti verso gli <strong>Stati Uniti</strong> (ad
              es. per l&apos;hosting del sito), questi avvengono verso fornitori
              che aderiscono all&apos;
              <strong>EU-U.S. Data Privacy Framework</strong> o, in mancanza,
              sulla base delle <strong>Clausole Contrattuali Standard</strong>{' '}
              della Commissione europea. Il fornitore per l&apos;invio delle
              email è configurato su <strong>regione UE</strong>.
            </p>

            <h2>9. Diritti dell&apos;interessato</h2>
            <p>
              L&apos;utente ha diritto di: ottenere l&apos;accesso ai propri
              dati; chiederne rettifica, aggiornamento o cancellazione; ottenere
              la limitazione o opporsi al trattamento; ottenere la portabilità
              dei dati; proporre reclamo all&apos;Autorità di controllo
              competente (in Italia, il Garante per la protezione dei dati
              personali). Le richieste si inviano ai recapiti del Titolare, che
              risponde senza ingiustificato ritardo e comunque entro un mese,
              prorogabile di due mesi in casi complessi.
            </p>

            <h2>10. Dati dei minori</h2>
            <p>
              Il sito non è rivolto ai minori e non ne raccoglie
              intenzionalmente i dati tramite i propri moduli. Qualora
              l&apos;utente fornisca dati riferiti a terzi, è tenuto ad
              assicurarsi di esserne legittimato.
            </p>

            <h2>11. Modifiche all&apos;informativa</h2>
            <p>
              La presente informativa è soggetta a revisione periodica per
              adeguamenti normativi o modifiche dei servizi. Ogni variazione
              significativa sarà comunicata tramite questa pagina.
            </p>

            <ProseColophon>Ultimo aggiornamento: {LAST_UPDATED}.</ProseColophon>
          </Prose>
        </Container>
      </div>
    </>
  )
}
