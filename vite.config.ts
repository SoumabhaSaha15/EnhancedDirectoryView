import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import webExtension from "vite-plugin-web-extension";
// "<all_urls>"
export default defineConfig(() => {
  return {
    root: "src",
    publicDir: path.resolve(__dirname, "public"),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },
    plugins: [
      tailwindcss(),
      webExtension({
        manifest: "manifest.json",
      }),
    ],
  };
});