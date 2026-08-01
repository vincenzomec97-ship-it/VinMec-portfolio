# VinMec Portfolio

Portfolio professionale di **Vincenzo Meccariello**, Junior Frontend Developer & UI/UX Designer.

Progetto e sviluppo siti, landing page e piccole web app responsive, trasformando idee e prototipi Figma in prodotti digitali funzionanti. Gli strumenti AI sono presentati come supporto al processo, con verifica del codice, dell’accessibilità e del risultato finale.

[Portfolio online](https://vincenzomec97-ship-it.github.io/VinMec-portfolio/) · [LinkedIn](https://www.linkedin.com/in/vincenzo-meccariello-4140b9386/) · [GitHub](https://github.com/vincenzomec97-ship-it)

## Obiettivi

- presentare progetti frontend e UI/UX con stato e limitazioni reali;
- rendere chiari problema, soluzione, ruolo e tecnologie;
- offrire contenuti leggibili anche senza JavaScript;
- mantenere un sito statico semplice da pubblicare su GitHub Pages;
- documentare aggiornamenti e controlli senza inventare metriche o risultati.

## Tecnologie

- HTML semantico e CSS responsive;
- JavaScript come miglioramento progressivo;
- Node.js senza dipendenze per generazione e controlli locali;
- JSON come fonte editoriale dei progetti;
- Git e GitHub Pages per versionamento e pubblicazione.

I singoli progetti dimostrano inoltre React, Next.js, TypeScript, Supabase, Three.js, Figma e integrazioni AI, con livelli e limitazioni specificati nelle rispettive pagine.

## Progetti principali

| Progetto | Stato | Collegamenti |
| --- | --- | --- |
| Adriana Napolitano — Architettura e restauro | Demo destinata a evolvere in sito professionale reale | [Demo](https://vincenzomec97-ship-it.github.io/adriana-napolitano-architettura/) · [Case study](projects/adriana-architettura/) · [Repository](https://github.com/vincenzomec97-ship-it/adriana-napolitano-architettura) |
| English Quiz Lab | Web app pubblica, repository privata | [Demo](https://english-quiz-lab-one.vercel.app/) · [Case study](projects/english-quiz-lab/) |
| C.M. Pulizie | Demo pubblica; automazioni esterne predisposte ma non attive | [Demo](https://vincenzomec97-ship-it.github.io/cm-pulizie/) · [Case study](projects/cm-pulizie/) · [Repository](https://github.com/vincenzomec97-ship-it/cm-pulizie) |
| Shoes M.V. | Demo 3D sperimentale | [Demo](https://vincenzomec97-ship-it.github.io/shoely-3d-store/) · [Case study](projects/shoes-mv/) · [Repository](https://github.com/vincenzomec97-ship-it/shoely-3d-store) |
| ClientFlow | Dashboard frontend con dati locali | [Demo](https://vincenzomec97-ship-it.github.io/clientflow-dashboard/) · [Case study](projects/clientflow/) · [Repository](https://github.com/vincenzomec97-ship-it/clientflow-dashboard) |
| FitZone | Landing per palestra immaginaria; contatti e invii dimostrativi | [Demo](https://vincenzomec97-ship-it.github.io/gym-landing-page/) · [Case study](projects/fitzone-case-study/) · [Repository](https://github.com/vincenzomec97-ship-it/gym-landing-page) |
| CasaBot | Assistente rule-based, senza AI esterna o trasmissione dati | [Demo](https://vincenzomec97-ship-it.github.io/casabot-immobiliare/) · [Case study](projects/casabot/) · [Repository](https://github.com/vincenzomec97-ship-it/casabot-immobiliare) |

Shoes Concept documenta la fase iniziale UI/UX di Shoes M.V.; Registration Form resta un esercizio secondario nella categoria Practice.

## Struttura

```text
assets/
  brand/                   identità, ritratto e social preview
  css/                     stile globale
  js/                      miglioramento progressivo e fallback generato
  projects/                anteprime dei progetti
data/projects.json         unica fonte editoriale delle card
projects/                  demo e case study
scripts/
  generate-projects.mjs    genera card statiche e fallback dal JSON
  audit-site.mjs           controlla pagine, metadati, asset e link locali
index.html                 home e HTML statico generato
robots.txt
sitemap.xml
```

## Sistema delle card

`data/projects.json` è l’unica fonte da modificare. `npm run generate` produce:

1. le card statiche dentro `index.html`, indicizzabili e disponibili senza JavaScript;
2. `assets/js/projects.js`, mantenuto come fallback sincronizzato.

`assets/js/main.js` non carica più i contenuti con `fetch`: aggiunge soltanto filtri, menu mobile, microinterazioni e gestione del modulo contatti. In questo modo non esistono due fonti da aggiornare manualmente.

Per ogni card sono obbligatori stato, problema, soluzione, ruolo, immagine e massimo cinque tecnologie principali. Lo stack completo appartiene al case study.

## Avvio locale

Il sito non richiede installazione di dipendenze.

```powershell
python -m http.server 4173
```

Aprire `http://127.0.0.1:4173/`.

## Aggiornamento e test

```powershell
npm run generate
npm test
```

Il test controlla:

- sincronizzazione tra JSON, HTML e fallback;
- presenza di title, description, canonical e un solo H1;
- immagini con alt, width e height;
- riferimenti locali e JSON-LD;
- presenza di ogni progetto nell’HTML statico.

## Responsive, accessibilità e SEO

La home e i case study usano layout responsive, aree cliccabili da almeno 44 px, skip link, focus visibile, menu da tastiera e supporto a `prefers-reduced-motion`. I controlli visuali previsti coprono 320, 375, 430, 768, 1024 e 1440 px.

Le pagine principali includono title e description dedicati, canonical, Open Graph, favicon e collegamenti interni. `sitemap.xml` e `robots.txt` descrivono le pagine pubbliche; le vecchie demo duplicate restano nel repository ma usano `noindex`.

## Modulo contatti

Senza configurazione esterna il form prepara una email nel client dell’utente e dichiara che nessun dato viene salvato o inviato a un server.

È predisposto un endpoint Formspree opzionale. Per attivarlo:

1. creare un form gratuito su Formspree;
2. copiare l’endpoint pubblico fornito, simile a `https://formspree.io/f/xxxxxxxx`;
3. inserirlo nell’attributo `data-form-endpoint` del form in `index.html`;
4. aggiornare la nota visibile indicando che il form usa Formspree;
5. eseguire un invio reale e verificare risposta, spam e informativa privacy.

Nessuna chiave privata deve essere aggiunta al frontend.

## Pubblicazione

GitHub Pages può servire direttamente i file versionati. Prima di un merge su `main`:

```powershell
npm run generate
npm test
git diff --check
```

La versione professionale viene preparata sul branch `portfolio-professional-upgrade`. Merge e pubblicazione richiedono approvazione esplicita.

## Manutenzione

Consultare [GUIDA-AGGIORNAMENTO-PORTFOLIO.md](GUIDA-AGGIORNAMENTO-PORTFOLIO.md) prima di aggiungere progetti o modificare collegamenti, immagini e stato delle integrazioni esterne. Il rapporto della revisione corrente è in [PORTFOLIO-PROFESSIONAL-UPGRADE.md](PORTFOLIO-PROFESSIONAL-UPGRADE.md).
