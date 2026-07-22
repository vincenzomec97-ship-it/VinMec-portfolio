# Portfolio - Vincenzo Meccariello

Portfolio personale di Vincenzo Meccariello, Junior Web Developer, UI/UX Designer e AI Automation Junior.

## Live

Portfolio:
https://vincenzomec97-ship-it.github.io/VinMec-portfolio/

Progetto principale:
C.M. Pulizie:
https://vincenzomec97-ship-it.github.io/cm-pulizie/

## Profilo

Creo siti web, landing page e piccole web app da Figma al codice, unendo Frontend, UI/UX, AI tools, Vibe Coding e Digital Marketing.

## Tecnologie

- HTML5
- CSS3
- JavaScript
- Figma
- GitHub Pages
- AI-assisted workflow
- Vibe Coding
- SEO base
- Digital Marketing

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

- C.M. Pulizie
- English Quiz Lab

### Progetti business / marketing

- FitZone — Landing Page Palestra (demo completa e case study)
- Dashboard clienti

### Progetti AI / automation

- Chatbot aziendale

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
