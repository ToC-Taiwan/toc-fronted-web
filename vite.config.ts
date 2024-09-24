import Vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "node:url";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

const manualChunks = (id: string) => {
  if (id.includes("node_modules")) {
    const regex = /node_modules\/.pnpm\/([^/]+)\//;
    const match = id.match(regex);
    let name;
    if (match && match[1]) {
      if (match[1].startsWith("@")) {
        name = match[1].split("@")[1];
      } else if (match[1].includes("@")) {
        name = match[1].split("@")[0];
      }
    }
    if (name && name.length > 0) {
      return "vendors".concat("-", name);
    }
    return "vendors";
  }
};

const defaultHostname = "localhost";
const defaultHostPort = "26670";
const defaultHost = `${defaultHostname}:${defaultHostPort}`;

export default defineConfig({
  plugins: [
    Vue(),
    Pages({
      extendRoute: (route) => {
        const path = route.path as string;
        if (path === "/login" || path.startsWith("/user/verify")) {
          return route;
        }
        if (!route.meta) route.meta = {};
        route.meta.auth = true;
        return route;
      },
      dirs: "src/pages",
      routeBlockLang: "json",
      resolver: "vue"
    }),
    Layouts({
      layoutsDirs: "src/layouts",
      pagesDirs: "src/pages",
      defaultLayout: "SakaiLayout"
    }),
    Components({
      dts: true,
      resolvers: [PrimeVueResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern"
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    proxy: {
      "/tmt": {
        target: `http://${defaultHost}`
      },
      "/tmt/v1/stream/ws": {
        target: `ws://${defaultHost}`,
        ws: true
      },
      "/tmt/v1/targets/ws": {
        target: `ws://${defaultHost}`,
        ws: true
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 768,
    rollupOptions: {
      output: {
        hashCharacters: "base36",
        manualChunks: manualChunks
      }
    }
  }
});
