// public/js/modules/reportsManager.js
import { showGlobalToast } from "./utils.js";

export function initReportsPage() {
  console.log("Reports Manager Initialized");
  const reportFiltersForm = document.getElementById("report-filters-form");
  const generateReportButton = document.getElementById(
    "generate-report-button"
  );
  const reportTableBody = document.querySelector("#report-table tbody");
  const reportSummaryDiv = document.getElementById("report-summary");
  const filtroColaboradorSelectReports =
    document.getElementById("filtro-colaborador");

  if (
    reportFiltersForm &&
    generateReportButton &&
    reportTableBody &&
    reportSummaryDiv
  ) {
    const hoje = new Date();
    const primeiroDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];
    const dataInicioInputReports =
      document.getElementById("filtro-data-inicio");
    const dataFimInputReports = document.getElementById("filtro-data-fim");
    if (dataInicioInputReports) dataInicioInputReports.value = primeiroDiaDoMes;
    if (dataFimInputReports) dataFimInputReports.value = ultimoDiaDoMes;

    reportFiltersForm.addEventListener("submit", function (event) {
      event.preventDefault();
      reportTableBody.innerHTML = `<tr><td colspan="5" class="px-5 py-4 text-center text-slate-500 text-sm"><i data-lucide="loader-circle" class="animate-spin w-5 h-5 inline mr-2"></i>Gerando...</td></tr>`;
      if (typeof lucide !== "undefined") lucide.createIcons();

      const dataInicio = dataInicioInputReports.value;
      const dataFim = dataFimInputReports.value;
      const colaborador = filtroColaboradorSelectReports.value;

      setTimeout(() => {
        // Simulação
        const dadosExemplo = [
          {
            data: "04/05/2024",
            colaborador: "Carlos Pereira",
            inicio: "08:00",
            fim: "12:30",
            duracao: "04h30min",
          },
          {
            data: "11/05/2024",
            colaborador: "Beatriz Costa",
            inicio: "13:00",
            fim: "17:00",
            duracao: "04h00min",
          },
        ];
        let dadosFiltrados = colaborador
          ? dadosExemplo.filter((d) => d.colaborador === colaborador)
          : dadosExemplo;
        reportTableBody.innerHTML = "";
        if (dadosFiltrados.length > 0) {
          dadosFiltrados.forEach((d) => {
            const row = reportTableBody.insertRow();
            Object.values(d).forEach((text) => {
              const cell = row.insertCell();
              cell.textContent = text;
              cell.className =
                "px-5 py-3 whitespace-nowrap text-sm text-slate-700";
            });
          });
          // Linha corrigida:
          reportSummaryDiv.innerHTML = `<p><strong>Total de Turnos:</strong> ${
            dadosFiltrados.length
          } | <strong>Período:</strong> ${new Date(
            dataInicio
          ).toLocaleDateString("pt-BR", {
            timeZone: "America/Sao_Paulo",
          })} a ${new Date(dataFim).toLocaleDateString("pt-BR", {
            timeZone: "America/Sao_Paulo",
          })}${
            colaborador ? ` | <strong>Colaborador:</strong> ${colaborador}` : ""
          }</p>`;
        } else {
          reportTableBody.innerHTML = `<tr><td colspan="5" class="px-5 py-4 text-center text-slate-500 text-sm">Nenhum dado encontrado.</td></tr>`;
          reportSummaryDiv.innerHTML = `<p>Nenhum dado encontrado para o período e colaborador selecionados.</p>`;
        }
        if (typeof lucide !== "undefined") lucide.createIcons();
      }, 1000);
    });
  }
  document
    .getElementById("export-csv-button")
    ?.addEventListener("click", () =>
      showGlobalToast("Exportar CSV (simulado).", "info")
    );
  document
    .getElementById("export-pdf-button")
    ?.addEventListener("click", () =>
      showGlobalToast("Exportar PDF (simulado).", "info")
    );
}
