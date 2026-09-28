import path from "path";
import { defineConfig } from "vite";
import zip from 'vite-plugin-zip-pack';
import tailwindcss from "@tailwindcss/vite";
import webExtension from "vite-plugin-web-extension";
import pkg from "./package.json" with {type:"json"};

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
      zip({ outDir: 'release', outFileName: `${pkg.name}-${pkg.version}.zip` }),
    ],
  };
});