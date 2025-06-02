<!doctype html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login - Sistema de Turnos</title>
  <link href="./src/output.css" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script defer src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
  <style>
    /* Estilo para o efeito de placeholder flutuante, pode ser movido para input.css se preferir */
    .input-field-group {
      position: relative;
    }

    .input-field-label {
      position: absolute;
      left: 68px;
      /* Ajuste conforme o padding do input e tamanho do ícone */
      top: 50%;
      transform: translateY(-50%);
      color: #999;
      font-size: 15px;
      transition: all 0.3s ease;
      pointer-events: none;
      /* Para permitir clique no input */
    }

    .input-field:focus+.input-field-label,
    .input-field:not(:placeholder-shown)+.input-field-label {
      top: 10px;
      /* Posição quando flutuando */
      font-size: 12px;
      /* Tamanho da fonte quando flutuando */
      color: #1d5ca1;
      /* Cor quando focado/preenchido */
    }

    /* Adiciona um ícone placeholder dentro do input */
    .input-field-icon {
      position: absolute;
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }
  </style>
</head>

<body class="font-poppins">

  <div
    class="min-h-screen w-full flex flex-wrap justify-center items-center p-4 bg-gradient-to-br from-slate-800 to-slate-700">
    <div class="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
      <div class="w-full md:w-1/2 p-8 md:p-16">
        <form method="POST" action="login.php">
          <h2 class="text-3xl font-semibold text-slate-800 text-center mb-10">
            Faça o login
          </h2>

          <div class="input-field-group mb-7">
            <i data-lucide="user" class="input-field-icon w-5 h-5"></i>
            <input
              class="input-field w-full h-12 text-base text-slate-700 bg-slate-100 rounded-full pl-16 pr-8 py-2 outline-none focus:ring-2 focus:ring-sky-500 placeholder-transparent"
              type="text" name="usuario" id="usuario" required autocomplete="username" placeholder=" " />
            <label for="usuario" class="input-field-label">Usuário</label>
          </div>

          <div class="input-field-group mb-8">
            <i data-lucide="lock" class="input-field-icon w-5 h-5"></i>
            <input
              class="input-field w-full h-12 text-base text-slate-700 bg-slate-100 rounded-full pl-16 pr-8 py-2 outline-none focus:ring-2 focus:ring-sky-500 placeholder-transparent"
              type="password" name="senha" id="senha" required autocomplete="current-password" placeholder=" " />
            <label for="senha" class="input-field-label">Senha</label>
          </div>

          <div class="mb-8">
            <button
              class="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white font-medium text-sm uppercase rounded-full flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 active:scale-95"
              type="submit">
              <i data-lucide="log-in" class="w-5 h-5 mr-2"></i>
              Login
            </button>
          </div>

          <div class="text-center">
            <p class="text-sm text-slate-600 mb-2">
              Esqueceu sua
              <a href="#" class="font-medium text-sky-600 hover:text-sky-700 hover:underline">senha?</a>
            </p>
            <p class="text-sm text-slate-600">
              Não tem conta?
              <a href="conta.html" class="font-medium text-sky-600 hover:text-sky-700 hover:underline">Criar</a>
            </p>
          </div>
        </form>
      </div>

      <div class="hidden md:flex md:w-1/2 bg-slate-700 items-center justify-center p-8">
        <img src="./images/index.png" alt="Ilustração Sim Posto" class="max-w-full h-auto rounded-lg">
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      // Script para placeholder flutuante (se não for usar o estilo ::placeholder)
      // Os inputs agora usam placeholder=" " e a label faz o efeito com :not(:placeholder-shown)
    });

    // Script para exibir toasts de erro/status (se houver via GET params)
    // Este será um módulo separado depois (utils.js)
    function showToast(message, type = "info", duration = 3500) {
      const existingToast = document.getElementById("toast-notification");
      if (existingToast) {
        existingToast.remove();
      }
      const toast = document.createElement("div");
      toast.id = "toast-notification";
      let bgColor = "bg-sky-500"; // Cor padrão 'info'
      let iconName = "info";

      if (type === "success") {
        bgColor = "bg-green-500";
        iconName = "check-circle";
      } else if (type === "error") {
        bgColor = "bg-red-500";
        iconName = "x-circle";
      } else if (type === "warning") {
        bgColor = "bg-yellow-500"; // Tailwind não tem yellow-600 por padrão na v3, use 500 ou 700
        iconName = "alert-triangle";
      }

      toast.className = `fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-xl text-white text-sm font-medium z-[1060] flex items-center ${bgColor} transition-all duration-300 ease-out opacity-0 translate-y-10`;
      toast.innerHTML = `<i data-lucide="${iconName}" class="w-5 h-5 mr-2"></i><span>${message}</span>`;
      document.body.appendChild(toast);

      if (typeof lucide !== 'undefined') {
        lucide.createIcons({
          nodes: [toast.querySelector("i[data-lucide]")]
        });
      }

      requestAnimationFrame(() => {
        toast.classList.remove("opacity-0", "translate-y-10");
        toast.classList.add("opacity-100", "translate-y-0");
      });

      setTimeout(() => {
        toast.classList.remove("opacity-100", "translate-y-0");
        toast.classList.add("opacity-0", "translate-y-10");
        toast.addEventListener("transitionend", () => toast.remove(), { once: true });
      }, duration);
    }

    document.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const erroLogin = urlParams.get('erro');
      if (erroLogin) {
        showToast(decodeURIComponent(erroLogin), 'error');
      }
      const statusMsgParam = urlParams.get('status');
      if (statusMsgParam) {
        let message = "";
        let type = "info";
        if (statusMsgParam === 'logout_success') {
          message = "Logout realizado com sucesso!"; type = "success";
        } else if (statusMsgParam === 'cadastro_sucesso_email_enviado') {
          message = "Cadastro realizado! Verifique seu e-mail."; type = "success";
        } else if (statusMsgParam === 'cadastro_sucesso') {
          message = "Cadastro realizado com sucesso!"; type = "success";
        }
        if (message) showToast(message, type, 5000);
      }
    });
  </script>
</body>

</html>