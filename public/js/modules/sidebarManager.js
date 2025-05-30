// public/js/modules/sidebarManager.js
import { pageIconsData } from "./uiConfig.js"; // Importaremos de um novo arquivo de configuração de UI

export function initSidebar() {
  const sidebar = document.getElementById("app-sidebar"); // Assumindo que é carregado em #sidebar-container
  const menuButton = document.getElementById("mobile-menu-button"); // Assumindo que é carregado em #header-container
  const overlay = document.getElementById("sidebar-overlay"); // Este está diretamente em home.html

  if (menuButton && overlay) {
    // Sidebar será verificada dentro do listener
    menuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const currentSidebar = document.getElementById("app-sidebar"); // Re-seleciona caso o DOM mude
      currentSidebar?.classList.toggle("open");
      overlay.classList.toggle("open");
    });
  }
  if (overlay) {
    // Sidebar será verificada dentro do listener
    overlay.addEventListener("click", () => {
      const currentSidebar = document.getElementById("app-sidebar");
      currentSidebar?.classList.remove("open");
      overlay.classList.remove("open");
    });
  }

  // Navegação Principal (SPA Fake)
  const pageContents = document.querySelectorAll(
    "#main-content-area .page-content"
  );
  const pageTitlePlaceholder = document.getElementById(
    "page-title-placeholder"
  );
  const headerIconPlaceholder = document.getElementById(
    "header-icon-placeholder"
  );

  // Listener delegado para links da sidebar (melhor se os links são carregados dinamicamente)
  const sidebarContainer = document.getElementById("sidebar-container");
  if (sidebarContainer) {
    sidebarContainer.addEventListener("click", function (event) {
      const link = event.target.closest(".nav-link");
      if (link) {
        event.preventDefault();
        const pageId = link.dataset.page;
        const pageTitle = link.title || link.textContent.trim();
        const iconName = pageIconsData[pageId] || "file"; // Usa pageIconsData
        updateActivePage(pageId, pageTitle, iconName);
      }
    });
  }

  function updateActivePage(targetPageId, targetTitle, targetIconName) {
    const currentNavLinks = document.querySelectorAll(
      "#sidebar-container .nav-link"
    ); // Re-query
    currentNavLinks.forEach((l) => {
      const isActive = l.getAttribute("data-page") === targetPageId;
      l.classList.toggle("bg-sky-600", isActive);
      l.classList.toggle("text-white", isActive);
      l.classList.toggle("font-medium", isActive);
      l.classList.toggle("shadow-md", isActive);
      l.classList.toggle("scale-105", isActive);
      l.classList.toggle("hover:bg-slate-600", !isActive);
      l.classList.toggle("hover:text-white", !isActive);
      l.classList.toggle("hover:scale-105", !isActive);
    });

    pageContents.forEach((c) =>
      c.classList.toggle("hidden", c.id !== `content-${targetPageId}`)
    );

    if (pageTitlePlaceholder) pageTitlePlaceholder.textContent = targetTitle;
    if (headerIconPlaceholder && targetIconName) {
      headerIconPlaceholder.innerHTML = `<i data-lucide="${targetIconName}" class="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-3 text-sky-600"></i>`;
      if (typeof lucide !== "undefined")
        lucide.createIcons({
          nodes: [headerIconPlaceholder.querySelector("i")],
        });
    }

    const currentSidebar = document.getElementById("app-sidebar");
    const currentMenuButton = document.getElementById("mobile-menu-button");
    const currentOverlay = document.getElementById("sidebar-overlay");
    if (
      currentSidebar &&
      currentMenuButton &&
      currentOverlay &&
      currentSidebar.classList.contains("open") &&
      window.getComputedStyle(currentMenuButton).display !== "none"
    ) {
      currentSidebar.classList.remove("open");
      currentOverlay.classList.remove("open");
    }
  }

  // Ativar a primeira aba por padrão
  const firstL = document.querySelector("#sidebar-container .nav-link");
  if (firstL) {
    updateActivePage(
      firstL.dataset.page,
      firstL.title || firstL.textContent.trim(),
      pageIconsData[firstL.dataset.page] || "layout-dashboard" // Usa pageIconsData
    );
  }

  // Logout link (se estiver na sidebar)
  const logoutLink = document.querySelector("#sidebar-container #logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      // A ação de logout real (redirecionamento) está no href.
      // O JS pode adicionar um toast ou confirmação antes.
      // Por enquanto, deixamos o comportamento padrão do link.
      // e.preventDefault(); // Descomente se quiser adicionar lógica JS antes do redirect
      // showGlobalToast("Saindo do sistema...", "info");
      // setTimeout(() => window.location.href = this.href, 1500);
    });
  }
}
