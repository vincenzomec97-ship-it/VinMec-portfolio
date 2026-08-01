import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dataPath = resolve(root, "data/projects.json");
const indexPath = resolve(root, "index.html");
const fallbackPath = resolve(root, "assets/js/projects.js");
const checkOnly = process.argv.includes("--check");
const normalizeLineEndings = (value) => value.replace(/\r\n?/g, "\n");

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const payload = JSON.parse(readFileSync(dataPath, "utf8"));
const projects = payload.projects
  .filter((project) => project.published !== false)
  .sort((a, b) => Number(a.priority) - Number(b.priority));
const featuredProjects = projects.filter((project) => (project.filters || []).includes("featured"));
const groupKeys = new Set(payload.groups.map((group) => group.key));

const ids = new Set();
for (const project of projects) {
  for (const field of ["id", "title", "type", "description", "problem", "solution", "role", "status", "image", "imageAlt"]) {
    if (!project[field]) throw new Error(`${project.id || "Progetto"}: campo obbligatorio mancante: ${field}`);
  }
  if (ids.has(project.id)) throw new Error(`ID progetto duplicato: ${project.id}`);
  ids.add(project.id);
  if (!Array.isArray(project.tags) || project.tags.length > 5) throw new Error(`${project.id}: tags deve contenere da 0 a 5 voci`);
  if (!groupKeys.has(project.group) || project.group === "featured") throw new Error(`${project.id}: tipologia principale non valida: ${project.group}`);
  const categoryFilters = (project.filters || []).filter((filter) => filter !== "featured");
  if (categoryFilters.length !== 1 || categoryFilters[0] !== project.group) {
    throw new Error(`${project.id}: assegna una sola tipologia principale coerente con group`);
  }
  if (!existsSync(resolve(root, project.image))) throw new Error(`${project.id}: immagine non trovata: ${project.image}`);
}
if (featuredProjects.length !== 3) throw new Error(`La selezione principale deve contenere 3 progetti, trovati ${featuredProjects.length}`);

const externalAttributes = (href) => /^https:\/\//i.test(href)
  ? ' target="_blank" rel="noopener noreferrer"'
  : "";

const getLinks = (project) => [
  project.detailUrl && { label: "Case study", href: project.detailUrl, variant: project.featured ? "primary" : "secondary" },
  project.liveUrl && { label: project.liveLabel || "Demo online", href: project.liveUrl, variant: project.detailUrl ? "secondary" : "primary" },
  project.githubUrl && { label: "GitHub", href: project.githubUrl, variant: "secondary" },
  project.figmaUrl && {
    label: "Apri in Figma",
    href: project.figmaUrl,
    variant: project.detailUrl || project.liveUrl || project.githubUrl ? "ghost" : "primary"
  }
].filter(Boolean);

const renderCard = (project) => {
  const classes = ["project-card"];
  if (project.featured) classes.push("project-featured", "project-lead");
  if (project.compact) classes.push("project-card-compact");
  const filters = [...new Set([...(project.filters || []), project.group].filter(Boolean))];
  const tags = project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("");
  const links = getLinks(project).map((link) =>
    `<a class="button button-${escapeHtml(link.variant)}" href="${escapeHtml(link.href)}"${externalAttributes(link.href)}>${escapeHtml(link.label)}</a>`
  ).join("");

  return `        <article class="${classes.join(" ")}" id="project-${escapeHtml(project.id)}" data-project-card data-filters="${escapeHtml(filters.join(" "))}">
          <div class="project-media project-media-${project.imageVariant === "figma" ? "figma" : "browser"}">
            <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" width="${Number(project.imageWidth)}" height="${Number(project.imageHeight)}" loading="lazy" decoding="async">
          </div>
          <div class="project-content">
            <div class="project-card-header">
              <span class="project-badge">${escapeHtml(project.badge)}</span>
              <span class="project-status">${escapeHtml(project.status)}</span>
            </div>
            <h3>${escapeHtml(project.title)}</h3>
            <p class="project-type">${escapeHtml(project.type)}</p>
            <p>${escapeHtml(project.description)}</p>
            <dl class="project-quick-facts">
              <div><dt>Problema</dt><dd>${escapeHtml(project.problem)}</dd></div>
              <div><dt>Soluzione</dt><dd>${escapeHtml(project.solution)}</dd></div>
              <div><dt>Ruolo</dt><dd>${escapeHtml(project.role)}</dd></div>
            </dl>
            <div class="project-tech"><span>Tecnologie principali</span><ul>${tags}</ul></div>
            <div class="project-actions">${links}</div>
          </div>
        </article>`;
};

