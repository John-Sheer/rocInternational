# 🌐 ROC International Website

Un site web moderne et modulaire pour **ROC International**, propulsé par **Sheer Tech™**.  
Ce projet met en avant une architecture maintenable, un design responsive et des composants réutilisables.

---

## 🚀 Fonctionnalités principales

- **Menu dynamique**  
  - Chargé depuis `menu.html` via `js/script.js`  
  - Gestion du bouton hamburger pour mobile  
  - Mise en surbrillance automatique du lien actif selon la page courante  

- **Footer modulaire**  
  - Chargé depuis `footerBottom.html`  
  - Affichage automatique de l’année courante  
  - Liens vers réseaux sociaux (LinkedIn, Facebook, WhatsApp, Instagram)  
  - Lien "Propulsé par Sheer Tech™" ouvrant la modale  

- **Modale Sheer Tech™**  
  - Chargée depuis `modal.html`  
  - Contient logo, description, services, et informations de contact  
  - Liens Email et GitHub avec icônes SVG  
  - Boutons rapides : Appeler, WhatsApp  
  - Fermeture via bouton ✖, backdrop ou touche `Escape`  
  - Scroll interne si le contenu est trop long  

- **Formulaire de contact**  
  - Validation et envoi via `fetch`  
  - Message de statut (succès, erreur, en cours)  
  - Reset automatique après envoi réussi  

---

## 🛠️ Technologies utilisées

- **HTML5** : Structure des pages (`index.html`, `menu.html`, `coach.html`, `traduction.htmlv`, `contact.html`, `footerBottom.html`, `modal.html`)  
- **CSS3** : Styles globaux (`css/style.css`), responsive design, animations  
- **JavaScript (ES6)** :  
  - `js/script.js` pour charger les composants, gérer le menu, le footer, la modale et le formulaire  
  - Utilisation de `fetch` pour injection dynamique  
  - Accessibilité (`aria-expanded`, `aria-hidden`)  
- **Assets** : Images et logos dans `assets/img/`

---

## 📂 Structure du projet

├── index.html
├── menu.html
├── coach.html
├── traduction.html
├── contact.html
├── footerBottom.html
├── modal.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
  └── img/
    ├── (les images...)


###  Cloner le projet
Commencez par récupérer le code source depuis GitHub avec la commande suivante :
```bash
git clone https://github.com/JohnS-heer/roc-international.git



