# content/generated

File generati automaticamente dagli script. **Non modificare manualmente.**

## Contenuto

- `search-index.json` — indice di ricerca flat generato da `npm run build:search`
- `courses/` — dati JSON intermedi estratti dai documenti raw (input per conversione MDX)
- `categories/` — snapshot delle categorie per uso lato client

## Rigenerazione

```bash
# Indice di ricerca
npm run build:search

# Validazione completa del catalogo
npm run validate
```

Questi file vengono aggiornati ad ogni deploy (via CI) e non devono essere inclusi nelle PR manuali.
