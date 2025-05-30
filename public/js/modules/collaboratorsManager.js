// public/js/modules/collaboratorsManager.js
import { showGlobalToast } from "./utils.js";

// Função para abrir o modal (chamada internamente)
function openEditColabModal(colaborador) {
  const modal = document.getElementById("edit-collaborator-modal");
  const modalContent = document.getElementById(
    "edit-collaborator-modal-content"
  );
  const editColabForm = document.getElementById("edit-collaborator-form");

  if (!modal || !modalContent || !editColabForm) {
    console.warn(
      "Elementos do modal de edição de colaborador não encontrados para ABRIR."
    );
    return;
  }
  editColabForm.reset(); // Limpa o formulário

  // Pega referências aos inputs do formulário
  const colabIdInput = document.getElementById("edit-colab-id");
  const nomeCompInput = document.getElementById("edit-nome_completo");
  const emailInput = document.getElementById("edit-email");
  const cargoInput = document.getElementById("edit-cargo");

  // Preenche o formulário
  if (colabIdInput) colabIdInput.value = colaborador.id;
  if (nomeCompInput) nomeCompInput.value = colaborador.nome_completo;
  if (emailInput)
    emailInput.value = colaborador.email === "N/A" ? "" : colaborador.email; // Trata 'N/A'
  if (cargoInput)
    cargoInput.value = colaborador.cargo === "N/A" ? "" : colaborador.cargo; // Trata 'N/A'

  modal.classList.remove("hidden");
  setTimeout(() => {
    // Para animação de entrada
    modal.classList.remove("opacity-0");
    modalContent.classList.remove("opacity-0", "scale-95");
    modalContent.classList.add("opacity-100", "scale-100");
  }, 10);

  if (typeof lucide !== "undefined" && modalContent) {
    lucide.createIcons({
      nodes: modalContent.querySelectorAll("i[data-lucide]"),
    });
  }
}

// Função para fechar o modal (chamada internamente)
function closeEditColabModal() {
  const modal = document.getElementById("edit-collaborator-modal");
  const modalContent = document.getElementById(
    "edit-collaborator-modal-content"
  );
  if (modal && modalContent) {
    modal.classList.add("opacity-0");
    modalContent.classList.remove("opacity-100", "scale-100");
    modalContent.classList.add("opacity-0", "scale-95");
    setTimeout(() => modal.classList.add("hidden"), 300); // Espera a transição antes de ocultar
  }
}

