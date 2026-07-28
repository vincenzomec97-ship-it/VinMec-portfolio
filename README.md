# Portfolio - Vincenzo Meccariello

Portfolio personale di Vincenzo Meccariello, Junior Frontend Developer e UI/UX Designer.

## Live

Portfolio:
https://vincenzomec97-ship-it.github.io/VinMec-portfolio/

Progetto principale:
English Quiz Lab:
https://english-quiz-lab-one.vercel.app/

## Profilo

Creo siti web, landing page e piccole web app da Figma al codice. Uso strumenti AI e automazioni quando aggiungono un vantaggio concreto al processo o al prodotto.

## Tecnologie

- HTML5
- CSS3
- JavaScript
- Node.js
- Supabase
- Figma
- GitHub Pages
- AI-assisted workflow
- SEO base

## Struttura progetti

I progetti sono organizzati in:

```text
projects/
assets/projects/
data/projects.json
```

La sezione Progetti viene generata da `data/projects.json`. Ogni progetto usa il campo `group` per decidere dove comparire nel portfolio.

## Organizzazione portfolio

### Progetti principali

- English Quiz Lab
- C.M. Pulizie

### Progetti business / marketing

- ClientFlow — Dashboard CRM per la gestione delle richieste
- FitZone — Landing Page Palestra (demo completa e case study)

### Progetti AI / automation

- CasaBot — Assistente conversazionale rule-based

### Demo 3D / Esperimenti

- Shoes M.V. — Demo 3D (base sperimentale collegata al concept Figma)

### Progetti UI/Figma

- Shoes Concept
- C.M. Pulizie - Figma Concept
- Fitness Landing - Figma Concept

### Practice / Frontend

- Pagina registrazione / Registration Form

I progetti indicati come In sviluppo o Da sviluppare sono presenti nella roadmap del portfolio e verranno aggiornati con demo, screenshot e link quando saranno completati.

## Come aggiungere o completare un progetto

1. Aprire `data/projects.json`.
2. Copiare un oggetto esistente oppure aggiornare la card roadmap già presente.
3. Modificare i campi principali:

   - `title`
   - `type`
   - `description`
   - `longDescription`
   - `image`
   - `tags`
   - `badge`
   - `status`
   - `priority`
   - `group`
   - `groupLabel`
   - `liveUrl`
   - `githubUrl`
   - `figmaUrl`
   - `year`
   - `category`

4. Usare uno di questi gruppi:

   - `main`
   - `business`
   - `ai`
   - `demo3d`
   - `figma`
   - `practice`

5. Non inserire link finti o localhost. Se un link non esiste ancora, lasciare il campo vuoto.
6. Salvare e testare il portfolio.

Quando un progetto roadmap sarà completato, basterà aggiornare `status`, descrizione, screenshot, link demo, link GitHub, eventuale case study e README.

Nota: se apri `index.html` direttamente con `file://`, il browser potrebbe non caricare `data/projects.json`. In quel caso aggiorna anche il fallback in `assets/js/projects.js`, oppure testa con un server locale.

## Contatti

LinkedIn:
https://www.linkedin.com/in/vincenzo-meccariello-4140b9386/

GitHub:
https://github.com/vincenzomec97-ship-it

Email:
Vincenzomec97@gmail.com
