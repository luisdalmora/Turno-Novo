<?php

/**
 * Carrega uma view, opcionalmente passando dados para ela.
 *
 * @param string $viewName Nome do arquivo da view (sem .php, ex: 'auth/login').
 * @param array $data Array associativo de dados para extrair na view.
 */
function loadView(string $viewName, array $data = []): void
{
    // Extrai os dados para que possam ser usados como variáveis na view
    extract($data);

    $viewFile = ROOT_PATH . '/app/Views/' . $viewName . '.php';

    if (file_exists($viewFile)) {
        require $viewFile;
    } else {
        // Log do erro ou uma mensagem mais amigável
        error_log("Arquivo de View não encontrado: " . $viewFile);
        echo "<p>Erro: View '{$viewName}' não encontrada.</p>";
        // Em produção, você pode querer mostrar uma página de erro genérica
        // displayErrorPage(500, "Erro ao carregar a visualização.");
    }
}

/**
 * Exibe uma página de erro HTTP.
 *
 * @param int $httpStatusCode Código de status HTTP (ex: 404, 500).
 * @param string $message Mensagem a ser exibida.
 */
function displayErrorPage(int $httpStatusCode, string $message = "Ocorreu um erro."): void
{
    http_response_code($httpStatusCode);
    // Você pode criar uma view específica para erros: loadView('errors/general_error', ['errorCode' => $httpStatusCode, 'errorMessage' => $message]);
    // Por enquanto, uma mensagem simples:
    echo "<h1>Erro {$httpStatusCode}</h1>";
    echo "<p>{$message}</p>";
    // Em um sistema mais robusto, você carregaria uma view de erro aqui.
    // Por exemplo: require ROOT_PATH . '/app/Views/errors/' . $httpStatusCode . '.php';
    exit;
}

/**
 * Redireciona para uma URL dentro da aplicação.
 *
 * @param string $path Caminho para redirecionar (ex: 'login', 'home').
 */
function redirect(string $path): void
{
    header('Location: ' . BASE_URL . '/' . trim($path, '/'));
    exit;
}

/**
 * Retorna o objeto de conexão PDO.
 * Esta função depende que app/Config/database.php já tenha sido incluído.
 *
 * @return PDO
 */
function db(): PDO
{
    // A função getDbConnection() está definida em app/Config/database.php
    $pdo = getDbConnection();
    if ($pdo === null) {
        // Isso não deveria acontecer se database.php estiver correto e o servidor DB estiver online.
        // Mas é uma salvaguarda.
        displayErrorPage(500, "Falha crítica na conexão com o banco de dados.");
    }
    return $pdo;
}

// Adicione outras funções globais úteis aqui (ex: para sanitizar inputs, verificar login, etc.)

