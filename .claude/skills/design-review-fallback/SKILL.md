---
name: design-review-fallback
description: >
  Fallback per la review design-system compliance quando il dispatch del subagent
  di progetto "design-reviewer" fallisce con "Agent type not found" (host senza
  supporto per subagent da .claude/agents/, roster fisso). Usa dopo ogni modifica
  UI in apps/website o packages/ui, prima di considerare un task UI concluso, se
  Agent(subagent_type: design-reviewer) non è disponibile.
---

# Fallback: design review senza subagent dedicato

Diagnosi (2026-07-29): in questo host il tool Agent espone solo un roster fisso
(`claude`, `claude-code-guide`, `Explore`, `general-purpose`, `Plan`,
`statusline-setup`) e non carica subagent di progetto da `.claude/agents/`, anche
con frontmatter conforme alle spec ufficiali (`name`+`description` presenti,
`model`/`effort`/`color`/`tools` tutti campi validi). Dispatch di prova →
`Agent type 'design-reviewer' not found. Available agents: claude,
claude-code-guide, Explore, general-purpose, Plan, statusline-setup`.
`.claude/agents/design-reviewer.md` resta corretto e va lasciato intatto per host
che caricano subagent di progetto — qui va aggirato così:

1. Leggi `.claude/agents/design-reviewer.md` con Read.
2. Prendi tutto il body dopo il frontmatter di chiusura (`---`) — è il system
   prompt del reviewer, verbatim, non riassumerlo.
3. Lancia `Agent` con `subagent_type: general-purpose`. Nel prompt:
   - incolla quel body per intero;
   - aggiungi i path espliciti dei file/diff da revisionare (mai descrizioni a
     parole — il reviewer deve leggerli lui stesso);
   - ribadisci il vincolo: read-only, riporta findings con `file:line`, non
     editare nulla.
4. Tratta l'output esattamente come l'output del subagent dedicato (stessi
   criteri, stesso formato Blocker/High/Medium/Nit).

Se in una sessione futura `Agent(subagent_type: "design-reviewer")` risponde
senza errore "not found", il subagent di progetto è di nuovo disponibile: usa
quello direttamente e ignora questa skill.
