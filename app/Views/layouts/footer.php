<?php
// Turno/app/Views/layouts/footer.php

        // Fecha a tag <main> que foi aberta no header.php
        echo '</main>';

        // Fecha o <div class="flex flex-1 h-[calc(100vh-4rem)]"> se estiver logado e não for login
        $isLoggedIn = isset($_SESSION['id_usuario']);

        $currentRequestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $routePath = $currentRequestPath;
        if (defined('BASE_PATH') && BASE_PATH !== '' && strpos($currentRequestPath, BASE_PATH) === 0) {
            $routePath = substr($currentRequestPath, strlen(BASE_PATH));
        }
        $routePath = trim($routePath, '/');
        if ($routePath === '') {
            $routePath = $isLoggedIn ? 'home' : 'login';
        }

        if ($isLoggedIn && $routePath !== 'login') {
            echo '</div>'; // Fecha o <div class="flex flex-1 ...">
        }
?>

    </div> <div id="confirmation-modal-backdrop" class="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm flex items-center justify-center hidden z-[1055] transition-opacity duration-300 ease-in-out opacity-0">
        <div id="confirmation-modal-content" class="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0">
            <div class="flex justify-between items-center mb-4">
                <h3 id="confirmation-modal-title" class="text-xl font-semibold text-slate-800 flex items-center">
                    <i data-lucide="alert-triangle" class="w-6 h-6 mr-2 text-amber-500"></i>Confirmação
                </h3>
                <button type="button" id="close-confirmation-modal-btn" class="modal-close-confirmation p-2 -m-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors" aria-label="Fechar modal">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            <p id="confirmation-modal-message" class="text-slate-600 mb-6">Tem certeza que deseja realizar esta ação?</p>
            <div class="flex justify-end gap-3">
                <button type="button" id="cancel-confirmation-button" class="modal-close-confirmation inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500 transition-colors">
                    Cancelar
                </button>
                <button type="button" id="confirm-action-button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-colors">
                    Confirmar
                </button>
            </div>
        </div>
    </div>

    <div id="password-generator-modal-backdrop" class="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm items-center justify-center hidden z-[1050] transition-opacity duration-300 ease-in-out opacity-0">
      <div id="password-generator-modal-content" class="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-slate-800 flex items-center">
            <i data-lucide="key-round" class="w-6 h-6 mr-2 text-sky-600"></i>Gerador de Senhas (Data/Hora)
          </h3>
          <button type="button" id="close-password-generator-modal-btn" class="p-2 -m-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors" aria-label="Fechar modal">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>
        <div class="space-y-4">
          <div class="flex space-x-3 mb-4">
            <button type="button" id="senhaPayBtn" class="flex-1 px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500 transition-colors">
              Senha Pay
            </button>
            <button type="button" id="senhaDinamicaBtn" class="flex-1 px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 transition-colors">
              Senha Dinâmica
            </button>
          </div>
          <div class="relative">
            <input type="text" id="generatedPassword" readonly
              class="form-input block w-full border-slate-300 rounded-md shadow-sm bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm pr-10"
              placeholder="Senha gerada aparecerá aqui">
            <button type="button" id="copyGeneratedPassword"
              class="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-sky-600 transition-colors"
              aria-label="Copiar senha">
              <i data-lucide="copy" class="w-5 h-5"></i>
            </button>
          </div>
          <p id="copy-feedback" class="text-xs text-emerald-600 h-4"></p>
        </div>
      </div>
    </div>

    <div id="toast-container" class="fixed bottom-5 right-5 p-0 space-y-3 z-[2000] w-full max-w-xs sm:max-w-sm">
        </div>

    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
        // Inicializa os ícones Lucide em toda a página ou em elementos específicos se necessário
        // Esta chamada global é geralmente suficiente após o carregamento do DOM.
        // Se você carregar conteúdo dinamicamente (AJAX) que contenha novos ícones,
        // você precisará chamar lucide.createIcons() novamente ou em um escopo mais específico.
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
        });
    </script>
    <script type="module" src="<?php echo BASE_URL; ?>/js/main.js"></script>
    <?php
        // Incluir scripts específicos da página, se definidos pelo controller
        if (isset($pageScripts) && is_array($pageScripts)) {
            foreach ($pageScripts as $script) {
                echo '<script type="module" src="' . BASE_URL . '/js/' . htmlspecialchars($script) . '"></script>' . PHP_EOL;
            }
        }
    ?>
</body>
</html>