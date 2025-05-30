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
    // Define o fuso horário para São Paulo para garantir consistência
    const fusoHorario = "America/Sao_Paulo";

    // Primeiro dia do mês
    let primeiroDiaDoMesObj = new Date(
      Date.UTC(hoje.getFullYear(), hoje.getMonth(), 1)
    );
    const primeiroDiaDoMes = primeiroDiaDoMesObj
      .toLocaleDateString("sv-SE", { timeZone: fusoHorario })
      .split(" ")[0];

    // Último dia do mês
    let ultimoDiaDoMesObj = new Date(
      Date.UTC(hoje.getFullYear(), hoje.getMonth() + 1, 0)
    );
    const ultimoDiaDoMes = ultimoDiaDoMesObj
      .toLocaleDateString("sv-SE", { timeZone: fusoHorario })
      .split(" ")[0];

    const dataInicioInputReports =
      document.getElementById("filtro-data-inicio");
    const dataFimInputReports = document.getElementById("filtro-data-fim");

    if (dataInicioInputReports) dataInicioInputReports.value = primeiroDiaDoMes;
    if (dataFimInputReports) dataFimInputReports.value = ultimoDiaDoMes;

    // Simular carregamento de colaboradores no select
    if (filtroColaboradorSelectReports) {
      // Limpa opções existentes, exceto a primeira "Todos"
      while (filtroColaboradorSelectReports.options.length > 1) {
        filtroColaboradorSelectReports.remove(1);
      }
      // Adiciona colaboradores de exemplo (isso virá do backend no futuro)
      const colaboradoresExemplo = [
        "Carlos Pereira",
        "Beatriz Costa",
        "Ana Clara Dias",
        "Bruno Gomes Silva",
      ];
      colaboradoresExemplo.forEach((nome) => {
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        filtroColaboradorSelectReports.appendChild(option);
      });
    }

    reportFiltersForm.addEventListener("submit", function (event) {
      event.preventDefault();
      reportTableBody.innerHTML = `<tr><td colspan="5" class="px-5 py-4 text-center text-slate-500 text-sm"><i data-lucide="loader-circle" class="animate-spin w-5 h-5 inline mr-2"></i>Gerando...</td></tr>`;
      if (typeof lucide !== "undefined") lucide.createIcons();

      const dataInicioValue = dataInicioInputReports.value; // Ex: "2024-05-01"
      const dataFimValue = dataFimInputReports.value; // Ex: "2024-05-31"
      const colaborador = filtroColaboradorSelectReports.value;

      // Formata as datas para exibição em dd/mm/yyyy
      const dataInicioParaExibicao = new Date(
        dataInicioValue + "T00:00:00"
      ).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
      const dataFimParaExibicao = new Date(
        dataFimValue + "T00:00:00"
      ).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });

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
          {
            data: "18/05/2024",
            colaborador: "Carlos Pereira",
            inicio: "08:15",
            fim: "11:45",
            duracao: "03h30min",
          },
          {
            data: "25/05/2024",
            colaborador: "Ana Clara Dias",
            inicio: "09:00",
            fim: "13:00",
            duracao: "04h00min",
          },
        ];
        let dadosFiltrados = colaborador
          ? dadosExemplo.filter((d) => d.colaborador === colaborador)
          : dadosExemplo;

        // Simular filtro por data (bem básico, apenas para exemplo)
        // Uma implementação real faria isso no backend ou com mais cuidado nas datas
        if (dataInicioValue && dataFimValue) {
          const inicioFiltro = new Date(dataInicioValue + "T00:00:00");
          const fimFiltro = new Date(dataFimValue + "T23:59:59");
          dadosFiltrados = dadosFiltrados.filter((d) => {
            const [dia, mes, ano] = d.data.split("/");
            const dataTurno = new Date(`${ano}-${mes}-${dia}T00:00:00`);
            return dataTurno >= inicioFiltro && dataTurno <= fimFiltro;
          });
        }

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
          reportSummaryDiv.innerHTML = `<p><strong>Total de Turnos:</strong> ${
            dadosFiltrados.length
          } | <strong>Período:</strong> ${dataInicioParaExibicao} a ${dataFimParaExibicao}${
            colaborador ? ` | <strong>Colaborador:</strong> ${colaborador}` : ""
          }</p>`;
        } else {
          reportTableBody.innerHTML = `<tr><td colspan="5" class="px-5 py-4 text-center text-slate-500 text-sm">Nenhum dado encontrado para os filtros selecionados.</td></tr>`;
          reportSummaryDiv.innerHTML = `<p>Nenhum dado encontrado para o período de ${dataInicioParaExibicao} a ${dataFimParaExibicao}${
            colaborador ? ` e colaborador ${colaborador}` : ""
          }.</p>`;
        }
        if (typeof lucide !== "undefined") lucide.createIcons();
      }, 1000);
    });
  }

  const exportCsvButton = document.getElementById("export-csv-button");
  if (exportCsvButton) {
    exportCsvButton.addEventListener("click", () => {
      const table = document.getElementById("report-table");
      if (!table) {
        showGlobalToast(
          "Tabela de relatório não encontrada para exportação.",
          "error"
        );
        return;
      }

      const rows = table.querySelectorAll("tbody tr");
      if (
        rows.length === 0 ||
        (rows.length === 1 &&
          rows[0].cells.length === 1 &&
          rows[0].cells[0].colSpan > 1)
      ) {
        showGlobalToast("Não há dados na tabela para exportar.", "info");
        return;
      }

      let csvContent = "";

      const headers = Array.from(table.querySelectorAll("thead th")).map((th) =>
        th.textContent.trim()
      );
      csvContent += headers.join(";") + "\r\n";

      rows.forEach((row) => {
        // Verifica se é uma linha de dados ou a linha de "nenhum dado encontrado"
        if (row.cells.length === headers.length) {
          // Só processa linhas com o número correto de células
          const rowData = Array.from(row.querySelectorAll("td")).map(
            (td) => `"${td.textContent.trim().replace(/"/g, '""')}"`
          );
          csvContent += rowData.join(";") + "\r\n";
        }
      });

      if (
        csvContent.split("\r\n").length <= 1 &&
        rows.length > 0 &&
        rows[0].cells[0].colSpan > 1
      ) {
        // Apenas cabeçalho e linha de "nenhum dado"
        showGlobalToast(
          "Não há dados válidos na tabela para exportar.",
          "info"
        );
        return;
      }

      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      }); // Adiciona BOM para Excel entender UTF-8
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        const timestamp = new Date()
          .toISOString()
          .slice(0, 19)
          .replace(/:/g, "-")
          .replace("T", "_");
        link.setAttribute("download", `relatorio_turnos_${timestamp}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showGlobalToast("Relatório CSV gerado para download.", "success");
      } else {
        showGlobalToast(
          "Seu navegador não suporta o download direto.",
          "warning"
        );
      }
    });
  }

  const exportPdfButton = document.getElementById("export-pdf-button");
  if (exportPdfButton) {
    exportPdfButton.addEventListener("click", () => {
      // Verifica se a biblioteca jsPDF e autoTable estão carregadas
      if (
        typeof window.jspdf !== "undefined" &&
        typeof window.jspdf.jsPDF === "function" &&
        typeof window.jspdf.jsPDF.API.autoTable === "function"
      ) {
        const { jsPDF } = window.jspdf;
        const table = document.getElementById("report-table");
        const rows = table.querySelectorAll("tbody tr");

        if (
          rows.length === 0 ||
          (rows.length === 1 &&
            rows[0].cells.length === 1 &&
            rows[0].cells[0].colSpan > 1)
        ) {
          showGlobalToast(
            "Não há dados na tabela para exportar para PDF.",
            "info"
          );
          return;
        }

        const doc = new jsPDF({
          orientation: "landscape",
          unit: "pt",
          format: "a4",
        });

        const title = "Relatório de Turnos";
        const dataInicio = document.getElementById("filtro-data-inicio").value;
        const dataFim = document.getElementById("filtro-data-fim").value;
        const colaborador = document.getElementById("filtro-colaborador").value;

        const dataInicioParaExibicao = new Date(
          dataInicio + "T00:00:00"
        ).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
        const dataFimParaExibicao = new Date(
          dataFim + "T00:00:00"
        ).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });

        let subtitle = `Período: ${dataInicioParaExibicao} a ${dataFimParaExibicao}`;
        if (colaborador) {
          subtitle += ` | Colaborador: ${colaborador}`;
        }

        doc.setFontSize(18);
        doc.text(title, doc.internal.pageSize.getWidth() / 2, 40, {
          align: "center",
        });
        doc.setFontSize(10);
        doc.text(subtitle, doc.internal.pageSize.getWidth() / 2, 60, {
          align: "center",
        });

        doc.autoTable({
          html: "#report-table",
          startY: 75, // Posição Y para iniciar a tabela
          theme: "grid", // 'striped', 'grid', 'plain'
          headStyles: {
            fillColor: [22, 160, 133],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          }, // Cor do header da tabela
          styles: { fontSize: 8, cellPadding: 4 },
          columnStyles: { 0: { cellWidth: 70 }, 1: { cellWidth: "auto" } }, // Ajuste a largura das colunas se necessário
        });

        const timestamp = new Date()
          .toISOString()
          .slice(0, 19)
          .replace(/:/g, "-")
          .replace("T", "_");
        doc.save(`relatorio_turnos_${timestamp}.pdf`);
        showGlobalToast("Relatório PDF gerado para download.", "success");
      } else {
        showGlobalToast(
          "Bibliotecas jsPDF e/ou autoTable não carregadas. Não é possível gerar PDF. Adicione os CDNs ao home.html.",
          "error",
          6000
        );
        console.warn(
          'Para exportar PDF: inclua jsPDF e jsPDF-AutoTable no seu HTML. Ex:\n<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js"></script>'
        );
      }
    });
  }
}
