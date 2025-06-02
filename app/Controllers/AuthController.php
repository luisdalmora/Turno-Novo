<?php

class AuthController
{
    /**
     * Exibe o formulário de login.
     */
    public function showLoginForm(): void
    {
        // Futuramente, se o usuário já estiver logado, redirecionar para a home.
        // if (isset($_SESSION['id_usuario'])) {
        //     redirect('home');
        // }
        loadView('auth/login', ['pageTitle' => 'Login']);
    }

    /**
     * Processa a tentativa de login.
     * (Será implementado em um próximo passo)
     */
    public function processLogin(): void
    {
        // Verificar se a requisição é POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            redirect('login'); // Redireciona se não for POST
        }

        // Obter dados do formulário
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';

        // Validação básica (melhorar depois)
        if (empty($username) || empty($password)) {
            $_SESSION['error_message'] = 'Usuário e senha são obrigatórios.';
            redirect('login');
        }

        // Lógica de autenticação com o banco de dados (próximo passo)
        // $userModel = new Usuario(); // Supondo que você terá um Model Usuario
        // $user = $userModel->findByUsername($username);

        // if ($user && password_verify($password, $user['senha'])) {
        //     // Login bem-sucedido
        //     $_SESSION['id_usuario'] = $user['id_usuario'];
        //     $_SESSION['nome_usuario'] = $user['nome_completo'];
        //     redirect('home'); // Redirecionar para a página inicial após login
        // } else {
        //     // Falha no login
        //     $_SESSION['error_message'] = 'Usuário ou senha inválidos.';
        //     redirect('login');
        // }

        // Placeholder - remover quando a lógica acima for implementada
        echo "Processando login para: " . htmlspecialchars($username);
        // Por enquanto, vamos apenas redirecionar de volta para o login com uma mensagem
        $_SESSION['error_message'] = 'Funcionalidade de login em desenvolvimento.';
        redirect('login');
    }

    /**
     * Realiza o logout do usuário.
     */
    public function logout(): void
    {
        session_unset(); // Remove todas as variáveis de sessão
        session_destroy(); // Destrói a sessão
        redirect('login'); // Redireciona para a página de login
    }
}

