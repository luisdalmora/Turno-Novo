// public/js/modules/dashboardUIManager.js
export function initDashboardUI() {
  console.log("Dashboard UI Manager Initialized");
  // Lógica das abas internas do Dashboard
  const dashboardTabButtons = document.querySelectorAll(
    "#content-home .tab-button"
  );
  const dashboardTabPanes = document.querySelectorAll(
    "#content-home .tab-pane"
  );

  dashboardTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetPaneId = button.dataset.tabTarget;
      dashboardTabButtons.forEach((btn) => {
        btn.classList.remove("active-tab", "text-sky-600", "border-sky-500");
        btn.classList.add(
          "text-slate-500",
          "hover:text-slate-700",
          "hover:border-slate-300",
          "border-transparent"
        );
      });
      button.classList.add("active-tab", "text-sky-600", "border-sky-500");
      button.classList.remove(
        "text-slate-500",
        "hover:text-slate-700",
        "hover:border-slate-300",
        "border-transparent"
      );
      dashboardTabPanes.forEach((pane) =>
        pane.classList.toggle("hidden", pane.id !== targetPaneId.substring(1))
      );
      if (typeof lucide !== "undefined") lucide.createIcons();
    });
  });
  if (dashboardTabButtons.length > 0) {
    // Ativa primeira aba
    dashboardTabButtons[0].click();
  }

  // Botões de navegação de mês do Dashboard (se tiverem lógica própria, senão são globais)
  // document.getElementById('prev-month-button-dashboard')?.addEventListener('click', () => { /* ... */ });
  // document.getElementById('next-month-button-dashboard')?.addEventListener('click', () => { /* ... */ });
}
