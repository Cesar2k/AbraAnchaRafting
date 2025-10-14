console.log("Script cargado correctamente ✅");

// ---------- Inicialización ----------
window.addEventListener('load', () => {
  try {
    // Oculta el loader
    document.body.classList.add('loaded');

    // Inicializa animaciones y funciones
    AOS.init({ once: true, duration: 600, offset: 80 });
    setYear();
    preloadHeroImages();
  } catch (err) {
    console.error("Error en carga:", err);
  }
});

// ---------- Fallback para asegurar que el loader desaparezca ----------
setTimeout(() => {
  document.body.classList.add('loaded');
}, 2000);

// ---------- Año dinámico ----------
function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

// ---------- Fondo cambiante ----------
const hero = document.querySelector('.hero');
const fondos = ['img/fondo.jpg', 'img/alto.png', 'img/bajo.png'];
let fondoIndex = 0;

function preloadHeroImages() {
  fondos.forEach(src => { const im = new Image(); im.src = src; });
  setInterval(() => {
    fondoIndex = (fondoIndex + 1) % fondos.length;
    hero.style.backgroundImage = `url('${fondos[fondoIndex]}')`;
  }, 5000);
}

// ---------- Menú responsive ----------
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Scroll suave para anclas ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---------- Botonera flotante ----------
const toggleBtn = document.getElementById('toggle-btn');
const socialMenu = document.getElementById('social-list');
const linkContacto = document.getElementById('link-contacto');

if (toggleBtn && socialMenu) {
  toggleBtn.addEventListener('click', () => {
    const hidden = socialMenu.hasAttribute('hidden');
    if (hidden) socialMenu.removeAttribute('hidden');
    else socialMenu.setAttribute('hidden', '');
    toggleBtn.setAttribute('aria-expanded', String(hidden));
  });
}

if (linkContacto && socialMenu) {
  linkContacto.addEventListener('click', (e) => {
    e.preventDefault();
    const hidden = socialMenu.hasAttribute('hidden');
    if (hidden) socialMenu.removeAttribute('hidden');
    else socialMenu.setAttribute('hidden', '');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const msg = encodeURIComponent('Hola Abra Ancha Rafting! Quisiera consultar por disponibilidad y precios.');
    window.open(`https://wa.me/5492990000000?text=${msg}`, '_blank', 'noopener');
  });
}

// ---------- Botón subir ----------
const btnUp = document.getElementById('btnUp');
window.addEventListener('scroll', () => {
  if (!btnUp) return;
  const show = window.scrollY > 420;
  btnUp.classList.toggle('show', show);
  btnUp.classList.toggle('visually-hidden', !show);
});
btnUp?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Google Maps ----------
function initMap() {
  const abraAncha = { lat: -39.2398, lng: -70.9096 };
  const map = new google.maps.Map(document.getElementById('map'), {
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
      { featureType: "road", elementType: "geometry", stylers: [{ color: "#b2dfdb" }] },
    ]
  });

  new google.maps.Marker({
    position: abraAncha,
    map,
    title: "Abra Ancha Rafting",
    icon: { url: "img/logo.png", scaledSize: new google.maps.Size(48, 48) }
  });
}

// Hacerla global para callback de Maps
window.initMap = initMap;
