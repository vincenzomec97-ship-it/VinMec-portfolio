# Guida di aggiornamento del portfolio

## Regola principale

La fonte primaria dei progetti è `data/projects.json`. Il file `assets/js/projects.js` è il fallback necessario quando la home viene aperta con `file://`: dopo ogni modifica ai dati, deve restare sincronizzato.

## Aggiungere o aggiornare un progetto

1. Aggiornare titolo, descrizioni, stato, immagini, stack e soli link reali.
2. Usare il gruppo esistente appropriato: `main`, `business`, `ai`, `demo3d`, `figma` o `practice`.
3. Usare `priority` e `order` senza cambiare la distinzione tra progetti principali e secondari.
4. Lasciare vuoto un link non disponibile; non usare `#`.
5. Dichiarare chiaramente `Prototipo`, `In sviluppo`, `Versione dimostrativa` o `Funzionalità in evoluzione`.
6. Sincronizzare il fallback e verificare sia tramite server locale sia aprendo `index.html` direttamente.
7. Aggiornare case study, sitemap e changelog se cambia una pagina pubblica.

## Immagini

- Preferire WebP o JPEG ottimizzati per fotografie e anteprime.
- Mantenere una copia sorgente solo se serve davvero.
- Indicare sempre `width`, `height` e un testo alternativo contestuale.
- Usare `loading="lazy"` fuori dalla prima schermata.
- Verificare ritaglio, rapporto e leggibilità a 320, 375, 430, 768, 1024 e 1440 px.

## Controlli prima di pubblicare

Avviare dalla radice:

```powershell
python -m http.server 4173
```

Aprire `http://127.0.0.1:4173/`, controllare console, menu, filtri, card, modali, form, CV, case study e link esterni. Eseguire Lighthouse in navigazione privata. Non pubblicare direttamente su `main`: usare un branch e revisionare il diff.

## Informazioni sensibili

Non inserire chiavi API, file `.env`, token, password o dati personali di utenti. Le chiamate AI devono restare lato server; i progetti demo devono usare dati fittizi chiaramente indicati.
