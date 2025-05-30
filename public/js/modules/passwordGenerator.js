// public/js/modules/passwordGenerator.js
import { showGlobalToast } from "./utils.js"; // Usaremos a global

export function initPasswordGeneratorModal() {
  console.log("Password Generator Modal Logic Initialized");

  // Lógica para o gerador de senhas fortes (o original)
  const pgSenhaGeradaInput = document.getElementById("pg-senhaGerada");
  const pgGerarSenhaBtn = document.getElementById("pg-gerarSenhaBtn"); // Botão "Gerar Nova" (forte)
  const pgCopiarSenhaBtn = document.getElementById("pg-copiarSenhaBtn"); // Botão copiar da senha forte
  const pgComprimentoInput = document.getElementById("pg-comprimento");
  const pgComprimentoValor = document.getElementById("pg-comprimentoValor");
  const pgIncluirMaiusculasInput = document.getElementById(
    "pg-incluirMaiusculas"
  );
  const pgIncluirNumerosInput = document.getElementById("pg-incluirNumeros");
  const pgIncluirSimbolosInput = document.getElementById("pg-incluirSimbolos");
  const pgForcaSenhaDiv = document.getElementById("pg-forcaSenha");
  const caracteres = {
    minusculas: "abcdefghijklmnopqrstuvwxyz",
    maiusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numeros: "0123456789",
    simbolos: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  function avaliarForcaSenhaForte(senha) {
    if (!pgForcaSenhaDiv) return;
    let forca = 0;
    if (senha.length >= 8) forca++;
    if (senha.length >= 12) forca++;
    if (/[A-Z]/.test(senha)) forca++;
    if (/[0-9]/.test(senha)) forca++;
    if (/[^A-Za-z0-9]/.test(senha)) forca++;
    let textoForca = "",
      corForca = "text-slate-500";
    switch (forca) {
      case 0:
      case 1:
        textoForca = "Muito Fraca";
        corForca = "text-red-500";
        break;
      case 2:
        textoForca = "Fraca";
        corForca = "text-orange-500";
        break;
      case 3:
        textoForca = "Média";
        corForca = "text-yellow-600";
        break;
      case 4:
        textoForca = "Forte";
        corForca = "text-green-500";
        break;
      case 5:
        textoForca = "Muito Forte";
        corForca = "text-emerald-600";
        break;
    }
    pgForcaSenhaDiv.textContent = `Força: ${textoForca}`;
    pgForcaSenhaDiv.className = `text-sm mt-2 h-6 ${corForca} font-medium`;
  }

  function gerarSenhaForte() {
    if (
      !pgComprimentoInput ||
      !pgIncluirMaiusculasInput ||
      !pgIncluirNumerosInput ||
      !pgIncluirSimbolosInput ||
      !pgSenhaGeradaInput
    )
      return;
    const comp = parseInt(pgComprimentoInput.value);
    let ch = caracteres.minusculas;
    if (pgIncluirMaiusculasInput.checked) ch += caracteres.maiusculas;
    if (pgIncluirNumerosInput.checked) ch += caracteres.numeros;
    if (pgIncluirSimbolosInput.checked) ch += caracteres.simbolos;
    let s = "";
    for (let i = 0; i < comp; i++)
      s += ch.charAt(Math.floor(Math.random() * ch.length));
    pgSenhaGeradaInput.value = s;
    avaliarForcaSenhaForte(s);
  }

  function copiarSenhaForte() {
    if (!pgSenhaGeradaInput) return;
    const s = pgSenhaGeradaInput.value;
    if (s)
      navigator.clipboard
        .writeText(s)
        .then(() => showGlobalToast("Senha copiada!", "success"))
        .catch((err) => showGlobalToast("Erro ao copiar.", "error"));
    else showGlobalToast("Gere uma senha forte primeiro.", "info");
  }

  if (pgComprimentoInput && pgComprimentoValor)
    pgComprimentoInput.addEventListener("input", () => {
      pgComprimentoValor.textContent = pgComprimentoInput.value;
      gerarSenhaForte();
    });
  [
    pgIncluirMaiusculasInput,
    pgIncluirNumerosInput,
    pgIncluirSimbolosInput,
  ].forEach((i) => {
    if (i) i.addEventListener("change", gerarSenhaForte);
  });
  if (pgGerarSenhaBtn)
    pgGerarSenhaBtn.addEventListener("click", gerarSenhaForte);
  if (pgCopiarSenhaBtn)
    pgCopiarSenhaBtn.addEventListener("click", copiarSenhaForte);
  if (pgSenhaGeradaInput && !pgSenhaGeradaInput.value) gerarSenhaForte();
  else if (pgSenhaGeradaInput && pgSenhaGeradaInput.value)
    avaliarForcaSenhaForte(pgSenhaGeradaInput.value);

  // Lógica para o gerador de senhas por data/hora (o que você pediu para corrigir)
  const senhaPayBtnNew = document.getElementById("senhaPayBtn");
  const senhaAutomacaoBtnNew = document.getElementById("senhaAutomacaoBtn");
  const senhaGeradaContainerNew = document.getElementById(
    "senhaGeradaContainer"
  );
  const senhaGeradaDisplayNew = document.getElementById("senhaGeradaDisplay");
  const copiarSenhaBtnModalNew = document.getElementById("copiarSenhaBtnModal"); // ID ajustado para ser único
  let timerOcultarSenhaNew;

  function gerarSenhaDataHora(automacao) {
    clearTimeout(timerOcultarSenhaNew);
    const dataAtual = new Date();
    let valorSenhaCalculado =
      dataAtual.getFullYear() -
      (dataAtual.getMonth() + 1) -
      dataAtual.getDate() -
      dataAtual.getHours();
    if (!automacao) valorSenhaCalculado -= 3;

    if (senhaGeradaDisplayNew && senhaGeradaContainerNew) {
      senhaGeradaDisplayNew.textContent = "Senha: " + valorSenhaCalculado;
      senhaGeradaContainerNew.classList.remove("hidden");
    }
    showGlobalToast("Senha (data/hora) gerada com sucesso!", "success", 3000);
    timerOcultarSenhaNew = setTimeout(() => {
      if (senhaGeradaContainerNew)
        senhaGeradaContainerNew.classList.add("hidden");
    }, 5000);
  }
  if (senhaPayBtnNew)
    senhaPayBtnNew.addEventListener("click", () => gerarSenhaDataHora(false));
  if (senhaAutomacaoBtnNew)
    senhaAutomacaoBtnNew.addEventListener("click", () =>
      gerarSenhaDataHora(true)
    );
  if (copiarSenhaBtnModalNew && senhaGeradaDisplayNew) {
    copiarSenhaBtnModalNew.addEventListener("click", () => {
      const txt = senhaGeradaDisplayNew.textContent;
      if (txt && txt.includes("Senha: ")) {
        const val = txt.replace("Senha: ", "").trim();
        navigator.clipboard
          .writeText(val)
          .then(() => showGlobalToast(`Senha "${val}" copiada!`, "success"))
          .catch((err) => showGlobalToast("Erro ao copiar.", "error"));
      } else
        showGlobalToast(
          "Nenhuma senha (data/hora) gerada para copiar.",
          "warning"
        );
    });
  }
}
