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
  fetch("modal.html")
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
});
