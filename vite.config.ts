import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import webExtension from "vite-plugin-web-extension";

export default defineConfig(() => {
  return {
    root: "src",
    publicDir: path.resolve("public"),
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    build: {
      outDir: path.resolve("dist"),
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