const countForGroup = (key) => projects.filter((project) => (project.filters || []).includes(key) || project.group === key).length;
const filters = [
  `<button class="project-filter is-active" type="button" data-filter="all" aria-pressed="true">Tutti <span class="project-filter-count">${projects.length}</span></button>`,
  ...payload.groups
    .filter((group) => countForGroup(group.key) > 0)
    .map((group) => `<button class="project-filter" type="button" data-filter="${escapeHtml(group.key)}" aria-pressed="false">${escapeHtml(group.label)} <span class="project-filter-count">${countForGroup(group.key)}</span></button>`)
].join("\n          ");

const generatedBlock = `<!-- PROJECTS:START -->
      <div class="project-toolbar">
        <p>Esplora per tipologia</p>
        <div class="project-filters" data-project-filters aria-label="Filtri progetti">
          ${filters}
        </div>
      </div>
      <p class="project-filter-note">Ogni lavoro appartiene a una sola tipologia. “3 principali” raccoglie Adriana, English Quiz Lab e C.M. Pulizie.</p>
      <p class="project-results" data-project-results role="status" aria-live="polite">${projects.length} progetti mostrati</p>
      <div class="project-grid portfolio-project-grid" data-project-list>
${projects.map(renderCard).join("\n")}
      </div>
      <p class="project-empty" data-project-empty hidden>Nessun progetto trovato per questo filtro.</p>
      <noscript><p class="project-noscript">Tutti i progetti e i relativi collegamenti sono disponibili anche senza JavaScript; i filtri richiedono JavaScript.</p></noscript>
<!-- PROJECTS:END -->`;

const originalIndex = readFileSync(indexPath, "utf8");
if (!originalIndex.includes("<!-- PROJECTS:START -->") || !originalIndex.includes("<!-- PROJECTS:END -->")) {
  throw new Error("Marker PROJECTS non trovati in index.html");
}

let generatedIndex = originalIndex.replace(/<!-- PROJECTS:START -->[\s\S]*?<!-- PROJECTS:END -->/, generatedBlock);
generatedIndex = generatedIndex
  .replace(/(<strong data-project-total>)[^<]*(<\/strong>)/, `$1${featuredProjects.length}$2`)
  .replace(/(<strong data-project-figma>)[^<]*(<\/strong>)/, `$1${projects.filter((project) => project.group === "figma").length}$2`)
  .replace(/(<strong data-project-live>)[^<]*(<\/strong>)/, `$1${projects.filter((project) => project.liveUrl).length}$2`);

const fallback = `/* File generato da data/projects.json con npm run generate. */\nwindow.portfolioProjectFallback = ${JSON.stringify(payload, null, 2)};\nwindow.portfolioProjects = window.portfolioProjectFallback.projects;\n`;

if (checkOnly) {
  const errors = [];
  if (normalizeLineEndings(generatedIndex) !== normalizeLineEndings(originalIndex)) {
    errors.push("index.html non è sincronizzato con data/projects.json");
  }
  if (!existsSync(fallbackPath) || normalizeLineEndings(readFileSync(fallbackPath, "utf8")) !== fallback) {
    errors.push("assets/js/projects.js non è sincronizzato con data/projects.json");
  }
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(`Contenuti generati verificati: ${projects.length} progetti.`);
} else {
  writeFileSync(indexPath, generatedIndex, "utf8");
  writeFileSync(fallbackPath, fallback, "utf8");
  console.log(`Generati HTML statico e fallback per ${projects.length} progetti.`);
}
