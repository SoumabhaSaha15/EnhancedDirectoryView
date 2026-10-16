import path from "path";
import { defineConfig, lazyPlugins } from "vite-plus";
import zip from "vite-plugin-zip-pack";
import tailwindcss from "@tailwindcss/vite";
import webExtension from "vite-plugin-web-extension";
import pkg from "./package.json" with { type: "json" };

export default defineConfig(() => {
  return {
    staged: {
      "*": "vp check --fix",
    },
    fmt: {},
    lint: {
      jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
      rules: { "vite-plus/prefer-vite-plus-imports": "error" },
      options: { typeAware: true, typeCheck: true },
    },
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
    plugins: lazyPlugins(() => [
      tailwindcss(),
      webExtension({ manifest: "manifest.json" }),
      zip({ outDir: "release", outFileName: `${pkg.name}-${pkg.version}.zip` }),
    ]),
  };
});
