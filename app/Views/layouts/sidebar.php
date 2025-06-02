<?php
// app/Views/layouts/sidebar.php

// Obtém a rota atual para destacar o link ativo
$currentRequestPathForSidebar = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePathForSidebarRoute = rtrim($baseDir, '/'); // $baseDir é definido no public/index.php
$currentRouteForSidebar = substr($currentRequestPathForSidebar, strlen($basePathForSidebarRoute));
$currentRouteForSidebar = trim($currentRouteForSidebar, '/');
if ($currentRouteForSidebar === '') $currentRouteForSidebar = 'home'; // Rota padrão para dashboard

$navItems = [
    'home' => ['icon' => 'layout-dashboard', 'text' => 'Painel Principal', 'url' => BASE_URL . '/home'],
    'cadastrar_colaborador' => ['icon' => 'user-plus', 'text' => 'Cadastrar Colaborador', 'url' => BASE_URL . '/colaboradores/cadastrar'],
    // 'listar_colaboradores' => ['icon' => 'users', 'text' => 'Listar Colaboradores', 'url' => BASE_URL . '/colaboradores'],
    'turnos' => ['icon' => 'calendar-days', 'text' => 'Gerenciar Turnos', 'url' => BASE_URL . '/turnos'],
    'scripts' => ['icon' => 'file-code-2', 'text' => 'Scripts SQL', 'url' => BASE_URL . '/scripts'],
    'relatorios' => ['icon' => 'bar-chart-3', 'text' => 'Relatórios', 'url' => BASE_URL . '/relatorios'], // Exemplo
    'configuracoes' => ['icon' => 'settings', 'text' => 'Configurações', 'url' => BASE_URL . '/configuracoes'] // Exemplo
];

// Adicione aqui a lógica para determinar qual item de menu está ativo
// Por exemplo, comparando $currentRouteForSidebar com as chaves de $navItems
// ou partes da URL. Para simplificar, faremos uma correspondência exata ou inicial.

function isLinkActive($navKey, $currentRoute) {
    if ($navKey === $currentRoute) {
        return true;
    }
    // Para rotas aninhadas, como 'colaboradores/cadastrar' e 'colaboradores/listar'
    // você pode querer que 'colaboradores' seja o grupo ativo.
    if (strpos($currentRoute, $navKey) === 0 && strlen($currentRoute) > strlen($navKey) && $currentRoute[strlen($navKey)] === '/') {
        // return true; // Descomente se quiser ativar o grupo pai
    }
    return false;
}

?>
<aside id="sidebar"
    class="w-64 bg-slate-800 text-slate-200 p-4 space-y-2 transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen flex-shrink-0 -translate-x-full z-10 md:z-auto shadow-lg">
    <div class="flex items-center justify-center pb-6 pt-2 border-b border-slate-700">
        <a href="<?php echo BASE_URL; ?>/home" class="flex items-center">
            <i data-lucide="calendar-check-2" class="w-10 h-10 text-sky-500 mr-3"></i>
            <span class="text-xl font-semibold text-white">Sistema Turnos</span>
        </a>
    </div>

    <nav class="mt-4 flex-1">
        <ul class="space-y-1">
            <?php foreach ($navItems as $key => $item): ?>
                <?php
                    $isActive = isLinkActive($key, $currentRouteForSidebar);
                    $linkClasses = "flex items-center px-3 py-2.5 rounded-lg transition-colors duration-150 ease-in-out";
                    $linkClasses .= $isActive
                        ? " bg-sky-600 text-white shadow-md"
                        : " text-slate-300 hover:bg-slate-700 hover:text-white";
                ?>
                <li>
                    <a href="<?php echo $item['url']; ?>" class="<?php echo $linkClasses; ?>" data-page-id="<?php echo $key; ?>">
                        <i data-lucide="<?php echo $item['icon']; ?>" class="w-5 h-5 mr-3 <?php echo $isActive ? 'text-white' : 'text-slate-400'; ?>"></i>
                        <span><?php echo htmlspecialchars($item['text']); ?></span>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </nav>

    <div class="pt-4 mt-auto border-t border-slate-700">
        <a href="<?php echo BASE_URL; ?>/logout"
            class="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors duration-150 ease-in-out">
            <i data-lucide="log-out" class="w-5 h-5 mr-3 text-slate-400"></i>
            <span>Sair</span>
        </a>
    </div>
</aside>