<?php

// Configurações do Banco de Dados SQL Server
define('DB_SERVER_NAME', "SimPosto-Luis\sqlexpress"); // ou o nome da sua instância SQL Server. Ex: 'localhost', 'NOMEMAQUINA\SQLEXPRESS', '192.168.1.100'
define('DB_DATABASE_NAME', 'simposto'); // O nome do banco de dados que você criou com o script DDL.
define('DB_USER_UID', 'sa');      // Seu usuário de acesso ao SQL Server.
define('DB_USER_PWD', 'SA_0bjetiva');        // Sua senha de acesso ao SQL Server.
define('DB_CHARSET', 'UTF-8');                   // Charset recomendado.

/**
 * Função para obter uma conexão PDO com o SQL Server.
 *
 * @return PDO|null Retorna um objeto PDO em caso de sucesso, ou null em caso de falha.
 */
function getDbConnection(): ?PDO
{
    static $pdo = null; // Conexão estática para reutilização (Singleton básico)

    if ($pdo === null) {
        $connectionOptions = [
            PDO::SQLSRV_ATTR_ENCODING    => PDO::SQLSRV_ENCODING_UTF8, // Garante UTF-8 na comunicação com o driver
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,    // Lança exceções em caso de erro
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,        // Retorna arrays associativos por padrão
            // PDO::ATTR_EMULATE_PREPARES   => false,                // Desabilita emulação de prepared statements se o driver suportar nativamente
        ];

        $dsn = "sqlsrv:Server=" . DB_SERVER_NAME . ";Database=" . DB_DATABASE_NAME;

        try {
            $pdo = new PDO($dsn, DB_USER_UID, DB_USER_PWD, $connectionOptions);
            // echo "Conexão com o banco de dados bem-sucedida!"; // Descomente para testar, depois remova ou comente.
        } catch (PDOException $e) {
            // Em um ambiente de produção, você não deve exibir a mensagem de erro diretamente.
            // É melhor logar o erro em um arquivo ou sistema de monitoramento.
            error_log("Erro de conexão com o banco de dados: " . $e->getMessage());
            // Você pode optar por lançar a exceção novamente ou retornar null/die,
            // dependendo de como sua aplicação lidará com falhas de DB.
            // Para este exemplo, vamos simplificar e encerrar a aplicação se a conexão falhar.
            die("Erro crítico: Não foi possível conectar ao banco de dados. Por favor, contate o administrador do sistema.");
            // return null;
        }
    }

    return $pdo;
}

// Teste opcional da conexão (remover ou comentar após verificar)
// $db = getDbConnection();
// if ($db) {
//     echo "<p>Objeto PDO criado com sucesso!</p>";
// } else {
//     echo "<p>Falha ao obter objeto PDO.</p>";
// }

