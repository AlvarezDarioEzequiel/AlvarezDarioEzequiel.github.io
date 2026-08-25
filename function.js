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
// title page (comportamiento original)
// =========================================================
let previousTitle = document.title;

window.addEventListener("blur", () => {
  previousTitle = document.title;
  document.title = "Regresa para saber más";
});

window.addEventListener("focus", () => {
  document.title = previousTitle;
});

// =========================================================
// footer message effect (comportamiento original)
// =========================================================
let text = document.getElementById("thanks");
let str = text.innerHTML;

text.innerHTML = "";

let speed = 200;
let i = 0;

function typeWriter() {
  if (i < str.length) {
    text.innerHTML += str.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

setTimeout(typeWriter, speed);

// =========================================================
// NAVBAR: efecto vidrio al hacer scroll
// =========================================================
const mainNav = document.getElementById("mainNav");

function toggleNavGlass() {
  if (window.scrollY > 80) {
    mainNav.classList.add("scrolled");
  } else {
    mainNav.classList.remove("scrolled");
  }
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
