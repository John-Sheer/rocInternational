// Helpers
const $ = (sel) => document.querySelector(sel);

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

// Contact form
const contactForm = $('#contactForm');
const contactMsg = $('#contactMsg');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    console.log("Données du formulaire :", data);

    if (contactMsg) {
      contactMsg.textContent = "Envoi en cours...";
      contactMsg.style.color = "#a9b4c7";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData
      });

      if (response.ok || response.redirected) {
        if (contactMsg) {
          contactMsg.textContent = "Message envoyé avec succès ✅";
          contactMsg.style.color = "#3ccf91";
        }
        contactForm.reset();
      } else {
        if (contactMsg) {
          contactMsg.textContent = "Erreur lors de l'envoi ❌";
          contactMsg.style.color = "#ff9f43";
        }
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      if (contactMsg) {
        contactMsg.textContent = "Impossible d'envoyer le message ❌";
        contactMsg.style.color = "#ff9f43";
      }
    }
  });
}

// Modal Sheer Tech
const sheerLink = $('#sheerLink');
const sheerModal = $('#sheerModal');
const sheerClose = $('#sheerClose');
const sheerBackdrop = $('#sheerBackdrop');

function openSheerModal() {
  sheerModal.classList.add('open');   // <-- corrigé
  document.body.style.overflow = 'hidden';
}
function closeSheerModal() {
  sheerModal.classList.remove('open'); // <-- corrigé
  document.body.style.overflow = '';
}

if (sheerLink) sheerLink.addEventListener('click', (e) => { e.preventDefault(); openSheerModal(); });
if (sheerClose) sheerClose.addEventListener('click', closeSheerModal);
if (sheerBackdrop) sheerBackdrop.addEventListener('click', closeSheerModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheerModal(); });
