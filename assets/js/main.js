const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#site-menu");
const yearTarget = document.querySelector("[data-year]");
let projects = [];
let projectGroups = [];

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (header && navToggle && navMenu) {
  const closeMenu = () => {
    header.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Apri menu");
  };

  const openMenu = () => {
    header.classList.add("is-open");
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Chiudi menu");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

const projectList = document.querySelector("[data-project-list]");
const projectFilters = document.querySelector("[data-project-filters]");
const projectEmpty = document.querySelector("[data-project-empty]");
const projectTotal = document.querySelector("[data-project-total]");
const projectFigma = document.querySelector("[data-project-figma]");
const projectLive = document.querySelector("[data-project-live]");

const createNode = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text) {
    node.textContent = text;
  }
  return node;
};

const createProjectDetail = (label, value) => {
  const wrapper = document.createElement("div");
  const term = createNode("dt", "", label);
  const description = createNode("dd");

  if (Array.isArray(value)) {
    const list = createNode("ul", "project-highlights");
    value.forEach((item) => list.append(createNode("li", "", item)));
    description.append(list);
  } else {
    description.textContent = value;
  }

  wrapper.append(term, description);
  return wrapper;
};

const getFallbackProjects = () => {
  if (window.portfolioProjectFallback.projects) {
    return window.portfolioProjectFallback.projects;
  }

  return window.portfolioProjects || [];
};

const getCategoryKey = (category = "progetto") => category
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const defaultProjectGroups = [
  {
    key: "main",
    label: "Progetti principali",
    description: "I progetti pi forti del portfolio: uno orientato a un sito web completo per attivit reale e uno orientato a web app educativa, AI e logica applicativa."
  },
  {
    key: "business",
    label: "Progetti business / marketing",
    description: "Progetti pensati per mostrare mentalit aziendale, lead generation, landing page, conversione e gestione clienti."
  },
  {
    key: "ai",
    label: "Progetti AI / automation",
    description: "Progetti pensati per mostrare uso pratico di AI tools, automazioni e assistenti digitali applicati ad aziende reali o simulate."
  },
  {
    key: "figma",
    label: "Progetti UI/Figma",
    description: "Concept grafici realizzati in Figma per mostrare studio dell'interfaccia, composizione visuale, gerarchia e prototipazione."
  },
  {
    key: "practice",
    label: "Practice / Frontend",
    description: "Esercizi e componenti frontend realizzati per consolidare HTML, CSS, responsive design e struttura delle interfacce."
  }
];

const normalizeFilterCategories = (project) => {
  const groupKey = project.group || project.categoryKey || getCategoryKey(project.category || project.type);
  const groupLabel = project.groupLabel
    || projectGroups.find((group) => group.key === groupKey)?.label
    || project.category
    || project.type
    || "Progetto";

  return [{ key: groupKey, label: groupLabel }];
};

const createProjectLinks = (project) => {
  const links = [];

  if (project.detailUrl) {
    links.push({ label: "Case study", href: project.detailUrl, variant: project.featured ? "primary" : "secondary" });
  }

  if (project.liveUrl) {
    links.push({
      label: project.liveLabel || "Vedi sito",
      href: project.liveUrl,
      variant: project.id === "english-quiz-lab" ? "secondary" : (project.featured ? "primary" : "secondary")
    });
  }

  if (project.githubUrl) {
    links.push({ label: "Codice GitHub", href: project.githubUrl, variant: "secondary" });
  }

  if (project.figmaUrl) {
    links.push({ label: "Figma", href: project.figmaUrl, variant: project.featured ? "ghost" : "secondary" });
  }

  return links;
};


