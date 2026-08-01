# Guida di aggiornamento del portfolio

## Fonte dei progetti

Modificare soltanto `data/projects.json`, poi eseguire:

```powershell
npm run generate
npm test
```

Il generatore aggiorna automaticamente le card statiche in `index.html` e il fallback `assets/js/projects.js`. Non modificare a mano il contenuto compreso tra `<!-- PROJECTS:START -->` e `<!-- PROJECTS:END -->`.

## Campi essenziali

Ogni progetto deve dichiarare:

- identificatore e titolo univoci;
- categoria, descrizione, problema, soluzione e ruolo;
- stato reale e limitazioni;
- immagine con testo alternativo e dimensioni;
- massimo cinque tecnologie principali nella card;
- soli link realmente disponibili;
- ordine tramite `priority`;
- una tipologia principale tramite `group` e `filters`;
- `featured` opzionale soltanto per la selezione trasversale 3 principali.

Le tipologie ammesse sono `sites`, `webapp`, `experimental`, `figma` e
`practice`. Ogni progetto pubblicato deve usarne esattamente una; `featured`
può essere aggiunto senza cambiare la tipologia principale. La selezione deve
contenere esattamente Adriana, English Quiz Lab e C.M. Pulizie.

## Regole editoriali

- Non usare `#`, localhost o URL inventati.
- Distinguere demo, prototipo, progetto personale, esercizio e sito professionale.
- Non descrivere come attivi moduli, analytics, automazioni o servizi non collegati.
- Registration Form e i concept collegati devono mantenere `compact: true`.
- Adriana resta il primo progetto, con `featured: true`.
- Shoes Concept va presentato come fase UI/UX di Shoes M.V.

## Immagini

- Preferire WebP o JPEG ottimizzati quando compatibili.
- Dichiarare `width`, `height` e un alt contestuale.
- Usare `loading="lazy"` fuori dalla prima schermata.
- Non caricare nelle card i PNG sorgente più pesanti se esiste una versione ottimizzata.
- Non eliminare i file sorgente senza una verifica dei riferimenti e approvazione.

## Controlli browser

Avviare:

```powershell
python -m http.server 4173
```

Verificare home e case study a 320, 375, 430, 768, 1024 e 1440 px. Controllare menu, filtri, tastiera, focus, form, immagini, link, console e movimento ridotto.

## Form contatti

Con `data-form-endpoint=""` il form prepara una email e non salva dati. Inserire un endpoint Formspree soltanto dopo aver creato e verificato l’account, aggiornato la nota informativa e provato un invio reale.

## Sicurezza

Non inserire token, password, chiavi API, file `.env`, dati di utenti o documenti privati. Le integrazioni AI con credenziali devono rimanere lato server.

## Git e pubblicazione

Lavorare su un branch dedicato. Prima di proporre il merge:

```powershell
npm run generate
npm test
git diff --check
git status --short
```

Non pubblicare o unire su `main` senza approvazione.
