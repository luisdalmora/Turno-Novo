<?php
// app/Views/auth/login.php

// Define o título da página para o layout do header
$pageTitle = 'Login';

// Inclui o cabeçalho do layout
// A tag <main class="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-sky-700"> é aberta no header.php para a página de login
require_once ROOT_PATH . '/app/Views/layouts/header.php';
?>

<div class="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 md:p-10 space-y-6 transform transition-all duration-300 ease-in-out">
    <div class="text-center">
        <h1 class="text-3xl font-bold text-slate-800">Bem-vindo!</h1>
        <p class="mt-2 text-sm text-slate-600">Acesse sua conta para continuar</p>
    </div>

    <?php if (isset($_SESSION['error_message'])): ?>
        <div id="toast-error" class="flex items-center w-full p-4 mb-4 text-red-800 bg-red-100 rounded-lg shadow" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-200 rounded-lg">
                <i data-lucide="alert-circle" class="w-5 h-5"></i>
            </div>
            <div class="ms-3 text-sm font-normal"><?php echo htmlspecialchars($_SESSION['error_message']); ?></div>
        </div>
        <?php unset($_SESSION['error_message']); ?>
    <?php endif; ?>

    <?php if (isset($_SESSION['success_message'])): ?>
         <div id="toast-success" class="flex items-center w-full p-4 mb-4 text-green-800 bg-green-100 rounded-lg shadow" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-200 rounded-lg">
                <i data-lucide="check-circle" class="w-5 h-5"></i>
            </div>
            <div class="ms-3 text-sm font-normal"><?php echo htmlspecialchars($_SESSION['success_message']); ?></div>
        </div>
        <?php unset($_SESSION['success_message']); ?>
    <?php endif; ?>
    <form id="loginForm" method="POST" action="<?php echo BASE_URL; ?>/login/processar" class="space-y-6">
        <div class="input-field-group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i data-lucide="user" class="text-slate-400 w-5 h-5"></i>
            </div>
            <input id="username" name="username" type="text" required placeholder=" "
                   class="input-field block w-full pl-14 pr-4 py-3.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-700 placeholder-transparent"
                   value="<?php echo isset($_SESSION['form_data']['username']) ? htmlspecialchars($_SESSION['form_data']['username']) : ''; unset($_SESSION['form_data']['username']); ?>"
            >
            <label for="username" class="input-field-label">Usuário</label>
        </div>

        <div class="input-field-group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i data-lucide="lock" class="text-slate-400 w-5 h-5"></i>
            </div>
            <input id="password" name="password" type="password" required placeholder=" "
                   class="input-field block w-full pl-14 pr-4 py-3.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-700 placeholder-transparent"
            >
            <label for="password" class="input-field-label">Senha</label>
        </div>

        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox"
                       class="h-4 w-4 text-sky-600 focus:ring-sky-500 border-slate-300 rounded">
                <label for="remember-me" class="ml-2 block text-sm text-slate-700">Lembrar-me</label>
            </div>
            </div>

        <div>
            <button type="submit"
                    class="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-transform duration-150 ease-in-out active:scale-95">
                <i data-lucide="log-in" class="w-5 h-5 mr-2"></i>
                Entrar
            </button>
        </div>
    </form>

    <p class="mt-8 text-center text-xs text-slate-500">
        &copy; <?php echo date("Y"); ?> Sistema de Turnos. Todos os direitos reservados.
    </p>
</div>

<?php
// Inclui o rodapé do layout
// A tag </main> e o restante do HTML são fechados no footer.php
require_once ROOT_PATH . '/app/Views/layouts/footer.php';

// Limpa dados de formulário da sessão se existirem (para não persistir em outras páginas)
if (isset($_SESSION['form_data'])) {
    unset($_SESSION['form_data']);
}
?>