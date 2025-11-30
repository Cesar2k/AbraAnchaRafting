console.log("Script cargado correctamente");

/* =========================================================
   FALLBACK LOADER
========================================================= */
setTimeout(() => {
  document.body.classList.add("loaded");
}, 3000);

/* =========================================================
   ON LOAD
========================================================= */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 700,
      offset: 120
    });
  }

  setYear();
  preloadHeroImages();
  startHeroSlider();
});

/* =========================================================
   AÑO FOOTER
========================================================= */
function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* =========================================================
   HERO SLIDER
========================================================= */
const hero = document.querySelector(".hero");

const fondos = [
  "https://res.cloudinary.com/dph6jbszd/image/upload/v1764529515/fondo_ljql2d.webp",
  "https://res.cloudinary.com/dph6jbszd/image/upload/v1764529518/alto1_ilujjn.webp",
  "https://res.cloudinary.com/dph6jbszd/image/upload/v1764529522/bajo_oa6od1.webp"
];

let fondoIndex = 0;

function preloadHeroImages() {
  fondos.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

function startHeroSlider() {
  if (!hero) return;
  setInterval(() => {
    fondoIndex = (fondoIndex + 1) % fondos.length;
    hero.style.backgroundImage = `url('${fondos[fondoIndex]}')`;
  }, 7000);
}

/* =========================================================
   MENÚ RESPONSIVE
========================================================= */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const abierto = navMenu.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", String(abierto));
  });

  navMenu.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================================================
   SCROLL SUAVE
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const destino = anchor.getAttribute("href");

    if (destino && destino.length > 1) {
      const el = document.querySelector(destino);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

/* =========================================================
   BOTONERA FLOTANTE
========================================================= */
const toggleBtn = document.getElementById("toggle-btn");
const socialMenu = document.getElementById("social-list");
const linkContacto = document.getElementById("link-contacto");

if (toggleBtn && socialMenu) {
  toggleBtn.addEventListener("click", () => {
    const oculto = socialMenu.hasAttribute("hidden");
    if (oculto) socialMenu.removeAttribute("hidden");
    else socialMenu.setAttribute("hidden", "");
    toggleBtn.setAttribute("aria-expanded", String(oculto));
  });
}

if (linkContacto && socialMenu) {
  linkContacto.addEventListener("click", e => {
    e.preventDefault();
    if (socialMenu.hasAttribute("hidden")) {
      socialMenu.removeAttribute("hidden");
      toggleBtn?.setAttribute("aria-expanded", "true");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    const msg = encodeURIComponent("Hola Abra Ancha Rafting! Quisiera consultar por disponibilidad y precios.");
    window.open(`https://wa.me/5492995123456?text=${msg}`, "_blank", "noopener");
  });
}

/* =========================================================
   BOTÓN SUBIR
========================================================= */
const btnUp = document.getElementById("btnUp");

window.addEventListener("scroll", () => {
  if (!btnUp) return;
  const visible = window.scrollY > 400;
  btnUp.classList.toggle("show", visible);
});

btnUp?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================================================
   LIGHTBOX – SOLO SI EXISTE GALERÍA
========================================================= */

const galleryItems = document.querySelectorAll(".cards-gallery img, .op-img");

if (galleryItems.length > 0) {

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const btnPrev = document.getElementById("lightbox-prev");
  const btnNext = document.getElementById("lightbox-next");

  let currentIndex = 0;

  galleryItems.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      showImage();
      lightbox.classList.remove("hidden");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  function showImage() {
    const item = galleryItems[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt || "Imagen ampliada de Abra Ancha Rafting";
  }

  btnNext?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showImage();
  });

  btnPrev?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showImage();
  });

  lightboxClose?.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });

}
