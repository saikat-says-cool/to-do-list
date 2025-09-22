import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    dyadComponentTagger(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "placeholder.svg"],
      manifest: {
        name: "Todo & Notes App",
        short_name: "TodoNotes",
        description: "A simple app for managing todos and notes.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "placeholder.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "placeholder.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));