// public/js/modules/tooltipManager.js
let tooltipElement;

function createTooltipElement() {
  if (!tooltipElement) {
    tooltipElement = document.createElement("div");
    tooltipElement.id = "dynamic-tooltip"; // ID para o elemento tooltip
    // Usa a classe base definida no CSS
    tooltipElement.classList.add("custom-tooltip-base");
    document.body.appendChild(tooltipElement);
  }
}

function showTooltip(event) {
  const target = event.currentTarget;
  const tooltipText = target.getAttribute("data-tooltip-text");

  if (!tooltipText || !tooltipElement) return;

  tooltipElement.textContent = tooltipText;
  tooltipElement.classList.add("visible"); // Usa a classe 'visible' do CSS
  positionTooltip(event);
}

function hideTooltip() {
  if (!tooltipElement) return;
  tooltipElement.classList.remove("visible");
}

function positionTooltip(event) {
  if (!tooltipElement || !tooltipElement.classList.contains("visible")) return;

  const targetRect = event.currentTarget.getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();
  const spacing = 10; // Espaço entre o elemento e o tooltip

  let top = targetRect.bottom + spacing;
  let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;

  // Ajustar para não sair da tela na vertical
  if (top + tooltipRect.height > window.innerHeight) {
    top = targetRect.top - tooltipRect.height - spacing; // Posiciona acima
  }

  // Ajustar para não sair da tela na horizontal
  if (left < spacing) {
    left = spacing;
  } else if (left + tooltipRect.width > window.innerWidth - spacing) {
    left = window.innerWidth - tooltipRect.width - spacing;
  }

  tooltipElement.style.left = `${left}px`;
  tooltipElement.style.top = `${top}px`;
}

export function initTooltips() {
  createTooltipElement();

  const elementsWithTooltip = document.querySelectorAll("[data-tooltip-text]");
  elementsWithTooltip.forEach((element) => {
    // Remove eventuais listeners antigos para evitar duplicação se initTooltips for chamado múltiplas vezes
    element.removeEventListener("mouseenter", showTooltip);
    element.removeEventListener("mouseleave", hideTooltip);
    element.removeEventListener("mousemove", positionTooltip); // Para seguir o mouse mais de perto ao mostrar

    element.addEventListener("mouseenter", showTooltip);
    element.addEventListener("mouseleave", hideTooltip);
    // Opcional: Mover o tooltip com o mouse enquanto ele estiver sobre o elemento.
    // Para um tooltip fixo relativo ao elemento, o mousemove no elemento não é estritamente necessário
    // após o posicionamento inicial no mouseenter, mas pode ajudar se o conteúdo da página mudar.
    // Por performance, podemos chamar positionTooltip apenas no mouseenter.
    // element.addEventListener("mousemove", positionTooltip);
  });
  console.log(
    `Tooltips inicializados para ${elementsWithTooltip.length} elementos.`
  );
}
