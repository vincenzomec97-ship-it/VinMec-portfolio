const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#site-menu");
const yearTarget = document.querySelector("[data-year]");
let projects = [];

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
  if (window.portfolioProjectFallback?.projects) {
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

const normalizeFilterCategories = (project) => {
  const providedCategories = Array.isArray(project.filterCategories)
    ? project.filterCategories
    : [];

  const normalizedCategories = providedCategories
    .filter((category) => category?.key && category?.label)
    .map((category) => ({
      key: category.key,
      label: category.label
    }));

  if (normalizedCategories.length > 0) {
    return normalizedCategories;
  }

  return [{
    key: project.categoryKey || getCategoryKey(project.category),
    label: project.category
  }];
};


const createProjectLinks = (project) => {
  const links = [];

  if (project.liveUrl) {
    links.push({ label: "Vedi sito", href: project.liveUrl, variant: project.featured ? "primary" : "secondary" });
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
    order: Number.isFinite(Number(project.order)) ? Number(project.order) : 999,
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

const loadProjects = async () => {
  try {
    const response = await fetch("data/projects.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Projects JSON not available");
    }

    const payload = await response.json();
    const projectList = Array.isArray(payload) ? payload : payload.projects;

    if (!Array.isArray(projectList)) {
      throw new Error("Projects JSON has an invalid shape");
    }

    return projectList;
  } catch (error) {
    return getFallbackProjects();
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
  const card = createNode("article", project.featured ? "project-card project-featured" : "project-card");
  card.id = `project-${project.id}`;

  const media = createProjectMedia(project);
  const content = createNode("div", "project-content");
  if (project.status) {
    content.append(createNode("span", "project-badge", project.status));
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

    if (/^https?:\/\//i.test(link.href)) {
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

const getProjectCategories = () => {
  const categories = [];
  projects.forEach((project) => {
    project.filterCategories.forEach((projectCategory) => {
      if (!categories.some((category) => category.key === projectCategory.key)) {
        categories.push(projectCategory);
      }
    });
  });
  return categories;
};

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


const createProjectSection = (title, description, sectionProjects, className) => {
  const section = createNode("section", `project-section-block ${className}`);
  const heading = createNode("div", "project-section-head");
  heading.append(createNode("h3", "", title), createNode("p", "", description));

  const grid = createNode("div", className === "project-featured-block" ? "project-featured-grid" : "project-grid");
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
    : projects.filter((project) => project.filterCategories.some((category) => category.key === filter));

  if (projectEmpty) {
    projectEmpty.hidden = filteredProjects.length > 0;
  }

  if (filteredProjects.length === 0) {
    return;
  }

  const featuredProjects = filteredProjects.filter((project) => project.featured);
  const secondaryProjects = filteredProjects.filter((project) => !project.featured);

  if (featuredProjects.length > 0) {
    projectList.append(createProjectSection(
      "Progetti principali",
      "Lavori pi? completi, pensati per mostrare competenze applicate a casi reali o web app strutturate.",
      featuredProjects,
      "project-featured-block"
    ));
  }

  if (secondaryProjects.length > 0) {
    projectList.append(createProjectSection(
      "Altri progetti",
      "Esercitazioni, landing page e sperimentazioni utili per allenare design, codice e logica frontend.",
      secondaryProjects,
      "project-secondary-block"
    ));
  }

  bindGlowCards();
};

const renderProjectFilters = () => {
  if (!projectFilters || projects.length === 0) {
    return;
  }

  const filters = [{ key: "all", label: "Tutti" }, ...getProjectCategories()];
  projectFilters.textContent = "";

  filters.forEach((filter, index) => {
    const count = filter.key === "all"
      ? projects.length
      : projects.filter((project) => project.filterCategories.some((category) => category.key === filter.key)).length;
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
  const loadedProjects = await loadProjects();
  projects = loadedProjects
    .filter((project) => project && project.published !== false && !project.isFutureTemplate)
    .map(normalizeProject)
    .sort((a, b) => a.order - b.order);

  updateProjectStats();
  renderProjectFilters();
  renderProjects();
  bindGlowCards();
};

initProjects();
