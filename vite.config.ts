import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import Vue from "@vitejs/plugin-vue";
import ViteFonts from "unplugin-fonts/vite";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineConfig({
  plugins: [
    Layouts(),
    Pages(),
    Components({
      resolvers: [VuetifyResolver()],
      globs: [] // don't scan for components
    }),
    Vue({
      template: { transformAssetUrls }
    }),
    Vuetify(),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900"
          }
        ]
      }
    })
  ],
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
