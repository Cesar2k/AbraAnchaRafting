console.log("✔ Script cargado correctamente");

/* =========================================================
   LOADER + AOS
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
});

/* =========================================================
   AÑO AUTOMÁTICO
========================================================= */
function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* =========================================================
   HERO – CAMBIO AUTOMÁTICO DE FONDOS
========================================================= */
const hero = document.querySelector(".hero");
const fondos = ["img/fondo.jpg", "img/alto1.png", "img/bajo.png"];
let fondoIndex = 0;

function preloadHeroImages() {
  fondos.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  setInterval(() => {
    fondoIndex = (fondoIndex + 1) % fondos.length;
    if (hero) hero.style.backgroundImage = `url('${fondos[fondoIndex]}')`;
  }, 5000);
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

  navMenu.querySelectorAll("a").forEach(link => {
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
      e.preventDefault();
      const el = document.querySelector(destino);
      if (el) el.scrollIntoView({ behavior: "smooth" });
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

    if (oculto) socialMenu.removeAttribute("hidden");
    else socialMenu.setAttribute("hidden", "");

    toggleBtn.setAttribute("aria-expanded", String(oculto));
  });
}

/* Click en "Contacto" abre el menú y WhatsApp */
if (linkContacto) {
  linkContacto.addEventListener("click", e => {
    e.preventDefault();

    // Abre menú flotante si está oculto
    if (socialMenu.hasAttribute("hidden")) {
      socialMenu.removeAttribute("hidden");
    }

    // Scroll arriba para ver el botón flotante
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Enviar WhatsApp
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
   GOOGLE MAPS
========================================================= */
function initMap() {
  const abraAncha = { lat: -39.2398, lng: -70.9096 };
  const mapElement = document.getElementById("map");

  if (!mapElement) return;

  const map = new google.maps.Map(mapElement, {
    zoom: 13,
    center: abraAncha,
    disableDefaultUI: false,
    mapTypeControl: false,
    streetViewControl: false,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#e0f7fa" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#00796b" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
      { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#4fc3f7" }] },
      { featureType: "road", elementType: "geometry", stylers: [{ color: "#b2dfdb" }] }
    ]
  });

  new google.maps.Marker({
    position: abraAncha,
    map,
    title: "Abra Ancha Rafting",
    icon: { url: "img/abraanchapng.png", scaledSize: new google.maps.Size(48, 48) }
  });
}

window.initMap = initMap;


/* ===== LIGHTBOX PRO: swipe + flechas + teclado ===== */

const galleryItems = document.querySelectorAll(".cards-gallery img, .gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const btnPrev = document.getElementById("lightbox-prev");
const btnNext = document.getElementById("lightbox-next");

let currentIndex = 0;

// ABRIR LIGHTBOX
galleryItems.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    lightbox.classList.remove("hidden");
  });
});

// FUNCIÓN PARA MOSTRAR IMÁGENES
function showImage() {
  lightboxImg.src = galleryItems[currentIndex].src;
}

// BOTONES SIGUIENTE / ANTERIOR
btnNext.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  showImage();
});

btnPrev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showImage();
});

// CERRAR
lightboxClose.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.classList.add("hidden");
});

// TECLADO ← → ESC
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
  }
});

// SWIPE EN CELU
let startX = 0;

lightbox.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if (Math.abs(diff) > 50) {  
    if (diff > 0) {
      // Swipe izquierda → siguiente
      currentIndex = (currentIndex + 1) % galleryItems.length;
    } else {
      // Swipe derecha → anterior
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    }
    showImage();
  }
});
