// =========================================================
// scroll-up (comportamiento original)
// =========================================================
document.getElementById("button-up").addEventListener("click", scrollUp);

function scrollUp() {
  var CurrentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (CurrentScroll > 0) {
    window.scrollTo(0, 0);
  }
}
buttonUp = document.getElementById("button-up");

window.onscroll = function () {
  var scroll = document.documentElement.scrollTop;

  if (scroll > 1800) {
    buttonUp.style.transform = "scale(1)";
  } else if (scroll < 1800) {
    buttonUp.style.transform = "scale(0)";
  }
};

// =========================================================
// title page (usa el idioma activo)
// =========================================================
const htmlEl = document.documentElement;
let previousTitle = document.title;

window.addEventListener("blur", () => {
  previousTitle = document.title;
  document.title = htmlEl.dataset["blur" + capitalize(htmlEl.lang)];
});

window.addEventListener("focus", () => {
  document.title = previousTitle;
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// =========================================================
// footer message effect (re-ejecutable al cambiar de idioma)
// =========================================================
const thanksEl = document.getElementById("thanks");
let typewriterTimeoutId = null;

function startTypewriter(str) {
  clearTimeout(typewriterTimeoutId);
  thanksEl.innerHTML = "";
  let i = 0;
  const speed = 60;

  function typeWriter() {
    if (i < str.length) {
      thanksEl.innerHTML += str.charAt(i);
      i++;
      typewriterTimeoutId = setTimeout(typeWriter, speed);
    }
  }
  typewriterTimeoutId = setTimeout(typeWriter, speed);
}

// =========================================================
// NAVBAR: efecto vidrio al hacer scroll
// =========================================================
const mainNav = document.getElementById("mainNav");
const langSwitch = document.getElementById("langSwitch");

function toggleNavGlass() {
  const isScrolled = window.scrollY > 80;
  mainNav.classList.toggle("scrolled", isScrolled);
  if (langSwitch) langSwitch.classList.toggle("scrolled", isScrolled);
}
toggleNavGlass();
window.addEventListener("scroll", toggleNavGlass);

// =========================================================
// NAVBAR: resaltar el link de la sección activa
// =========================================================
const navLinks = document.querySelectorAll(".nav-link");
const spySections = document.querySelectorAll("main section[id], #about-me");

const navSpy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          '.nav-link[href="#' + id + '"]'
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
spySections.forEach((section) => navSpy.observe(section));

// cerrar el menú colapsable (mobile) al elegir una sección
const navbarCollapseEl = document.getElementById("navbar-toggler");
const navbarTogglerBtn = document.querySelector(".navbar-toggler");

if (navbarCollapseEl && window.bootstrap) {
  const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(
    navbarCollapseEl,
    { toggle: false }
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapseEl.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  // icono hamburguesa -> X, con transición suave
  navbarCollapseEl.addEventListener("show.bs.collapse", () => {
    navbarTogglerBtn.classList.add("is-open");
  });
  navbarCollapseEl.addEventListener("hide.bs.collapse", () => {
    navbarTogglerBtn.classList.remove("is-open");
  });
}

// =========================================================
// Revelado progresivo al hacer scroll (data-reveal)
// =========================================================
const revealEls = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// =========================================================
// SELECTOR DE IDIOMA (ES / EN)
// =========================================================
const textNodes = document.querySelectorAll("[data-i18n]");
const htmlNodes = document.querySelectorAll("[data-i18n-html]");
const langButtons = document.querySelectorAll(".lang-btn");

function applyLanguage(lang) {
  htmlEl.lang = lang;

  textNodes.forEach((el) => {
    if (el.dataset[lang] !== undefined) el.textContent = el.dataset[lang];
  });

  htmlNodes.forEach((el) => {
    const key = lang + "Html";
    if (el.dataset[key] !== undefined) el.innerHTML = el.dataset[key];
  });

  document.title = htmlEl.dataset["title" + capitalize(lang)];
  previousTitle = document.title;

  startTypewriter(thanksEl.dataset[lang]);

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  try {
    localStorage.setItem("siteLang", lang);
  } catch (e) {
    /* localStorage no disponible: el idioma simplemente no persiste */
  }
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!btn.classList.contains("active")) applyLanguage(btn.dataset.lang);
  });
});

let savedLang = "es";
try {
  savedLang = localStorage.getItem("siteLang") || "es";
} catch (e) {
  savedLang = "es";
}
applyLanguage(savedLang);
