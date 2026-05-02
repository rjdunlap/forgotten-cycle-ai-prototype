import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/forgotten-cycle-ai-prototype/",
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  }
});
