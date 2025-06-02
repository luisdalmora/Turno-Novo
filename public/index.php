<?php
// Turno/public/index.php

// Inicia a sessão PHP para gerenciamento de login, mensagens, etc.
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Define o ROOT_PATH para facilitar a inclusão de arquivos.
// __DIR__ retorna o diretório do arquivo atual (public).
// dirname(__DIR__) retorna o diretório pai (Turno/).
define('ROOT_PATH', dirname(__DIR__));

// Define a URL base e o CAMINHO base da aplicação.
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'];

// Calcula o diretório base da aplicação na URL (ex: /Turno/public ou vazio se na raiz)
// Normaliza para usar barras '/' e remove /index.php se estiver presente no SCRIPT_NAME
$scriptNameNormalized = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
$baseDir = ($scriptNameNormalized == '/' || $scriptNameNormalized == '\\') ? '' : rtrim($scriptNameNormalized, '/');

define('BASE_PATH', $baseDir); // Define o CAMINHO base como uma constante
define('BASE_URL', $protocol . $host . BASE_PATH); // Define a URL base usando a constante BASE_PATH

// Inclui o arquivo de configuração do banco de dados e outras funções/configurações essenciais
require_once ROOT_PATH . '/app/Config/database.php';
require_once ROOT_PATH . '/app/Core/functions.php'; // Para loadView, redirect, etc.

// --- Roteamento Básico ---
// Obtém a rota da URL. Ex: se a URL é seusite.com/login, $route será 'login'
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); // Pega apenas o path da URI

// Remove o BASE_PATH do início da requestUri para obter a rota pura
$route = $requestUri;
if (BASE_PATH !== '' && strpos($requestUri, BASE_PATH) === 0) {
    $route = substr($requestUri, strlen(BASE_PATH));
}

// Remove barras extras do início e fim da rota
$route = trim($route, '/');

// Define uma rota padrão (pode ser 'login' ou 'home' dependendo do status da sessão)
if ($route === '') {
    if (isset($_SESSION['id_usuario'])) {
        $route = 'home'; // Se logado, vai para home
    } else {
        $route = 'login'; // Senão, vai para login
    }
}

// Define um array de rotas para os controllers
// Formato: 'nome_da_rota' => ['NomeController', 'metodoNoController', 'METODO_HTTP_ESPERADO (GET/POST/ANY)']
$routes = [
    'login'             => ['AuthController', 'showLoginForm', 'GET'],
    'login/processar'   => ['AuthController', 'processLogin', 'POST'], // Rota para o POST do formulário de login
    'logout'            => ['AuthController', 'logout', 'GET'],
    'home'              => ['HomeController', 'index', 'GET'], // Placeholder, criaremos HomeController depois

    // Exemplo de outras rotas (descomentar e criar controllers/métodos conforme necessário)
    // 'colaboradores/cadastrar' => ['ColaboradorController', 'create', 'GET'],
    // 'colaboradores/salvar'    => ['ColaboradorController', 'store', 'POST'],
    // 'colaboradores'           => ['ColaboradorController', 'index', 'GET'],
    // 'turnos'                => ['TurnoController', 'index', 'GET'],
    // 'scripts'               => ['ScriptSqlController', 'index', 'GET'],
];

// Verifica se a rota existe no array de rotas
if (array_key_exists($route, $routes)) {
    $controllerName = $routes[$route][0];
    $methodName = $routes[$route][1];
    // Define o método HTTP esperado (GET por padrão se não especificado)
    $requestMethodExpected = isset($routes[$route][2]) ? strtoupper($routes[$route][2]) : 'GET';
    $currentRequestMethod = $_SERVER['REQUEST_METHOD'];

    // Verifica o método da requisição
    if ($requestMethodExpected === 'ANY' || $currentRequestMethod === $requestMethodExpected) {
        $controllerFile = ROOT_PATH . '/app/Controllers/' . $controllerName . '.php';

        if (file_exists($controllerFile)) {
            require_once $controllerFile;
            if (class_exists($controllerName) && method_exists($controllerName, $methodName)) {
                $controllerInstance = new $controllerName();
                $controllerInstance->$methodName();
            } else {
                error_log("Controller ou método não encontrado: {$controllerName}->{$methodName}");
                displayErrorPage(500, "Erro interno no servidor (CME). Controller ou método inválido.");
            }
        } else {
            error_log("Arquivo do controller não encontrado: " . $controllerFile);
            displayErrorPage(500, "Erro interno no servidor (CFA). Arquivo do controller ausente.");
        }
    } else {
        // Método de requisição não permitido para esta rota
        error_log("Método não permitido para a rota '{$route}'. Esperado: {$requestMethodExpected}, Recebido: {$currentRequestMethod}");
        displayErrorPage(405, "Método não permitido para esta rota.");
    }
} else {
    // Rota não encontrada
    error_log("Rota não encontrada: " . $route);
    displayErrorPage(404, "Página não encontrada.");
}

