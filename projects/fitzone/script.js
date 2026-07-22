const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');
const dialog = document.querySelector('.video-dialog');
const siteHeader = document.querySelector('.site-header');
const heroSection = document.querySelector('.hero');
const navigationLinks = [...(menu?.querySelectorAll('a[href^="#"]') ?? [])];
const navigationSections = navigationLinks
  .map((link) => {
    const id = link.getAttribute('href').slice(1);
    const section = id === 'home' ? document.querySelector('.hero') : document.getElementById(id);
    return section ? { id, link, section } : null;
  })
  .filter(Boolean);

function setMenuState(isOpen) {
  if (!menuToggle || !menu) return;

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Chiudi il menu' : 'Apri il menu';
  menu.classList.toggle('is-open', isOpen);
}

menuToggle?.addEventListener('click', (event) => {
  const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  setMenuState(willOpen);

  if (willOpen && event.detail === 0) {
    navigationLinks[0]?.focus();
  }
});

menu?.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  setMenuState(false);

  if (event.detail === 0) {
    requestAnimationFrame(() => menuToggle?.focus());
  }
});

document.addEventListener('click', (event) => {
  if (!menu?.classList.contains('is-open')) return;
  if (menu.contains(event.target) || menuToggle?.contains(event.target)) return;
  setMenuState(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !menu?.classList.contains('is-open')) return;
  setMenuState(false);
  menuToggle?.focus();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 850) setMenuState(false);
});

function updateActiveNavigation() {
  if (!navigationSections.length) return;

  siteHeader?.classList.toggle('is-sticky', window.scrollY > (heroSection?.offsetHeight ?? 0) - 120);

  const marker = window.scrollY + Math.min(window.innerHeight * .35, 240);
  let activeSection = navigationSections[0];

  navigationSections.forEach((entry) => {
    const sectionTop = entry.section.getBoundingClientRect().top + window.scrollY;
    if (sectionTop <= marker) activeSection = entry;
  });

  navigationSections.forEach((entry) => {
    if (entry === activeSection) {
      entry.link.setAttribute('aria-current', 'location');
    } else {
      entry.link.removeAttribute('aria-current');
    }
  });
}

let navigationFrame = null;

function requestNavigationUpdate() {
  if (navigationFrame !== null) return;

  navigationFrame = requestAnimationFrame(() => {
    updateActiveNavigation();
    navigationFrame = null;
  });
}

window.addEventListener('scroll', requestNavigationUpdate, { passive: true });
window.addEventListener('resize', requestNavigationUpdate);
window.addEventListener('hashchange', requestNavigationUpdate);
updateActiveNavigation();

document.querySelectorAll('[data-section-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.sectionToggle;
    const target = document.querySelector(`.${targetId}`);
    if (!target) return;

    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const willExpand = !isExpanded;
    const isCourses = targetId === 'courses-grid';

    target.classList.toggle('is-expanded', willExpand);
    button.setAttribute('aria-expanded', String(willExpand));
    button.firstChild.textContent = willExpand
      ? (isCourses ? 'Mostra meno corsi ' : 'Mostra meno giorni ')
      : (isCourses ? 'Mostra tutti i corsi ' : 'Mostra tutta la settimana ');
  });
});

document.querySelector('[data-video-trigger]')?.addEventListener('click', () => dialog?.showModal());
document.querySelector('[data-video-close]')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const trialForm = document.querySelector('[data-trial-form]');
const formConfirmation = trialForm?.querySelector('[data-form-confirmation]');
const trialPlan = trialForm?.querySelector('#trial-plan');
const submitButton = trialForm?.querySelector('[data-submit-button]');
const submitLabel = submitButton?.querySelector('[data-submit-label]');

document.querySelectorAll('[data-plan]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!trialPlan) return;

    trialPlan.value = button.dataset.plan;
    validateTrialField(trialPlan);
  });
});

function getValidationMessage(field) {
  if (field.validity.valueMissing) {
    if (field.type === 'checkbox') return 'Devi accettare la privacy per continuare.';
    if (field.tagName === 'SELECT') return 'Seleziona una delle opzioni disponibili.';
    return 'Questo campo è obbligatorio.';
  }

  if (field.validity.typeMismatch) return 'Inserisci un indirizzo email valido.';
  if (field.validity.tooShort) return `Inserisci almeno ${field.minLength} caratteri.`;
  if (field.validity.patternMismatch) return 'Inserisci un numero di telefono valido.';
  return 'Controlla il valore inserito.';
}

function validateTrialField(field) {
  const error = trialForm?.querySelector(`[data-error-for="${field.id}"]`);
  if (!error) return field.validity.valid;

  const isValid = field.validity.valid;
  field.setAttribute('aria-invalid', String(!isValid));
  error.textContent = isValid ? '' : getValidationMessage(field);
  return isValid;
}

trialForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (submitButton?.disabled) return;
  formConfirmation.hidden = true;

  const formFields = [...trialForm.querySelectorAll('input, select, textarea')];
  let firstInvalidField = null;

  formFields.forEach((field) => {
    if (!validateTrialField(field) && !firstInvalidField) firstInvalidField = field;
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
    return;
  }

  submitButton.disabled = true;
  trialForm.setAttribute('aria-busy', 'true');
  if (submitLabel) submitLabel.textContent = 'Invio in corso…';

  // Integrazione futura: sostituire questa simulazione con Formspree,
  // EmailJS, Supabase o un backend personalizzato con validazione server-side.
  await new Promise((resolve) => window.setTimeout(resolve, 650));

  trialForm.reset();
  formFields.forEach((field) => field.setAttribute('aria-invalid', 'false'));
  submitButton.disabled = false;
  trialForm.removeAttribute('aria-busy');
  if (submitLabel) submitLabel.textContent = 'Invia richiesta demo';
  formConfirmation.hidden = false;
  formConfirmation.focus();
});

trialForm?.querySelectorAll('input, select, textarea').forEach((field) => {
  field.addEventListener('blur', () => validateTrialField(field));
  field.addEventListener(field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input', () => {
    formConfirmation.hidden = true;
    if (field.getAttribute('aria-invalid') === 'true') validateTrialField(field);
  });
});

document.querySelectorAll('.faq-item').forEach((item) => {
  const summary = item.querySelector('summary');
  if (!summary) return;

  const updateState = () => summary.setAttribute('aria-expanded', String(item.open));
  item.addEventListener('toggle', updateState);
  updateState();
});

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const mobileCta = document.querySelector('[data-mobile-cta]');
const mobileCtaObstacles = [trialForm, document.querySelector('.site-footer')].filter(Boolean);

if (mobileCta && 'IntersectionObserver' in window) {
  const visibleObstacles = new Set();
  const mobileCtaObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleObstacles.add(entry.target);
      else visibleObstacles.delete(entry.target);
    });
    mobileCta.classList.toggle('is-hidden', visibleObstacles.size > 0);
  }, { threshold: .08 });

  mobileCtaObstacles.forEach((element) => mobileCtaObserver.observe(element));
}
