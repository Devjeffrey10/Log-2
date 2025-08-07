import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared", "./server"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to handle API routes before Vite's SPA fallback
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          console.log(`API request: ${req.method} ${req.url}`);
          // Strip /api prefix and ensure we have a valid path
          const apiPath = req.url.replace('/api', '') || '/';

          // Create a new request object with the modified URL
          const newReq = Object.assign(req, { url: apiPath });

          return app(newReq, res, next);
        }
        next();
      });
    },
  };
}
