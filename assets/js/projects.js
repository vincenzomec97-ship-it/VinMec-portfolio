/*
  Per aggiungere un nuovo progetto:
  1. Duplica uno degli oggetti qui sotto.
  2. Cambia id, title, description, image, role, technologies, care e links.
  3. Usa featured: true solo per il progetto principale.
  4. Usa categoryKey coerenti: "web", "ui", "frontend".
*/

window.portfolioProjects = [
  {
    id: "cm-pulizie",
    featured: true,
    category: "Siti web",
    categoryKey: "web",
    badge: "Progetto principale",
    title: "C.M. Pulizie - Sito web completo per impresa locale",
    description: "Sito web completo per un'attivit\u00e0 di pulizie, progettato prima su Figma e poi sviluppato in codice. Il progetto presenta servizi, richiesta preventivo, recensioni, contatti e una struttura pensata per clienti locali.",
    role: "UI Designer & Frontend Developer",
    technologies: ["Figma", "HTML", "CSS", "JavaScript", "JSON", "GitHub Pages"],
    care: "Design dell'interfaccia, layout responsive, sezioni servizi, preventivo dinamico, call to action, chatbot controllato, WhatsApp, SEO tecnica base e pubblicazione online.",
    image: {
      src: "assets/progetto-figma-2.png",
      alt: "Screenshot del sito C.M. Pulizie",
      width: 2560,
      height: 1662,
      variant: "browser"
    },
    links: [
      { label: "Live Site", href: "https://vincenzomec97-ship-it.github.io/cm-pulizie/", variant: "primary" },
      { label: "GitHub", href: "https://github.com/vincenzomec97-ship-it/cm-pulizie", variant: "secondary" },
      { label: "Figma", href: "https://www.figma.com/proto/Qlefn1I3qe1WEOijl20qUR/Untitled?t=QmHGINTnjDozetfi-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&node-id=1-75", variant: "ghost" }
    ]
  },
  {
    id: "fitzone",
    featured: false,
    category: "Siti web",
    categoryKey: "web",
    title: "FitZone - Landing page palestra",
    description: "Concept UI per una landing page dedicata a una palestra. Design energico, forte e diretto, pensato per comunicare motivazione, fiducia e azione immediata.",
    role: "UI/UX Designer",
    technologies: ["Figma", "HTML", "CSS"],
    care: "Hero section, navigazione, call to action, composizione visuale e stile grafico.",
    image: {
      src: "assets/progetto-figma-3.png",
      alt: "Screenshot della landing page FitZone",
      width: 2560,
      height: 1664,
      variant: "browser"
    },
    links: [
      { label: "Demo", href: "gym-home.html", variant: "secondary" },
      { label: "Figma", href: "https://www.figma.com/proto/CgFRuCSFPFhb6KcRTZqYZa/Untitled?node-id=1-12&p=f&t=c04ReWw6m3h8teUK-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1", variant: "ghost" }
    ]
  },
  {
    id: "shoes-concept",
    featured: false,
    category: "UI concept",
    categoryKey: "ui",
    title: "Shoes Concept - E-commerce sneaker",
    description: "Concept creativo per uno store online di sneaker. Il progetto mostra una UI sperimentale, con attenzione a immagine prodotto, card, ricerca e navigazione.",
    role: "UI Designer",
    technologies: ["Figma"],
    care: "Layout e-commerce, card prodotto, stile visuale, navigazione e struttura della pagina.",
    image: {
      src: "assets/progetto-figma-1.png",
      alt: "Mockup Figma del concept e-commerce Shoes",
      width: 2576,
      height: 3344,
      variant: "figma"
    },
    links: [
      { label: "Figma", href: "https://www.figma.com/proto/G09Tq8i37addPsCe293DVz/Untitled?t=ncBAfwnNsLpot8OY-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=2-2", variant: "secondary" }
    ]
  },
  {
    id: "registration-form",
    featured: false,
    category: "Frontend",
    categoryKey: "frontend",
    title: "Registration Form - Form responsive",
    description: "Form di registrazione responsive con campi base, validazione HTML5 e stile scuro.",
    role: "Frontend Developer",
    technologies: ["HTML", "CSS"],
    care: "Struttura del form, input, checkbox, responsive e stile visuale.",
    image: {
      src: "assets/foto-registrazione.png",
      alt: "Screenshot del form di registrazione responsive",
      width: 1082,
      height: 684,
      variant: "browser"
    },
    links: [
      { label: "Demo", href: "registration.html", variant: "secondary" }
    ]
  }
];
