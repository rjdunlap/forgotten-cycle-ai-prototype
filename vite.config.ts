import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  }
});
