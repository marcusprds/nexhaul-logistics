const FORM_ENDPOINT = "";
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const menuOverlay = document.querySelector("[data-menu-overlay]");
const navLinks = [...document.querySelectorAll("[data-nav] a[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];
const formTabs = [...document.querySelectorAll("[data-form-tab]")];
const formPanels = [...document.querySelectorAll("[data-form-panel]")];
let menuReturnFocus = null;

function setMenu(open) {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  if (menuOverlay) menuOverlay.hidden = !open;

  if (open) {
    menuReturnFocus = document.activeElement;
    navigation.querySelector("a")?.focus();
  } else if (menuReturnFocus instanceof HTMLElement && window.innerWidth <= 1088) {
    menuReturnFocus.focus();
    menuReturnFocus = null;
  }
}

menuToggle?.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
menuOverlay?.addEventListener("click", () => setMenu(false));
navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("click", (event) => {
  if (menuToggle?.getAttribute("aria-expanded") !== "true") return;
  if (navigation?.contains(event.target) || menuToggle?.contains(event.target)) return;
  setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
  if (event.key !== "Tab" || menuToggle?.getAttribute("aria-expanded") !== "true") return;

  const focusable = [menuToggle, ...navigation.querySelectorAll("a")].filter(Boolean);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1088 && menuToggle?.getAttribute("aria-expanded") === "true") setMenu(false);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-35% 0px -55%", threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll("details[open]").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

function activateFormTab(name, moveFocus = false) {
  formTabs.forEach((tab) => {
    const selected = tab.dataset.formTab === name;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) tab.focus();
  });
  formPanels.forEach((panel) => {
    panel.hidden = panel.dataset.formPanel !== name;
  });
}

formTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateFormTab(tab.dataset.formTab));
  tab.addEventListener("keydown", (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % formTabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + formTabs.length) % formTabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = formTabs.length - 1;
    activateFormTab(formTabs[next].dataset.formTab, true);
  });
});

document.querySelectorAll("[data-form-tab-link]").forEach((link) => {
  link.addEventListener("click", () => activateFormTab(link.dataset.formTabLink));
});

document.querySelectorAll("[data-set-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = document.querySelector("[data-service-select]");
    if (select) select.value = link.dataset.setService;
  });
});

document.querySelectorAll("[data-set-industry]").forEach((link) => {
  link.addEventListener("click", () => {
    const input = document.querySelector("[data-industry-input]");
    if (input) input.value = link.dataset.setIndustry;
  });
});

document.querySelectorAll("[data-set-topic]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = document.querySelector("[data-topic-select]");
    if (select) select.value = link.dataset.setTopic;
  });
});

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
document.querySelectorAll("[data-future-date]").forEach((input) => input.setAttribute("min", localDate));

function clearFieldError(control) {
  control.removeAttribute("aria-invalid");
  const errorId = control.getAttribute("aria-describedby");
  if (!errorId) return;
  document.getElementById(errorId)?.remove();
  control.removeAttribute("aria-describedby");
}

function showFieldError(control) {
  clearFieldError(control);
  const error = document.createElement("span");
  const suffix = Math.random().toString(36).slice(2, 8);
  error.id = `${control.name || "field"}-${suffix}-error`;
  error.className = "form-error";
  if (control.validity.typeMismatch) error.textContent = "Enter a valid email address.";
  else if (control.validity.rangeUnderflow) error.textContent = "Choose today or a future date.";
  else error.textContent = "Please complete this required field.";
  control.setAttribute("aria-invalid", "true");
  control.setAttribute("aria-describedby", error.id);
  const label = control.closest("label");
  (label || control).insertAdjacentElement("afterend", error);
}

function validateForm(form) {
  const invalid = [...form.elements].filter((control) => control.willValidate && !control.validity.valid);
  invalid.forEach(showFieldError);
  invalid[0]?.focus();
  return invalid.length === 0;
}

document.querySelectorAll("[data-inquiry-form]").forEach((form) => {
  form.querySelectorAll("input, select, textarea").forEach((control) => {
    control.addEventListener("input", () => clearFieldError(control));
    control.addEventListener("change", () => clearFieldError(control));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    form.querySelectorAll("input, select, textarea").forEach(clearFieldError);
    form.querySelector(".form-submit-error")?.remove();
    const success = form.querySelector(".form-success");
    if (success) success.hidden = true;
    if (!validateForm(form)) return;

    const button = form.querySelector("button[type='submit']");
    const originalLabel = button.innerHTML;
    button.disabled = true;
    button.textContent = FORM_ENDPOINT ? "Sending…" : "Validated";

    try {
      if (FORM_ENDPOINT) {
        const payload = new FormData(form);
        payload.append("inquiryType", form.dataset.formType || "general");
        const response = await fetch(FORM_ENDPOINT, { method: "POST", body: payload, headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error("Submission failed");
      }
      if (success) success.hidden = false;
      form.reset();
      success?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch {
      const failure = document.createElement("p");
      failure.className = "form-submit-error";
      failure.setAttribute("role", "alert");
      failure.textContent = "The inquiry could not be sent. Please try again or use the published contact details.";
      form.append(failure);
    } finally {
      button.disabled = false;
      button.innerHTML = originalLabel;
    }
  });
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
