import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import webExtension from "vite-plugin-web-extension";

export default defineConfig(() => {
  return {
    root: "src",
    publicDir: path.resolve(import.meta.dirname, "public"),
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
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