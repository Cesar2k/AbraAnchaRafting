console.log("Script cargado correctamente");

/* =========================================================
   ON LOAD: LOADER + AOS + AÑO + HERO PRELOAD
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
   AÑO AUTOMÁTICO FOOTER
========================================================= */
function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* =========================================================
   HERO – CAMBIO AUTOMÁTICO DE FONDOS
========================================================= */
const hero = document.querySelector(".hero");

/* Rutas locales (optimiza estos archivos también en .webp) */
const fondos = ["img/fondo.webp", "img/alto1.webp", "img/bajo.webp"];
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
   SCROLL SUAVE EN LINKS INTERNOS
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
   BOTONERA FLOTANTE – REDES SOCIALES
========================================================= */
const toggleBtn = document.getElementById("toggle-btn");
const socialMenu = document.getElementById("social-list");
const linkContacto = document.getElementById("link-contacto");

if (toggleBtn && socialMenu) {
  toggleBtn.addEventListener("click", () => {
    const oculto = socialMenu.hasAttribute("hidden");

    if (oculto) {
      socialMenu.removeAttribute("hidden");
    } else {
      socialMenu.setAttribute("hidden", "");
    }

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

    const msg = encodeURIComponent(
      "Hola Abra Ancha Rafting! Quisiera consultar por disponibilidad y precios."
    );
    window.open(`https://wa.me/5492995123456?text=${msg}`, "_blank", "noopener");
  });
}

/* =========================================================
   BOTÓN "SUBIR ARRIBA"
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
   LIGHTBOX – GALERÍA + OPINIONES
========================================================= */
const galleryItems = document.querySelectorAll(
  ".cards-gallery img, .op-img"
);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const btnPrev = document.getElementById("lightbox-prev");
const btnNext = document.getElementById("lightbox-next");

let currentIndex = 0;

if (galleryItems.length && lightbox && lightboxImg) {

  // Abrir lightbox
  galleryItems.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      showImage();
      lightbox.classList.remove("hidden");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  // Mostrar imagen actual
  function showImage() {
    const item = galleryItems[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt || "Imagen ampliada de Abra Ancha Rafting";
  }

  // Siguiente / anterior
  btnNext?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showImage();
  });

  btnPrev?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showImage();
  });

  // Cerrar
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

  // Teclado
  document.addEventListener("keydown", e => {
    if (lightbox.classList.contains("hidden")) return;

    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      showImage();
    }
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      showImage();
    }
    if (e.key === "Escape") {
      lightbox.classList.add("hidden");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });

  // Swipe en celular
  let startX = 0;

  lightbox.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentIndex = (currentIndex + 1) % galleryItems.length;
      } else {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      }
      showImage();
    }
  });
}