const normalizeProject = (project) => {
  const filterCategories = normalizeFilterCategories(project);
  const image = typeof project.image === "object"
    ? project.image
    : {
        src: project.image,
        alt: project.imageAlt,
        width: project.imageWidth,
        height: project.imageHeight,
        variant: project.imageVariant
      };
  const tags = project.tags || project.technologies || [];

  return {
    ...project,
    title: project.title || "Progetto",
    type: project.type || project.category || "Progetto web",
    status: project.status || project.badge || "Progetto",
    priority: Number.isFinite(Number(project.priority)) ? Number(project.priority) : Number(project.order || 999),
    order: Number.isFinite(Number(project.order)) ? Number(project.order) : Number(project.priority || 999),
    categoryKey: project.categoryKey || filterCategories[0].key,
    filterCategories,
    tags,
    care: project.highlights || project.care || [],
    image: {
      src: image.src || project.image || "",
      alt: image.alt || project.imageAlt || `Preview del progetto ${project.title}`,
      width: image.width || project.imageWidth || 1440,
      height: image.height || project.imageHeight || 900,
      variant: image.variant || project.imageVariant || "browser"
    },
    links: project.links || createProjectLinks(project)
  };
};

const getFallbackProjectData = () => ({
  projects: getFallbackProjects(),
  groups: window.portfolioProjectFallback.groups || defaultProjectGroups
});

const loadProjectData = async () => {
  if (window.location.protocol === "file:") {
    return getFallbackProjectData();
  }

  try {
    const response = await fetch("data/projects.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Projects JSON not available");
    }

    const payload = await response.json();

    if (Array.isArray(payload)) {
      return { projects: payload, groups: defaultProjectGroups };
    }

    if (!Array.isArray(payload.projects)) {
      throw new Error("Projects JSON has an invalid shape");
    }

    return {
      projects: payload.projects,
      groups: Array.isArray(payload.groups) ? payload.groups : defaultProjectGroups
    };
  } catch (error) {
    return getFallbackProjectData();
  }
};

const createProjectPlaceholder = (project) => {
  const placeholder = createNode("div", "project-placeholder");
  const mark = createNode("span", "project-placeholder-mark", "VM");
  const text = createNode("span", "project-placeholder-text", project.type || project.category || "Progetto web");
  placeholder.append(mark, text);
  return placeholder;
};

const createProjectMedia = (project) => {
  const mediaVariant = project.image.variant === "figma" ? "figma" : "browser";
  const media = createNode("div", `project-media project-media-${mediaVariant}`);

  if (!project.image.src) {
    media.append(createProjectPlaceholder(project));
    return media;
  }

  const image = document.createElement("img");
  image.src = project.image.src;
  image.alt = project.image.alt;
  image.width = project.image.width;
  image.height = project.image.height;
  image.loading = project.featured ? "eager" : "lazy";
  if (project.featured) {
    image.fetchPriority = "high";
  }
  image.decoding = "async";
  image.addEventListener("error", () => {
    image.remove();
    if (!media.querySelector(".project-placeholder")) {
      media.append(createProjectPlaceholder(project));
    }
  });
  media.append(image);
  return media;
};

const createProjectCard = (project) => {
  const cardClass = ["project-card"];
  if (project.featured) cardClass.push("project-featured");
  if (project.status === "Da sviluppare") cardClass.push("project-roadmap-card");
  const card = createNode("article", cardClass.join(" "));
  card.id = `project-${project.id}`;

  const media = createProjectMedia(project);
  const content = createNode("div", "project-content");
  if (project.badge) {
    content.append(createNode("span", "project-badge", project.badge));
  }

  if (project.status) {
    content.append(createNode("span", "project-status", project.status));
  }

  content.append(createNode("h3", "", project.title));
  content.append(createNode("p", "project-type", project.type));
  content.append(createNode("p", "", project.description));

  const details = createNode("dl", project.featured ? "project-details" : "project-details compact");
  details.append(
    createProjectDetail("Tecnologie", project.tags.join(", ")),
    createProjectDetail(project.featured ? "Dettaglio" : "Focus", project.longDescription || project.description)
  );

  const actions = createNode("div", "project-actions");
  project.links.forEach((link) => {
    const action = createNode("a", `button button-${link.variant || "secondary"}`, link.label);
    action.href = link.href;

    if (/^https:\/\//i.test(link.href)) {
      action.target = "_blank";
      action.rel = "noopener noreferrer";
    }

    actions.append(action);
  });

  if (project.links.length === 0) {
    actions.append(createNode("span", "project-status-note", "Link in arrivo"));
  }

  content.append(details, actions);
  card.append(media, content);
  return card;
};

