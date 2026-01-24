// Helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Footer year
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
const hamburger = $('#hamburger');
const menu = $('#menu');
if (hamburger && menu) {
  hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
}
$$('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (menu) menu.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
  });
});

// Simple email validation
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Modal
const modal = $('#modal');
const modalBody = $('#modalBody');
const modalClose = $('#modalClose');
const modalBackdrop = $('#modalBackdrop');

function openModal(html) {
  if (!modal || !modalBody) return;
  modalBody.innerHTML = html;
  modal.classList.add('active');
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('active');
}
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

// Contact form
const contactForm = $('#contactForm');
const contactMsg = $('#contactMsg');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm).entries());

    // Use the provided email for testing
    if (!data.name || !isEmail(data.email) || !data.message || !data.service) {
      if (contactMsg) {
        contactMsg.textContent = 'Veuillez renseigner votre nom, un email valide, le service et votre message.';
        contactMsg.style.color = '#ff9f43';
      }
      return;
    }

    if (contactMsg) {
      contactMsg.textContent = 'Envoi en cours...';
      contactMsg.style.color = '#a9b4c7';
    }

    setTimeout(() => {
      openModal(`
        <h3>Message envoyé ✉️</h3>
        <p>Merci <strong>${data.name}</strong> !</p>
        <p>Service: <strong>${data.service}</strong>${data.budget ? ` — Budget: <strong>${data.budget}</strong>` : ''}</p>
        <p>Nous vous répondrons sous 24h à <strong>meskojohn@gmail.com</strong>.</p>
      `);
      if (contactMsg) {
        contactMsg.textContent = 'Message envoyé.';
        contactMsg.style.color = '#3ccf91';
      }
      contactForm.reset();
    }, 700);
  });
}

// Filtrage vidéos
const filterBtns = document.querySelectorAll('.filter-btn');
const videoCards = document.querySelectorAll('.video-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    videoCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Animation au scroll (apparition progressive)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.coach-info, .coach-photo img').forEach(el => {
  observer.observe(el);
});

// Apparition au scroll
const observerAnimate = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in, .slide-up, .zoom-in').forEach(el => {
  observerAnimate.observe(el);
});

// Apparition au scroll - reuse existing observer
document.querySelectorAll('.card, .coach-photo img, .hero h1, .hero p').forEach(el => {
    observer.observe(el);
});

// Gestion du modal Sheer Tech
const sheerLink = document.getElementById('sheerLink');
const sheerModal = document.getElementById('sheerModal');
const sheerClose = document.getElementById('sheerClose');
const sheerBackdrop = document.getElementById('sheerBackdrop');

if (sheerLink) {
  sheerLink.addEventListener('click', (e) => {
    e.preventDefault();
    sheerModal.classList.add('active');
  });
}

if (sheerClose) {
  sheerClose.addEventListener('click', () => {
    sheerModal.classList.remove('active');
  });
}

if (sheerBackdrop) {
  sheerBackdrop.addEventListener('click', () => {
    sheerModal.classList.remove('active');
  });
}

// Mettre l'année courante
document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Modal Sheer Tech
  const sheerLink = document.getElementById('sheerLink');
  const sheerModal = document.getElementById('sheerModal');
  const sheerClose = document.getElementById('sheerClose');
  const sheerBackdrop = document.getElementById('sheerBackdrop');

  function openModal() {
    if (!sheerModal) return;
    sheerModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!sheerModal) return;
    sheerModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (sheerLink) sheerLink.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  if (sheerClose) sheerClose.addEventListener('click', closeModal);
  if (sheerBackdrop) sheerBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
});
// === Gestion de l'état "active" du menu (URL + clic) ===
document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.menu a');

  // 1) Activation selon l'URL courante (multi-pages)
  const currentPath = window.location.pathname.replace(/\/+$/, ''); // supprime slash final
  menuLinks.forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/+$/, '');
    // Cas index/root : considérer "/" et "/index.html" équivalents
    const normalizedCurrent = currentPath === '' ? '/index.html' : currentPath;
    const normalizedLink = linkPath === '' ? '/index.html' : linkPath;

    if (normalizedCurrent === normalizedLink || normalizedCurrent.endsWith(normalizedLink) || normalizedLink.endsWith(normalizedCurrent)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // 2) Mise à jour immédiate au clic (utile pour SPA ou ancres)
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Si tu veux empêcher la navigation (ex: ancres internes gérées en JS), décommente la ligne suivante
      // e.preventDefault();

      menuLinks.forEach(l => {
        l.classList.remove('active');
        l.removeAttribute('aria-current');
      });
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');

      // Fermer le menu mobile si ouvert (réutilise tes variables hamburger/menu)
      if (menu && menu.classList.contains('open')) menu.classList.remove('open');
      if (hamburger && hamburger.classList.contains('active')) hamburger.classList.remove('active');
    });
  });
});

// Année automatique
document.getElementById("year").textContent = new Date().getFullYear();

// Animation footer bottom
const footerBottom = document.querySelector(".footer-bottom");

const observerFooter = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      footerBottom.classList.add("visible");
    }
  });
});

observerFooter.observe(footerBottom);
