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
    rollupOptions: {
      output: {
        // Simplified chunking strategy to avoid initialization order issues
        manualChunks: (id) => {
          // Only split vendor code, let Vite handle the rest automatically
          if (id.includes('node_modules')) {
            // Keep React and React DOM together to avoid circular dependencies
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            
            // Keep large UI libraries separate
            if (id.includes('antd')) {
              return 'antd';
            }
            
            // Keep chart libraries together
            if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
              return 'charts';
            }
            
            // All other node_modules go into a single vendor chunk
            // This prevents circular dependency issues
            return 'vendor';
          }
        },
      },
    },
  },
});
