// ===============================================
// SCRIPT PRINCIPAL - GESTION DYNAMIQUE DU SITE
// ===============================================

// Petit helper pour sélectionner les éléments plus vite (comme jQuery mais en Vanilla)
const $ = (sel) => document.querySelector(sel);

document.addEventListener("DOMContentLoaded", () => {
  // ===========================
  // 1. CHARGEMENT DU MENU
  // On injecte le menu.html pour ne pas le répéter sur chaque page
  // ===========================
  const container = document.getElementById("menu-container");

  if (container) {
    fetch("menu.html")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur réseau : " + response.status);
        }
        return response.text();
      })
      .then(data => {
        container.innerHTML = data;

        // Activer le bouton hamburger après injection du menu
        const hamburger = document.getElementById("hamburger");
        const menu = document.getElementById("menu");

        if (hamburger && menu) {
          hamburger.addEventListener("click", () => {
            menu.classList.toggle("open");
            hamburger.classList.toggle("active");

            // Accessibilité : indiquer l’état du menu
            const expanded = hamburger.classList.contains("active");
            hamburger.setAttribute("aria-expanded", expanded);
          });
        }

        // ✅ Activer le lien correspondant à la page courante
        const currentPath = window.location.pathname.split("/").pop(); // ex: "coaching.html"
        const links = document.querySelectorAll("#menu a");

        links.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
          }
        });
      })
      .catch(error => {
        console.error("Impossible de charger le menu :", error);
      });
  }

  // === Charger le footer (Legacy support or if needed) ===
  const footerContainer = document.getElementById("footer-placeholder");
  if (footerContainer) {
    fetch("footerBottom.html")
      .then(response => {
        if (!response.ok) throw new Error("Erreur réseau : " + response.status);
        return response.text();
      })
      .then(data => {
        footerContainer.innerHTML = data;
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      })
      .catch(error => console.error("Erreur lors du chargement du footer:", error));
  }

  // ===========================
  // 2. CHARGEMENT DE LA MODALE "SHEER TECH"
  // Chargement asynchrone pour ne pas bloquer le reste de la page
  // ===========================
  fetch("modal.html?v=" + new Date().getTime())
    .then(response => {
      if (!response.ok) throw new Error("Erreur réseau : " + response.status);
      return response.text();
    })
    .then(modalData => {
      // On l'injecte tout à la fin du body pour être sûr qu'elle passe au-dessus de tout
      document.body.insertAdjacentHTML("beforeend", modalData);

      // Initialiser la modale
      // Note: We use event delegation or wait for injection
      const sheerLink = document.getElementById("sheerLink");
      const sheerModal = document.getElementById("sheerModal");
      const sheerClose = document.getElementById("sheerClose");
      const sheerBackdrop = document.getElementById("sheerBackdrop");

      function openSheerModal() {
        if (sheerModal) {
          sheerModal.classList.add("open");
          sheerModal.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden";
        }
      }
      function closeSheerModal() {
        if (sheerModal) {
          sheerModal.classList.remove("open");
          sheerModal.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
        }
      }

      // Attach global listener for sheerLink in case it's in static HTML
      document.addEventListener("click", (e) => {
        if (e.target.closest("#sheerLink")) {
          e.preventDefault();
          openSheerModal();
        }
      });

      if (sheerClose) sheerClose.addEventListener("click", closeSheerModal);
      if (sheerBackdrop) sheerBackdrop.addEventListener("click", closeSheerModal);
      document.addEventListener("keydown", e => { if (e.key === "Escape") closeSheerModal(); });
    })
    .catch(error => {
      console.error("Erreur lors du chargement de la modale:", error);
    });

  // =========================================
  // TESTIMONIALS SYSTEM (Professional Version)
  // =========================================
  const testimonialForm = document.getElementById('testimonialForm');
  const testimonialsGrid = document.getElementById('testimonialsGrid');

  if (testimonialForm && testimonialsGrid) {
    // Load existing local testimonials
    const savedTestimonials = JSON.parse(localStorage.getItem('localTestimonials') || '[]');
    savedTestimonials.forEach(data => appendTestimonial(data, false));

    testimonialForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(testimonialForm);
      const starRating = formData.get('rating');
      const photoFile = formData.get('photo');
      let photoBase64 = null;

      if (photoFile && photoFile.size > 0) {
        photoBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(photoFile);
        });
      }

      const newTestimonial = {
        name: formData.get('name'),
        profession: formData.get('profession'),
        rating: parseInt(starRating),
        testimony: formData.get('testimony'),
        photo: photoBase64,
        date: new Date().toLocaleDateString('fr-FR')
      };

      // Save to localStorage
      const lsTestimonials = JSON.parse(localStorage.getItem('localTestimonials') || '[]');
      lsTestimonials.push(newTestimonial);
      localStorage.setItem('localTestimonials', JSON.stringify(lsTestimonials));

      // Append to UI
      appendTestimonial(newTestimonial, true);

      // Reset form
      testimonialForm.reset();

      // Success state
      const submitBtn = testimonialForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ Témoignage diffusé !';
      submitBtn.style.background = '#0a192f'; // Brand Navy success

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 4000);
    });
  }

  function appendTestimonial(data, animate) {
    const card = document.createElement('article');
    card.className = 'card testimonial-card';
    if (animate) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
    }

    const starsString = '★'.repeat(data.rating).padEnd(5, '☆');
    const defaultPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=0a192f&color=fff&bold=true`;
    const userPhoto = data.photo || defaultPhoto;

    card.innerHTML = `
      <div class="stars" style="color:var(--brand-gold); margin-bottom:12px; font-size: 1.1rem;" aria-label="${data.rating} étoiles">${starsString}</div>
      <p style="font-style: italic; line-height: 1.6; font-size: 0.95rem; margin-bottom: 20px; color: var(--text-secondary);">
        “${data.testimony}”
      </p>
      <div class="author" style="display: flex; align-items: center; gap: 12px;">
        <img src="${userPhoto}" alt="${data.name}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid var(--bg-surface);">
        <div>
          <strong style="display: block; color: var(--brand-navy); font-size: 0.95rem; line-height: 1.2;">${data.name}</strong>
          <span style="font-size: 0.8rem; color: var(--text-secondary); opacity: 0.8;">${data.profession}</span>
        </div>
      </div>
    `;

    testimonialsGrid.prepend(card);

    if (animate) {
      setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 20);
    }
  }

  // Final Pass: Custom File Input Handlers
  const fileInput = document.getElementById('userPhoto');
  const fileNameDisplay = document.getElementById('fileName');

  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener('change', (e) => {
      const name = e.target.files[0]?.name || 'Aucun fichier choisi';
      fileNameDisplay.textContent = name;
    });
  }
});
