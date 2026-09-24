import type { Faq } from '@/types'

/**
 * Single source of truth for FAQ content, rendered by the `/faq` page
 * (`FaqAccordionSection`). The homepage no longer has a FAQ teaser (home
 * essenziale, 24/09/2026): a new consumer should read from here too.
 * No `content/faq/*.json` yet (unauthored), so this lives as a plain module
 * like the rest of `src/lib/content/*` rather than a content file.
 */
export const FAQS: Faq[] = [
  {
    id: 'faq-1',
    question:
      'I corsi ECO-TER Academy sono riconosciuti dalle autorità competenti?',
    answer:
      'Sì. Tutti i corsi sono progettati nel rispetto dei requisiti normativi vigenti (D.Lgs. 81/08, Accordo Stato-Regioni, ISO, D.M. 02/09/2021). Al termine di ogni percorso viene rilasciato un attestato di frequenza valido ai fini di legge.',
  },
  {
    id: 'faq-2',
    question: 'È possibile organizzare la formazione direttamente in azienda?',
    answer:
      "Il servizio in house è tra i più richiesti: i nostri docenti si recano nella vostra sede e svolgono il corso con il personale, adattando contenuti e orari alle esigenze operative dell'azienda.",
  },
  {
    id: 'faq-3',
    question: "Come ottengo l'attestato di partecipazione?",
    answer:
      "Al termine del corso, dopo aver verificato la presenza e superato eventuali verifiche di apprendimento previste dalla normativa, riceverai l'attestato. Per i corsi online il processo è automatizzato; per quelli in aula viene consegnato fisicamente o inviato via email in PDF.",
  },
  {
    id: 'faq-4',
    question: 'Qual è la differenza tra formazione in aula, online e blended?',
    answer:
      'La formazione in aula consente interazione diretta con il docente ed è obbligatoria per alcune tipologie di corsi (es. antincendio con parte pratica). La formazione online (FAD) è flessibile e accessibile da qualsiasi dispositivo; è ammessa dalla normativa per la maggior parte dei percorsi teorici. La modalità blended combina le due cose, alternando moduli online e sessioni in aula o pratiche. La modalità disponibile è indicata nella scheda di ciascun corso.',
  },
  {
    id: 'faq-5',
    question: "Come funziona l'iscrizione a un corso?",
    answer:
      "Puoi richiedere l'iscrizione dalla pagina del corso che ti interessa o tramite il modulo contatti, indicando le informazioni richieste. Il nostro team ti risponde per confermare disponibilità, date e modalità di pagamento, e ti guida fino al perfezionamento dell'iscrizione.",
  },
  {
    id: 'faq-6',
    question:
      'In quanto tempo ricevo una risposta dopo aver inviato una richiesta?',
    answer:
      'Rispondiamo di norma entro 1-2 giorni lavorativi dal ricevimento della richiesta, verificando disponibilità dei corsi e fornendoti tutte le informazioni necessarie per procedere.',
  },
  {
    id: 'faq-7',
    question: 'A chi sono rivolti i corsi ECO-TER Academy?',
    answer:
      'I nostri percorsi si rivolgono sia a lavoratori, dirigenti, preposti e figure specialistiche (es. RSPP/ASPP, addetti alle emergenze) sia ad aziende ed enti che devono formare il proprio personale su sicurezza, ambiente e benessere organizzativo. Ogni scheda corso indica i destinatari specifici.',
  },
  {
    id: 'faq-8',
    question:
      'Gli attestati rilasciati hanno una scadenza o richiedono un aggiornamento?',
    answer:
      "Molti percorsi formativi obbligatori prevedono, secondo la normativa di riferimento, una validità nel tempo e la necessità di un corso di aggiornamento periodico per mantenerla. La durata di validità e la frequenza dell'aggiornamento variano da corso a corso: trovi l'indicazione puntuale nella scheda del corso specifico o puoi chiedercelo direttamente.",
  },
]
