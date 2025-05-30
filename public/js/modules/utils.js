// public/js/modules/utils.js
export function showGlobalToast(message, type = "info", duration = 3500) {
  const existingToast = document.getElementById("toast-notification-global");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.id = "toast-notification-global";

  let bgColor = "bg-sky-500";
  let iconName = "info";

  if (type === "success") {
    bgColor = "bg-green-500";
    iconName = "check-circle";
  } else if (type === "error") {
    bgColor = "bg-red-500";
    iconName = "x-circle";
  } else if (type === "warning") {
    bgColor = "bg-yellow-500 text-slate-800";
    iconName = "alert-triangle";
  }

  toast.className = `fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-xl text-white text-sm font-medium z-[1070] flex items-center ${bgColor} transition-all duration-300 ease-out opacity-0 translate-y-10`;
  toast.innerHTML = `<i data-lucide="${iconName}" class="w-5 h-5 mr-2"></i><span>${message}</span>`;
  document.body.appendChild(toast);

  if (typeof lucide !== "undefined") {
    lucide.createIcons({ nodes: [toast.querySelector("i[data-lucide]")] });
  }

  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "translate-y-10");
    toast.classList.add("opacity-100", "translate-y-0");
  });

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-10");
    toast.addEventListener("transitionend", () => toast.remove(), {
      once: true,
    });
  }, duration);
}

// Poderíamos adicionar outras funções utilitárias aqui no futuro, como:
// export function formatDate(dateString) { /* ... */ }
// export function debounce(func, delay) { /* ... */ }
