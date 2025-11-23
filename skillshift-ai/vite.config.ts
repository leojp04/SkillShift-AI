import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ia-api": {
        target: "https://skillshift-ai-platform.onrender.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/ia-api/, ""),
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