export function initCollaboratorsPage() {
  console.log("Collaborators Manager Initialized");
  const collaboratorsTableBody = document.querySelector(
    "#collaborators-table tbody"
  );
  const editColabForm = document.getElementById("edit-collaborator-form"); // Do modal

  function carregarColaboradoresSimulado() {
    if (!collaboratorsTableBody) return;
    collaboratorsTableBody.innerHTML = `<tr><td colspan="6" class="px-5 py-4 text-center text-slate-500 text-sm"><i data-lucide="loader-circle" class="animate-spin w-5 h-5 inline-block mr-2"></i>Carregando...</td></tr>`;
    if (typeof lucide !== "undefined") lucide.createIcons();

    setTimeout(() => {
      const dadosExemploColab = [
        {
          id: 1,
          nome_completo: "Ana Clara Dias",
          email: "ana.dias@example.com",
          cargo: "Frentista",
          ativo: true,
        },
        {
          id: 2,
          nome_completo: "Bruno Gomes Silva",
          email: "bruno.gomes@example.com",
          cargo: "Caixa",
          ativo: false,
        },
        {
          id: 3,
          nome_completo: "Carlos Nobre Zanetti",
          email: "carlos.zanetti@example.com",
          cargo: "Gerente",
          ativo: true,
        },
      ];
      collaboratorsTableBody.innerHTML = "";
      if (dadosExemploColab.length === 0) {
        collaboratorsTableBody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-slate-500">Nenhum colaborador. <a href="cadastrar_colaborador.html" class="text-sky-600 hover:underline">Adicionar</a>.</td></tr>`;
        return;
      }
      dadosExemploColab.forEach((c) => {
        const r = collaboratorsTableBody.insertRow();
        r.dataset.colabId = c.id;
        r.insertCell().outerHTML = `<td class="px-5 py-3 text-sm text-slate-700">${c.id}</td>`;
        r.insertCell().outerHTML = `<td class="px-5 py-3 text-sm font-medium text-slate-800">${c.nome_completo}</td>`;
        r.insertCell().outerHTML = `<td class="px-5 py-3 text-sm text-slate-600">${
          c.email || "N/A"
        }</td>`;
        r.insertCell().outerHTML = `<td class="px-5 py-3 text-sm text-slate-600">${
          c.cargo || "N/A"
        }</td>`;
        r.insertCell().outerHTML = `<td class="px-5 py-3 text-sm"><span class="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
          c.ativo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }">${c.ativo ? "Ativo" : "Inativo"}</span></td>`;
        const ac = r.insertCell();
        ac.className = "px-5 py-3 text-center text-sm font-medium space-x-2";
        ac.innerHTML = `<button class="action-edit-colab p-1.5 text-indigo-600 hover:text-indigo-800" title="Editar Colaborador" data-colab-id="${
          c.id
        }"><i data-lucide="edit-3" class="w-4 h-4 pointer-events-none"></i></button> <button class="action-toggle-status-colab p-1.5 ${
          c.ativo
            ? "text-yellow-600 hover:text-yellow-800"
            : "text-green-600 hover:text-green-800"
        }" title="${
          c.ativo ? "Desativar Colaborador" : "Ativar Colaborador"
        }" data-colab-id="${c.id}" data-current-status="${
          c.ativo ? "1" : "0"
        }"><i data-lucide="${
          c.ativo ? "toggle-left" : "toggle-right"
        }" class="w-4 h-4 pointer-events-none"></i></button>`;
      });
      if (typeof lucide !== "undefined") lucide.createIcons();
      addEventListenersToColabActions();
    }, 500);
  }

  function addEventListenersToColabActions() {
    // Botões "Editar" na tabela
    document.querySelectorAll(".action-edit-colab").forEach((button) => {
      button.addEventListener("click", function () {
        const colabId = this.dataset.colabId;
        const row = this.closest("tr");
        // Recria o objeto colaborador com os dados da linha para passar para openEditColabModal
        const colabData = {
          id: colabId,
          nome_completo: row.cells[1].textContent,
          email: row.cells[2].textContent,
          cargo: row.cells[3].textContent,
          // ativo: row.cells[4].querySelector('span').classList.contains('status-ativo') // se precisar do status no modal
        };
        openEditColabModal(colabData);
      });
    });
    // Botões "Alternar Status" na tabela
    document
      .querySelectorAll(".action-toggle-status-colab")
      .forEach((button) => {
        button.addEventListener("click", function () {
          showGlobalToast(
            `Status do colaborador ${this.dataset.colabId} seria ${
              this.dataset.currentStatus === "1" ? "desativado" : "ativado"
            } (simulação).`,
            "info"
          );
          // Em uma app real, aqui você faria a chamada API e atualizaria a UI no sucesso
          carregarColaboradoresSimulado(); // Simplesmente recarrega para simular a mudança
        });
      });
  }

  // Listener para o formulário de edição do modal
  if (editColabForm) {
    editColabForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const colabId = document.getElementById("edit-colab-id")?.value;
      showGlobalToast(
        `Colaborador ID ${colabId} salvo (simulação).`,
        "success"
      );
      closeEditColabModal(); // Chama a função de fechar local
      carregarColaboradoresSimulado(); // Recarrega a tabela para refletir mudanças (simulado)
    });
  }

  // Listeners para fechar o modal de edição de colaborador
  const closeModalColabBtn = document.querySelector(
    "#edit-collaborator-modal .modal-close-btn-colab-edit"
  );
  const modalColabBdrop = document.getElementById("edit-collaborator-modal");
  const cancelEditColabBtn = document.getElementById(
    "cancel-edit-colab-button"
  );

  if (closeModalColabBtn)
    closeModalColabBtn.addEventListener("click", closeEditColabModal);
  if (cancelEditColabBtn)
    cancelEditColabBtn.addEventListener("click", closeEditColabModal);
  if (modalColabBdrop)
    modalColabBdrop.addEventListener("click", (e) => {
      if (e.target === modalColabBdrop) closeEditColabModal();
    });

  // Carregamento inicial
  if (collaboratorsTableBody) {
    carregarColaboradoresSimulado();
  }
}
