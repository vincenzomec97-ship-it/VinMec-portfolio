# AUREA — Extrait de Parfum

Landing page editoriale premium per **AUREA**, un brand di profumi interamente fittizio. Il progetto presenta il lancio di un extrait contemporaneo attraverso tipografia monumentale, campiture calde, composizioni asimmetriche e un flacone SVG originale.

## Concept e obiettivo

“Wear the light” traduce ambra, calore e pelle in un sistema visivo vicino a una campagna di moda: crema, arancio bruciato, vino e oro scandiscono il racconto; il prodotto interrompe titoli e griglie come un oggetto scultoreo. L’obiettivo è dimostrare competenze frontend e UI/UX con una pagina portfolio memorabile, non replicare un e-commerce reale.

## Tecnologie

- React 19, Vite e TypeScript strict;
- CSS moderno con Grid, Flexbox, `clamp()`, custom properties e reduced motion;
- Framer Motion per reveal e movimenti misurati;
- SVG avanzato parametrico per il prodotto e il monogramma;
- Vitest, Testing Library e Playwright.

## Funzionalità

- hero a piena altezza con prodotto sovrapposto e parallax leggero;
- sequenza scroll-driven in tre movimenti con cambio di scala, posizione e prospettiva del prodotto;
- piramide olfattiva, anatomia annotata, mosaico sensoriale e griglia editoriale;
- menu responsive accessibile con chiusura tramite Escape;
- carrello dimostrativo con dialog, overlay, gestione del focus e quantità;
- recensioni dichiaratamente fittizie e disclosure commerciali visibili;
- layout ottimizzato da 360 px a desktop wide, senza scroll hijacking.

## Accessibilità e animazioni

La pagina include skip link, landmark semantici, focus visibile, controlli nativi, attributi ARIA, target di almeno 44 px, blocco dello scroll nei pannelli e supporto a `prefers-reduced-motion`. Le animazioni usano prevalentemente `transform` e `opacity`, si attivano una volta e non impediscono lo scroll naturale.

## Struttura

```text
src/
  components/            sezioni editoriali e dialog carrello
    product/             flacone SVG riutilizzabile
  data/fragrance.ts      note, navigazione e recensioni
  hooks/                 reduced motion e pointer parallax
  styles/                token e stili globali responsive
tests/e2e/               flussi e screenshot Playwright
public/                  favicon/monogramma originale
```

## Avvio e controlli

Eseguire i comandi dalla directory dedicata del progetto:

```bash
cd projects/aurea-extrait
```

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm test
npx playwright install chromium
npm run test:e2e
```

Se le dipendenze npm non sono ancora disponibili, è possibile aprire l'anteprima
statica autonoma senza installare pacchetti:

```bash
npm run preview
```

L'anteprima viene servita su `http://localhost:4173` e non sostituisce la build
React/Vite definitiva.

Gli screenshot Playwright vengono salvati in `screenshots/` alle dimensioni 1440×1000, 1024×900, 768×1024 e 390×844.

## Nota legale

AUREA è un brand fittizio creato esclusivamente come progetto di design e frontend portfolio. Prodotto, prezzo, edizione, testimonianze e newsletter sono dimostrativi. Il mini-carrello non effettua pagamenti, non completa acquisti e non invia dati.
