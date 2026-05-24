import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      "/api": {
        target: "https://sanlumiere.in",
        changeOrigin: true,
        secure: false,
      },

      "/products": {
        target: "https://sanlumiere.in",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});