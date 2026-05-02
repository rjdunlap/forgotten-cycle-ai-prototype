/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,js}"],
  theme: {
    extend: {
      colors: {
        ember: {
          bg: "#101410",
          panel: "#1c241d",
          "panel-strong": "#253026",
          text: "#f4f0e5",
          muted: "#b8b19f",
          line: "#3a493d",
          accent: "#d6a84f",
          "accent-strong": "#f0c86a",
          red: "#c56b58"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};
