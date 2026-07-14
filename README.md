# Portfolio - Vincenzo Meccariello

Portfolio personale di Vincenzo Meccariello, Junior Web Developer, UI/UX Designer e AI Automation Junior.

## Live

Portfolio:
https://vincenzomec97-ship-it.github.io/VinMec-portfolio/

Progetto principale:
English Quiz Lab — case study incluso in `projects/english-quiz-lab/`.
Demo: https://english-quiz-lab-one.vercel.app/

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

## Come aggiungere un nuovo progetto

1. Creare una nuova cartella dentro `projects/`.

   Esempio:

   ```text
   projects/quiz-app/
   ```

2. Inserire il progetto dentro quella cartella.

   Esempio:

   ```text
   projects/quiz-app/index.html
   ```

3. Inserire lo screenshot o la preview dentro `assets/projects/`.

   Esempio:

   ```text
   assets/projects/quiz-app-preview.png
   ```

4. Aprire `data/projects.json`.

5. Aggiungere una nuova voce dentro l'array `projects` usando questi campi:

   - `title`
   - `badge`
   - `category`
   - `description`
   - `role`
   - `technologies`
   - `highlights`
   - `image`
   - `imageAlt`
   - `liveUrl`
   - `githubUrl`
   - `figmaUrl`

6. Salvare e testare il portfolio.

Nota: se apri `index.html` direttamente con `file://`, il browser potrebbe non caricare `data/projects.json`. In quel caso aggiorna anche il fallback in `assets/js/projects.js`, oppure testa con un server locale.

### Esempio futuro - Quiz App

Questo esempio è già preparato in `data/projects.json` come `futureProjectTemplate` con `published: false`, quindi non viene mostrato nel portfolio finché non lo sposti nell'array `projects` e lo imposti come pubblicato.

```json
{
  "title": "Quiz App — Web app interattiva in JavaScript",
  "badge": "JavaScript App",
  "category": "Web App",
  "description": "Web app interattiva per quiz a risposta multipla, sviluppata con HTML, CSS e JavaScript. Il progetto gestisce domande, risposte, punteggio finale e feedback all'utente.",
  "role": "Frontend Developer",
  "technologies": ["HTML", "CSS", "JavaScript"],
  "highlights": [
    "Struttura dell'interfaccia",
    "Logica delle domande",
    "Gestione del punteggio",
    "Feedback utente",
    "Responsive design e pubblicazione online"
  ],
  "image": "assets/projects/quiz-app-preview.png",
  "imageAlt": "Preview della Quiz App di Vincenzo Meccariello",
  "liveUrl": "projects/quiz-app/",
  "githubUrl": "",
  "figmaUrl": ""
}
```

## Progetti principali

- English Quiz Lab
- C.M. Pulizie
- FitZone
- Shoes Concept
- Registration Form

## Contatti

LinkedIn:
https://www.linkedin.com/in/vincenzo-meccariello-4140b9386/

GitHub:
https://github.com/vincenzomec97-ship-it

Email:
Vincenzomec97@gmail.com
