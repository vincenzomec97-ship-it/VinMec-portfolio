const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#site-menu");
const yearTarget = document.querySelector("[data-year]");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (header && navToggle && navMenu) {
  const menuLinks = [...navMenu.querySelectorAll("a")];

  const closeMenu = ({ restoreFocus = false } = {}) => {
    header.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Apri menu");
    if (restoreFocus) navToggle.focus();
  };

  const openMenu = () => {
    header.classList.add("is-open");
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Chiudi menu");
    requestAnimationFrame(() => menuLinks[0]?.focus());
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  menuLinks.forEach((link) => link.addEventListener("click", () => closeMenu()));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      closeMenu({ restoreFocus: true });
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (header.classList.contains("is-open") && !header.contains(event.target)) {
      closeMenu();
    }
  });

  window.matchMedia("(min-width: 881px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectCards = [...document.querySelectorAll("[data-project-card]")];
const projectEmpty = document.querySelector("[data-project-empty]");
const projectResults = document.querySelector("[data-project-results]");

const applyProjectFilter = (filter) => {
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const categories = (card.dataset.filters || "").split(/\s+/).filter(Boolean);
    const isVisible = filter === "all" || categories.includes(filter);
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (projectEmpty) projectEmpty.hidden = visibleCount !== 0;
  if (projectResults) {
    projectResults.textContent = `${visibleCount} ${visibleCount === 1 ? "progetto mostrato" : "progetti mostrati"}`;
  }
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyProjectFilter(button.dataset.filter || "all"));
});

const canUsePointerGlow = window.matchMedia("(hover: hover) and (pointer: fine)").matches
  && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUsePointerGlow) {
  document.querySelectorAll(".project-card, .info-card, .skill-group").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--card-x");
      card.style.removeProperty("--card-y");
    });
  });
}

const contactForm = document.querySelector("[data-contact-form]");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const endpoint = contactForm.dataset.formEndpoint?.trim();
  const status = contactForm.querySelector(".form-status");
  const submitButton = contactForm.querySelector("button[type='submit']");

  if (endpoint) {
    if (status) status.textContent = "Invio in corso…";
    if (submitButton) submitButton.disabled = true;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Invio non completato");
      contactForm.reset();
      if (status) status.textContent = "Messaggio inviato correttamente.";
    } catch {
      if (status) status.textContent = "Invio non riuscito. Usa il collegamento email o LinkedIn.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
    return;
  }

  const subject = encodeURIComponent(`Richiesta portfolio da ${formData.get("Nome") || "un visitatore"}`);
  const body = encodeURIComponent(
    `Nome: ${formData.get("Nome") || ""}\nEmail: ${formData.get("Email") || ""}\n\n${formData.get("Messaggio") || ""}`
  );
  window.location.assign(`mailto:Vincenzomec97@gmail.com?subject=${subject}&body=${body}`);
});
