import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // chemins relatifs -> deployable partout (Netlify, Vercel, GitHub Pages, sous-dossier)
  build: {
    target: "es2020",
    sourcemap: false,
  },
});
