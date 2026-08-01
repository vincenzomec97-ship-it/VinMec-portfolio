# Portfolio professional upgrade

Data verifica: 1 agosto 2026  
Branch: `portfolio-professional-upgrade`  
Branch principale modificato: no

## Risultato

Il portfolio presenta Vincenzo Meccariello come **Junior Frontend Developer & UI/UX Designer**. L'AI è descritta come supporto al processo di sviluppo, non come professione separata.

La grafica originale, la palette, il font e l'impostazione generale sono stati mantenuti. Gli interventi riguardano gerarchia, contenuti, card, accessibilità, SEO, responsive design, prestazioni e manutenibilità.

## Modifiche principali

- hero più breve con ruolo, stack, disponibilità junior e tre CTA;
- navigazione ridotta a Home, Progetti, Competenze, Chi sono e Contatti;
- nove progetti principali ordinati come richiesto e due materiali di processo secondari;
- Adriana Napolitano come progetto in evidenza con card ampia e case study in 20 sezioni;
- Shoes Concept presentato come fase UI/UX di Shoes M.V., con collegamenti reciproci;
- Registration Form mantenuto in Practice con peso visivo ridotto;
- massimo cinque tecnologie per card e stato reale esplicito;
- competenze divise in Frontend, UI/UX, Backend e dati, AI e automazioni;
- form contatti trasparente: usa `mailto:` finché non viene configurato un endpoint Formspree;
- card generate da `data/projects.json` durante lo sviluppo e incluse nell'HTML iniziale;
- nuove pagine per Shoes M.V. e Shoes Concept;
- social preview 1200 × 630, metadata, sitemap e pagine legacy non indicizzabili;
- immagini con dimensioni dichiarate, caricamento lazy sotto la prima schermata e rispetto di `prefers-reduced-motion`;
- script di generazione e audit ripetibili con Node.js.

## File modificati o aggiunti

- `index.html`
- `data/projects.json`
- `assets/css/style.css`
- `assets/js/main.js`
- `assets/js/projects.js` (artefatto di compatibilità generato, non caricato dalla home)
- `assets/brand/vincenzo-social-preview.png`
- `projects/adriana-architettura/index.html`
- `projects/adriana-architettura/case-study.css`
- `projects/shoes-mv/index.html`
- `projects/shoes-concept/index.html`
- pagine case study esistenti, per dimensioni immagini e coerenza dei collegamenti
- `cv-vincenzo-meccariello-ats.html`
- `sitemap.xml`
- pagine legacy `gym-home.html`, `portfolio-mini.html`, `registration.html`, `sito-vetrina.html`
- `package.json`
- `scripts/generate-projects.mjs`
- `scripts/audit-site.mjs`
- `.gitignore`
- `README.md`
- `GUIDA-AGGIORNAMENTO-PORTFOLIO.md`

## Controlli eseguiti

- `npm test`: 16 pagine HTML, 11 progetti, 0 avvisi;
- `git diff --check`: nessun errore di whitespace;
- card presenti nella risposta HTML anche senza esecuzione JavaScript;
- responsive a 320, 375, 430, 768, 1024 e 1440 px senza overflow;
- menu mobile da tastiera, focus iniziale, chiusura con Escape e ripristino del focus;
- home, Adriana, Shoes M.V., Shoes Concept e CV senza immagini rotte;
- sessione browser pulita senza errori o warning console;
- demo principali e repository pubbliche raggiungibili con risposta HTTP 200;
- collegamenti Figma raggiungibili; LinkedIn applica protezione anti-bot ai controlli automatici;
- Lighthouse locale: Performance 89, Accessibilità 100, Best Practices 100, SEO 100;
- primo caricamento Lighthouse: circa 162 KiB trasferiti.

Il comando Lighthouse ha prodotto correttamente il report, ma su Windows ha restituito un errore finale di pulizia della cartella temporanea. I punteggi e il file JSON risultano integri.

## Problemi risolti

- contenuti principali dipendenti dal caricamento runtime di JSON;
- ordine e peso visivo dei progetti incoerenti;
- hero generica e troppo densa su smartphone;
- numero eccessivo di tag nelle card;
- assenza di pagine dedicate per Shoes M.V. e Shoes Concept;
- case study Adriana incompleto e con metriche obsolete;
- menu mobile con focus anticipato durante la transizione;
- contrasto insufficiente di alcuni sottotitoli;
- dimensioni immagini mancanti e metadata incompleti nelle pagine secondarie;
- conferma potenzialmente ambigua del form contatti.

## Limiti ancora presenti

- il form non invia dati a un server finché non viene configurato Formspree;
- alcune immagini sorgente legacy, non caricate dalla home, restano pesanti per preservare il materiale originale;
- il CSS mantiene regole legacy non rimosse per ridurre il rischio di regressioni;
- il punteggio Performance locale può variare per rete, cache e macchina di test;
- la versione pubblica rimane quella precedente finché il branch non viene approvato e unito.

## Passaggio manuale per Formspree

1. Creare un form su Formspree con l'email professionale.
2. Copiare l'endpoint fornito, ad esempio `https://formspree.io/f/ID_REALE`.
3. Inserirlo nell'attributo `data-form-endpoint` del form in `index.html`.
4. Provare invio valido, errore di rete e honeypot.
5. Non inserire chiavi private nel frontend.

## Avvio e test

```bash
npm run generate
npm test
npx serve .
```

Aprire l'URL locale indicato da `serve`. In alternativa:

```bash
python -m http.server 4173
```

e visitare `http://127.0.0.1:4173/`.

## Annullare le modifiche

Finché il branch non è stato unito, tornare al branch principale senza cancellare nulla:

```bash
git switch main
```

Per rimuovere in seguito il branch locale, soltanto dopo aver verificato di non averne più bisogno:

```bash
git branch -d portfolio-professional-upgrade
```

Non usare `git reset --hard` per annullare questo lavoro.

## Unione dopo approvazione

```bash
git switch main
git pull --ff-only
git merge --no-ff portfolio-professional-upgrade
npm test
git push origin main
```

Merge, push e pubblicazione non fanno parte di questa consegna e richiedono approvazione esplicita.

