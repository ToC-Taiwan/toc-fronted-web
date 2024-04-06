import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import Vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

export default defineConfig({
  plugins: [Layouts(), Pages(), Components(), Vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    proxy: {
      "/tmt": {
        target: "http://localhost:26670",
        ws: true
      }
    }
  }
});