const getProjectCategories = () => projectGroups
  .filter((group) => projects.some((project) => project.group === group.key))
  .map((group) => ({ key: group.key, label: group.label }));

const updateProjectStats = () => {
  if (projectTotal) {
    projectTotal.textContent = projects.length;
  }
  if (projectFigma) {
    projectFigma.textContent = projects.filter((project) => project.tags.includes("Figma")).length;
  }
  if (projectLive) {
    projectLive.textContent = projects.filter((project) => project.liveUrl).length;
  }
};


const createProjectSection = (group, sectionProjects) => {
  const isMainGroup = group.key === "main";
  const section = createNode("section", `project-group project-group-${group.key}`);
  const heading = createNode("div", "project-group-heading");
  heading.append(createNode("h3", "", group.label), createNode("p", "project-group-description", group.description));

  const grid = createNode("div", isMainGroup ? "project-group-grid project-featured-grid" : "project-group-grid project-grid");
  sectionProjects.forEach((project) => grid.append(createProjectCard(project)));

  section.append(heading, grid);
  return section;
};

const renderProjects = (filter = "all") => {
  if (!projectList) {
    return;
  }

  projectList.textContent = "";

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((project) => project.group === filter);

  if (projectEmpty) {
    projectEmpty.hidden = filteredProjects.length > 0;
  }

  if (filteredProjects.length === 0) {
    return;
  }

  const groupsToRender = projectGroups.filter((group) => filteredProjects.some((project) => project.group === group.key));

  groupsToRender.forEach((group) => {
    const groupProjects = filteredProjects
      .filter((project) => project.group === group.key)
      .sort((a, b) => a.priority - b.priority);
    projectList.append(createProjectSection(group, groupProjects));
  });

  bindGlowCards();
};

const renderProjectFilters = () => {
  if (!projectFilters || projects.length === 0) {
    return;
  }

  const filters = [{ key: "all", label: "Tutti i gruppi" }, ...getProjectCategories()];
  projectFilters.textContent = "";

  filters.forEach((filter, index) => {
    const count = filter.key === "all"
      ? projects.length
      : projects.filter((project) => project.group === filter.key).length;
    const button = createNode("button", "project-filter", filter.label);
    const countNode = createNode("span", "project-filter-count", count);
    button.type = "button";
    button.dataset.filter = filter.key;
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    if (index === 0) {
      button.classList.add("is-active");
    }
    button.append(countNode);
    button.addEventListener("click", () => {
      projectFilters.querySelectorAll(".project-filter").forEach((filterButton) => {
        filterButton.classList.remove("is-active");
        filterButton.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");
      renderProjects(filter.key);
    });
    projectFilters.append(button);
  });
};

const bindGlowCards = () => {
  const glowCards = document.querySelectorAll(".project-card, .info-card, .skill-group");

  glowCards.forEach((card) => {
    if (card.dataset.glowBound === "true") {
      return;
    }
    card.dataset.glowBound = "true";

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--card-x");
      card.style.removeProperty("--card-y");
    });

    card.addEventListener("pointerdown", () => {
      document.querySelectorAll(".project-card, .info-card, .skill-group").forEach((item) => item.classList.remove("is-selected"));
      card.classList.add("is-selected");
    });
  });
};

const initProjects = async () => {
  const projectData = await loadProjectData();
  projectGroups = projectData.groups || defaultProjectGroups;
  projects = projectData.projects
    .filter((project) => project && project.published !== false && !project.isFutureTemplate)
    .map(normalizeProject)
    .sort((a, b) => a.priority - b.priority);

  updateProjectStats();
  renderProjectFilters();
  renderProjects();
  bindGlowCards();
};

initProjects();
