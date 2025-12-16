import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Server configuration only applies in development
  server: {
    host: true, // listen on all interfaces
    port: 5173,
    strictPort: false,
    allowedHosts: [
      ".ngrok-free.app", // allow all ngrok URLs
    ],
    origin: "http://localhost:5173", // optional, helps Vite accept external requests
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    // Let Vite handle all dependencies automatically
  },
  build: {
    chunkSizeWarningLimit: 1000,
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    // Let Vite handle chunking automatically to avoid initialization order issues
    // Vite's automatic chunking respects module initialization order
  },
});
