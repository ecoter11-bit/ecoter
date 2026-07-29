---
name: a11y-review-fallback
description: >
  Fallback per l'audit WCAG 2.1 AA quando il dispatch del subagent di progetto
  "a11y-auditor" fallisce con "Agent type not found" (host senza supporto per
  subagent da .claude/agents/, roster fisso). Usa dopo ogni modifica UI in
  apps/website o packages/ui se Agent(subagent_type: a11y-auditor) non è
  disponibile.
---

# Fallback: a11y audit senza subagent dedicato

Diagnosi (2026-07-29): in questo host il tool Agent espone solo un roster fisso
(`claude`, `claude-code-guide`, `Explore`, `general-purpose`, `Plan`,
`statusline-setup`) e non carica subagent di progetto da `.claude/agents/`, anche
con frontmatter conforme alle spec ufficiali (`name`+`description` presenti,
`model`/`effort`/`color`/`tools` tutti campi validi). Dispatch di prova →
`Agent type 'a11y-auditor' not found. Available agents: claude,
claude-code-guide, Explore, general-purpose, Plan, statusline-setup`.
`.claude/agents/a11y-auditor.md` resta corretto e va lasciato intatto per host
che caricano subagent di progetto — qui va aggirato così:

1. Leggi `.claude/agents/a11y-auditor.md` con Read.
2. Prendi tutto il body dopo il frontmatter di chiusura (`---`) — è il system
   prompt dell'auditor, verbatim, non riassumerlo.
3. Lancia `Agent` con `subagent_type: general-purpose`. Nel prompt:
   - incolla quel body per intero;
   - aggiungi i path espliciti dei file/componenti/Storybook stories da
     controllare (mai descrizioni a parole);
   - ribadisci il vincolo: read-only, riporta findings con severità
     Blocker/High/Medium/Nit e criterio WCOM specifico, non editare nulla.
4. Tratta l'output esattamente come l'output del subagent dedicato.

Se in una sessione futura `Agent(subagent_type: "a11y-auditor")` risponde senza
errore "not found", il subagent di progetto è di nuovo disponibile: usa quello
direttamente e ignora questa skill.
