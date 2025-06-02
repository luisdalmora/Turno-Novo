<?php
// Turno/app/Views/layouts/header.php
?>
<!DOCTYPE html>
<html lang="pt-BR" class="h-full">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? htmlspecialchars($pageTitle) . ' - Sistema de Turnos' : 'Sistema de Turnos'; ?></title>
    <link rel="stylesheet" href="<?php echo BASE_URL; ?>/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Estilo para a scrollbar, se desejar manter */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background-color: #f1f1f1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background-color: #c1c1c1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background-color: #a1a1a1; }

        [data-lucide] { width: 1.125rem; height: 1.125rem; }

        /* Estilos do placeholder flutuante (do index.html original) */
        .input-field-group { position: relative; }
        .input-field-label {
            position: absolute;
            left: 52px; /* Ajustado para padding do input e ícone */
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af; /* gray-400 */
            font-size: 15px;
            line-height: 1; /* Adicionado para melhor alinhamento vertical */
            transition: all 0.2s ease-in-out;
            pointer-events: none;
            background-color: transparent; /* Para não cobrir o input inicialmente */
            padding: 0 4px;
        }
        /* Estado focado ou com valor */
        .input-field:focus + .input-field-label,
        .input-field:not(:placeholder-shown) + .input-field-label {
            top: -10px; /* Move para cima da borda */
            font-size: 12px;
            color: #3b82f6; /* text-sky-600 */
            background-color: white; /* Sobrepõe a borda do input */
        }
        /* Ajuste para o input sem ícone (se houver) */
        .input-field-no-icon + .input-field-label { left: 16px; }
        .input-field-no-icon:focus + .input-field-label,
        .input-field-no-icon:not(:placeholder-shown) + .input-field-label { left: 12px; }
    </style>
</head>

<body class="h-full font-poppins antialiased text-slate-800"> <div id="app-container" class="flex flex-col min-h-screen">

        <?php
        $isLoggedIn = isset($_SESSION['id_usuario']);

        // Calcula $routePath usando a constante BASE_PATH
        $currentRequestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $routePath = $currentRequestPath;
        // Remove BASE_PATH do início de $currentRequestPath para obter a rota relativa
        if (defined('BASE_PATH') && BASE_PATH !== '' && strpos($currentRequestPath, BASE_PATH) === 0) {
            $routePath = substr($currentRequestPath, strlen(BASE_PATH));
        }
        $routePath = trim($routePath, '/');
        // Se a rota estiver vazia após remover BASE_PATH, considera 'login' ou 'home'
        if ($routePath === '') {
            $routePath = $isLoggedIn ? 'home' : 'login';
        }


        // Lógica para decidir qual layout mostrar
        if ($isLoggedIn && $routePath !== 'login'):
        ?>
            <header class="h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-6 flex-shrink-0 sticky top-0 z-30">
                <div class="flex items-center">
                    <button id="mobile-menu-button" class="md:hidden mr-3 text-slate-600 hover:text-slate-800 p-2 -ml-2" aria-label="Abrir menu">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                    <div id="header-icon-placeholder" class="flex items-center text-sky-600">
                        <i data-lucide="<?php echo isset($headerIcon) ? htmlspecialchars($headerIcon) : 'layout-dashboard'; ?>" class="w-6 h-6 md:w-7 md:h-7"></i>
                    </div>
                    <h1 id="page-title-placeholder" class="text-md md:text-lg font-semibold text-slate-800 ml-2 md:ml-3">
                        <?php echo isset($pageTitle) ? htmlspecialchars($pageTitle) : 'Painel'; ?>
                    </h1>
                </div>
                <div id="user-info" class="flex items-center text-sm font-medium text-slate-700">
                    <span>Olá, <?php echo isset($_SESSION['nome_usuario']) ? htmlspecialchars($_SESSION['nome_usuario']) : 'Usuário'; ?></span>
                    <a href="<?php echo BASE_URL; ?>/logout" title="Sair" class="ml-3 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors">
                        <i data-lucide="log-out" class="w-5 h-5"></i>
                    </a>
                </div>
            </header>

            <div class="flex flex-1 h-[calc(100vh-4rem)]"> <?php
                // Inclui a sidebar
                if (file_exists(ROOT_PATH . '/app/Views/layouts/sidebar.php')) {
                    require_once ROOT_PATH . '/app/Views/layouts/sidebar.php';
                }
                ?>
                <main class="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-100">
        <?php else: // Layout para página de login ou quando não logado ?>
            <main class="flex-1 flex items-center justify-center p-4 w-full bg-gradient-to-br from-slate-900 to-sky-700">
        <?php endif; ?>