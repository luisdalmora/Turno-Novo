// tailwind.config.js
module.exports = {
  content: [
    "./*.{php,html,js}",
    "./templates/**/*.{php,html,js}", // <-- Adicionar esta linha
    "./src/**/*.{html,js,php}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "roboto-mono": ['"Roboto Mono"', "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
