import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const ignoredDirectories = new Set([".git", "node_modules"]);
const errors = [];
const warnings = [];

const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  if (ignoredDirectories.has(entry.name)) return [];
  const target = join(directory, entry.name);
  return entry.isDirectory() ? walk(target) : [target];
});

const files = walk(root);
const htmlFiles = files.filter((file) => extname(file).toLowerCase() === ".html");
const titles = new Map();

const addTitle = (title, file) => {
  if (!titles.has(title)) titles.set(title, []);
  titles.get(title).push(file);
};

for (const file of htmlFiles) {
  const source = readFileSync(file, "utf8");
  const label = relative(root, file);
  const title = source.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) errors.push(`${label}: title mancante`);
  else addTitle(title, label);
  if (!/<meta\s+name=["']description["']/i.test(source)) errors.push(`${label}: meta description mancante`);
  if (!/<link\s+rel=["']canonical["']/i.test(source)) errors.push(`${label}: canonical mancante`);
  const h1Count = (source.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) errors.push(`${label}: atteso un H1, trovati ${h1Count}`);

  for (const match of source.matchAll(/<img\b[^>]*>/gi)) {
    const image = match[0];
    if (!/\balt=["'][^"']*["']/i.test(image)) errors.push(`${label}: immagine senza attributo alt`);
    if (!/\bwidth=["']\d+["']/i.test(image) || !/\bheight=["']\d+["']/i.test(image)) warnings.push(`${label}: immagine senza dimensioni esplicite`);
  }

  for (const match of source.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|#|data:|javascript:)/i.test(reference)) continue;
    const cleanReference = decodeURIComponent(reference.split(/[?#]/)[0]);
    if (!cleanReference) continue;
    let target = resolve(dirname(file), cleanReference);
    if (cleanReference.endsWith("/")) target = resolve(target, "index.html");
    if (!existsSync(target)) errors.push(`${label}: riferimento locale non trovato: ${reference}`);
  }

  for (const match of source.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch { errors.push(`${label}: JSON-LD non valido`); }
  }
}

for (const [title, duplicates] of titles) {
  if (duplicates.length > 1) warnings.push(`Title duplicato "${title}": ${duplicates.join(", ")}`);
}

const projects = JSON.parse(readFileSync(resolve(root, "data/projects.json"), "utf8")).projects;
const publishedProjects = projects.filter((item) => item.published !== false);
const index = readFileSync(resolve(root, "index.html"), "utf8");
for (const project of publishedProjects) {
  if (!index.includes(`id="project-${project.id}"`)) errors.push(`Card statica mancante: ${project.id}`);
}
for (const project of projects.filter((item) => item.published === false)) {
  if (index.includes(`id="project-${project.id}"`)) errors.push(`Card non pubblicata ancora presente: ${project.id}`);
}

console.log(`Audit: ${htmlFiles.length} pagine HTML, ${publishedProjects.length} progetti pubblicati, ${warnings.length} avvisi.`);
for (const warning of warnings) console.warn(`AVVISO: ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`ERRORE: ${error}`);
  process.exit(1);
}
console.log("Audit strutturale completato senza errori.");
