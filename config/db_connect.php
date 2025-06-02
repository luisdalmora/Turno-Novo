<?php
// config/db_connect.php

$serverName = "SimPosto-Luis\sqlexpress"; // Substitua pelo nome do seu servidor SQL Server. Ex: "localhost", "SERVIDOR\SQLEXPRESS"
$database = "Simposto";          // Nome do banco de dados
$uid = "sa";        // Seu usuário de acesso ao SQL Server
$pwd = "SA_0bjetiva";          // Sua senha de acesso ao SQL Server
$characterSet = "UTF-8";         // Recomendado para evitar problemas com acentuação

// String de conexão para SQL Server usando PDO
$connectionString = "sqlsrv:Server=$serverName;Database=$database";

// Tenta estabelecer a conexão
try {
    $pdo = new PDO($connectionString, $uid, $pwd);
    // Define o modo de erro do PDO para exceção, para que os erros sejam lançados e possam ser capturados.
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Define o modo de busca padrão para array associativo, para facilitar o acesso aos dados.
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    // Configura o character set para a conexão (importante para UTF-8).
    // Para SQL Server, o CharacterSet na string de conexão ou nas opções do PDO pode ser necessário.
    // Se a linha acima não funcionar para charset, você pode tentar $pdo->exec("SET NAMES '$characterSet'");
    // mas o ideal é que o driver já cuide disso com a opção na string de conexão ou array de opções.
    // Para o driver sqlsrv, a opção "CharacterSet" => "UTF-8" é geralmente adicionada no array de opções do construtor PDO:
    // $pdo = new PDO($connectionString, $uid, $pwd, array(PDO::SQLSRV_ATTR_ENCODING => PDO::SQLSRV_ENCODING_UTF8));
    // ou, como feito no seu script SQL, usar VARCHAR/NVARCHAR adequadamente e o collation do banco.
    // A configuração CharacterSet na string de conexão é mais comum com o driver sqlsrv antigo ou DBLIB.
    // Com o driver sqlsrv moderno, a manipulação de UTF-8 geralmente é bem gerenciada.

} catch (PDOException $e) {
    // Em um ambiente de produção, você NÃO deve exibir detalhes do erro para o usuário.
    // Considere logar o erro em um arquivo e mostrar uma mensagem genérica ao usuário.
    // Ex: error_log("Erro de conexão: " . $e->getMessage(), 0);
    //     die("Ocorreu um problema ao conectar com o banco de dados. Por favor, tente novamente mais tarde.");
    die("Erro na conexão com o banco de dados: " . $e->getMessage() . 
        "<br><br>Verifique se o nome do servidor, nome do banco, usuário e senha estão corretos no arquivo `config/db_connect.php`." .
        "<br>Verifique também se a extensão `pdo_sqlsrv` do PHP está habilitada no seu `php.ini`.");
}

// A variável $pdo estará disponível para ser usada