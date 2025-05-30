// public/js/main.js
import { showGlobalToast } from "./modules/utils.js";
import { initSidebar } from "./modules/sidebarManager.js";
import { initDashboardUI } from "./modules/dashboardUIManager.js";
import { initReportsPage } from "./modules/reportsManager.js";
import { initCollaboratorsPage } from "./modules/collaboratorsManager.js"; // <--- ALTERADO AQUI
import { initScriptsPage } from "./modules/scriptsManager.js";
import { initPasswordGeneratorModal } from "./modules/passwordGenerator.js";

window.showGlobalToast = showGlobalToast; // Tornar global se outros scripts não-módulo precisarem

async function loadHTML(url, targetElementId) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro ${url}: ${response.statusText}`);
    const text = await response.text();
    const target = document.getElementById(targetElementId);
    if (target) target.innerHTML = text;
    else
      console.error(
        `Elemento alvo "${targetElementId}" não encontrado para ${url}.`
      );
  } catch (error) {
    console.error("Falha ao carregar HTML:", error);
    const target = document.getElementById(targetElementId);
    if (target)
      target.innerHTML = `<p class="text-red-500 p-4">Erro ao carregar ${url}.</p>`;
  }
}

function initializeAppEventListeners() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
  requestAnimationFrame(() => {
    document.body.classList.add("body-visible");
  });

  initSidebar();
  initDashboardUI();
  initReportsPage();
  initCollaboratorsPage(); // Esta função agora cuida de todos os listeners do modal de colaborador
  // initPasswordGeneratorModal(); // Chamada ao abrir o modal

  // --- Controles Globais de Modais (apenas Password Generator agora) ---
  const openPassGenModalBtn = document.getElementById(
    "open-password-generator-modal-btn"
  );
  const closePassGenModalBtn = document.getElementById(
    "close-password-generator-modal-btn"
  );
  const modalPassGenBdrop = document.getElementById(
    "password-generator-modal-backdrop"
  );

  const openPassGenModal = () => {
    const modalContent = document.getElementById(
      "password-generator-modal-content"
    );
    if (modalPassGenBdrop && modalContent) {
      modalPassGenBdrop.classList.remove("hidden");
      setTimeout(() => {
        modalPassGenBdrop.classList.remove("opacity-0");
        modalContent.classList.remove("opacity-0", "scale-95");
        modalContent.classList.add("opacity-100", "scale-100");
      }, 10);
      if (typeof lucide !== "undefined" && modalContent) {
        lucide.createIcons({
          nodes: modalContent.querySelectorAll("i[data-lucide]"),
        });
      }
      initPasswordGeneratorModal();
    }
  };
  const closePassGenModal = () => {
    const modalContent = document.getElementById(
      "password-generator-modal-content"
    );
    if (modalPassGenBdrop && modalContent) {
      modalPassGenBdrop.classList.add("opacity-0");
      modalContent.classList.remove("opacity-100", "scale-100");
      modalContent.classList.add("opacity-0", "scale-95");
      setTimeout(() => modalPassGenBdrop.classList.add("hidden"), 300);
    }
  };
  if (openPassGenModalBtn)
    openPassGenModalBtn.addEventListener("click", openPassGenModal);
  if (closePassGenModalBtn)
    closePassGenModalBtn.addEventListener("click", closePassGenModal);
  if (modalPassGenBdrop)
    modalPassGenBdrop.addEventListener("click", (e) => {
      if (e.target === modalPassGenBdrop) closePassGenModal();
    });

  console.log("Todos os módulos e listeners inicializados.");
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Carregado. Carregando parciais HTML...");
  await Promise.all([
    loadHTML("templates/_sidebar.html", "sidebar-container"),
    loadHTML("templates/_header.html", "header-container"),
    loadHTML("templates/_footer_modals.html", "footer-modals-container"),
  ]);
  console.log("Parciais HTML carregados. Inicializando App Listeners...");
  initializeAppEventListeners();
});
