// public/js/modules/scriptsManager.js
import { showGlobalToast } from "./utils.js";

export function initScriptsPage() {
  console.log("Scripts Manager Initialized");
  const sectionFormScript = document.getElementById("section-form-script");
  const formNovoScript = document.getElementById("form-novo-script");
  const inputScriptIdForm = document.getElementById("script_id_form_scripts");
  const inputTituloScript = document.getElementById("script-titulo");
  const textareaConteudoScript = document.getElementById("script-conteudo");
  const btnSalvarScript = document.getElementById("btn-salvar-script");
  const btnLimparFormularioScript = document.getElementById(
    "btn-limpar-formulario-script"
  );
  const scriptsTableBody = document.querySelector("#scripts-table tbody");
  const inputPesquisaScript = document.getElementById("input-pesquisa-script");
  const modoLeituraIndicator = document.getElementById(
    "modo-leitura-scripts-indicator"
  );
  const SIMULATE_ADMIN_SCRIPTS = true;

  if (sectionFormScript && modoLeituraIndicator) {
    sectionFormScript.style.display = SIMULATE_ADMIN_SCRIPTS ? "block" : "none";
    modoLeituraIndicator.classList.toggle("hidden", SIMULATE_ADMIN_SCRIPTS);
  }

  let scriptsDataSimulada = [
    {
      id: 1,
      t: "Backup Clientes XPTO",
      c: "SELECT * INTO BCK",
      u: "28/05/2024 10:30",
    },
    { id: 2, t: "Limpa Logs", c: "DELETE OLD", u: "25/05/2024 15:00" },
  ];
  let debounceTimerScripts;

  function renderizarListaScripts(scripts) {
    if (!scriptsTableBody) return;
    scriptsTableBody.innerHTML = "";
    if (!scripts.length) {
      scriptsTableBody.innerHTML = `<tr><td colspan="3" class="p-4 text-center text-slate-500">Nenhum script.</td></tr>`;
      return;
    }
    scripts.forEach((s) => {
      const r = scriptsTableBody.insertRow();
      r.dataset.scriptId = s.id;
      r.insertCell().innerHTML = `<a href="#" class="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline view-script-link" data-script-id="<span class="math-inline">\{s\.id\}"\></span>{s.t}</a>`;
      r.cells[0].className = "px-4 py-3 whitespace-nowrap";
      r.insertCell().textContent = s.u || "N/A";
      r.cells[1].className =
        "px-4 py-3 text-sm text-slate-500 hidden md:table-cell";
      const ac = r.insertCell();
      ac.className = "px-4 py-3 text-center text-sm space-x-1 sm:space-x-2";
      if (SIMULATE_ADMIN_SCRIPTS) {
        ac.innerHTML = `<button class="action-edit-script p-1 sm:p-1.5 text-indigo-600 hover:text-indigo-800" title="Editar Script" data-script-id="<span class="math-inline">\{s\.id\}"\><i data\-lucide\="edit\-3" class\="w\-3\.5 h\-3\.5 sm\:w\-4 sm\:h\-4 pointer\-events\-none"\></i\></button\><button class\="action\-delete\-script p\-1 sm\:p\-1\.5 text\-red\-600 hover\:text\-red\-800" title\="Excluir Script" data\-script\-id\="</span>"><i data-lucide="trash-2" class="w-3.5 h-3.5 sm:w-4 sm:h-4 pointer-events-none"></i></button>`;
      } else {
        ac.innerHTML = `<span class="text-xs text-slate-400">N/A</span>`;
      }
    });
    if (typeof lucide !== "undefined") lucide.createIcons();
    addEventListenersToScriptActions();
  }
  function carregarScriptParaEdicao(scriptId) {
    const s = scriptsDataSimulada.find((x) => x.id == scriptId);
    if (
      !s ||
      !inputTituloScript ||
      !textareaConteudoScript ||
      !inputScriptIdForm ||
      !btnLimparFormularioScript ||
      !btnSalvarScript
    )
      return;
    inputTituloScript.value = s.t;
    textareaConteudoScript.value = s.c;
    inputScriptIdForm.value = s.id;
    btnLimparFormularioScript.style.display = "inline-flex";
    btnSalvarScript.innerHTML =
      '<i data-lucide="save" class="w-4 h-4 mr-2"></i> Atualizar Script';
    if (typeof lucide !== "undefined")
      lucide.createIcons({ nodes: [btnSalvarScript.querySelector("i")] });
    inputTituloScript.focus();
    document
      .getElementById("section-form-script")
      ?.scrollIntoView({ behavior: "smooth" });
  }
  function limparFormularioScript() {
    if (formNovoScript) formNovoScript.reset();
    if (inputScriptIdForm) inputScriptIdForm.value = "";
    if (btnLimparFormularioScript)
      btnLimparFormularioScript.style.display = "none";
    if (btnSalvarScript) {
      btnSalvarScript.innerHTML =
        '<i data-lucide="save" class="w-4 h-4 mr-2"></i> Salvar Script';
      if (typeof lucide !== "undefined")
        lucide.createIcons({ nodes: [btnSalvarScript.querySelector("i")] });
    }
    if (inputTituloScript) inputTituloScript.focus();
  }
  function addEventListenersToScriptActions() {
    document.querySelectorAll(".view-script-link").forEach((l) =>
      l.addEventListener("click", function (e) {
        e.preventDefault();
        if (!SIMULATE_ADMIN_SCRIPTS) {
          const s = scriptsDataSimulada.find(
            (x) => x.id == this.dataset.scriptId
          );
          if (s && inputTituloScript && textareaConteudoScript) {
            inputTituloScript.value = s.t;
            textareaConteudoScript.value = s.c;
            inputTituloScript.disabled = true;
            textareaConteudoScript.disabled = true;
            if (btnSalvarScript) btnSalvarScript.style.display = "none";
            if (btnLimparFormularioScript)
              btnLimparFormularioScript.style.display = "inline-flex";
            if (inputScriptIdForm) inputScriptIdForm.value = "";
            document
              .getElementById("section-form-script")
              ?.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
        carregarScriptParaEdicao(this.dataset.scriptId);
        if (inputTituloScript) inputTituloScript.disabled = false;
        if (textareaConteudoScript) textareaConteudoScript.disabled = false;
        if (btnSalvarScript) btnSalvarScript.style.display = "inline-flex";
      })
    );
    if (SIMULATE_ADMIN_SCRIPTS) {
      document.querySelectorAll(".action-edit-script").forEach((b) =>
        b.addEventListener("click", function () {
          carregarScriptParaEdicao(this.dataset.scriptId);
          if (inputTituloScript) inputTituloScript.disabled = false;
          if (textareaConteudoScript) textareaConteudoScript.disabled = false;
          if (btnSalvarScript) btnSalvarScript.style.display = "inline-flex";
        })
      );
      document.querySelectorAll(".action-delete-script").forEach((b) =>
        b.addEventListener("click", function () {
          const id = this.dataset.scriptId;
          const s = scriptsDataSimulada.find((x) => x.id == id);
          if (confirm(`Excluir "${s ? s.t : "ID " + id}"?`)) {
            scriptsDataSimulada = scriptsDataSimulada.filter((x) => x.id != id);
            renderizarListaScripts(scriptsDataSimulada);
            if (inputScriptIdForm && inputScriptIdForm.value == id)
              limparFormularioScript();
            showGlobalToast("Script excluído (simulação).", "success");
          }
        })
      );
    }
  }
  if (SIMULATE_ADMIN_SCRIPTS && formNovoScript && btnSalvarScript) {
    formNovoScript.addEventListener("submit", (e) => {
      e.preventDefault();
      const t = inputTituloScript.value.trim(),
        c = textareaConteudoScript.value.trim(),
        id = inputScriptIdForm.value;
      if (!t || !c) {
        showGlobalToast("Título e Conteúdo são obrigatórios.", "warning");
        return;
      }
      const now = new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      if (id) {
        const idx = scriptsDataSimulada.findIndex((s) => s.id == id);
        if (idx > -1) {
          scriptsDataSimulada[idx].t = t;
          scriptsDataSimulada[idx].c = c;
          scriptsDataSimulada[idx].u = now;
        }
      } else {
        const newId =
          scriptsDataSimulada.length > 0
            ? Math.max(...scriptsDataSimulada.map((s) => s.id)) + 1
            : 1;
        scriptsDataSimulada.unshift({ id: newId, t: t, c: c, u: now });
      }
      renderizarListaScripts(
        scriptsDataSimulada.filter(
          (s) =>
            s.t
              .toLowerCase()
              .includes(inputPesquisaScript.value.toLowerCase()) ||
            s.c.toLowerCase().includes(inputPesquisaScript.value.toLowerCase())
        )
      );
      limparFormularioScript();
      showGlobalToast("Script salvo (simulação).", "success");
    });
  }
  if (SIMULATE_ADMIN_SCRIPTS && btnLimparFormularioScript) {
    btnLimparFormularioScript.addEventListener("click", () => {
      limparFormularioScript();
      if (inputTituloScript) inputTituloScript.disabled = false;
      if (textareaConteudoScript) textareaConteudoScript.disabled = false;
      if (btnSalvarScript) btnSalvarScript.style.display = "inline-flex";
    });
  }
  if (inputPesquisaScript) {
    inputPesquisaScript.addEventListener("keyup", function () {
      clearTimeout(debounceTimerScripts);
      const term = this.value.toLowerCase();
      debounceTimerScripts = setTimeout(
        () =>
          renderizarListaScripts(
            scriptsDataSimulada.filter(
              (s) =>
                s.t.toLowerCase().includes(term) ||
                s.c.toLowerCase().includes(term)
            )
          ),
        300
      );
    });
  }
  if (scriptsTableBody)
    setTimeout(() => renderizarListaScripts(scriptsDataSimulada), 500);
}
