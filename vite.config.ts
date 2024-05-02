import Vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "node:url";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

const routesWithoutAuth = ["/login"];

function manualChunks(id: string) {
  if (id.includes("node_modules")) {
    const regex = /node_modules\/([^/]+)\//;
    const match = id.match(regex);
    if (match && match[1]) {
      if (match[1].includes("@")) {
        return match[1].split("@")[1];
      }
      return match[1];
    }
    return "vendor";
  }
}

export default defineConfig({
  plugins: [
    Vue(),
    Pages({
      extendRoute: (route) => {
        if (routesWithoutAuth.includes(route.path)) {
          return route;
        }
        if (!route.meta) route.meta = {};
        route.meta.auth = true;
        return route;
      },
      dirs: "src/pages",
      routeBlockLang: "json"
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
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    proxy: {
      "/tmt": {
        target: "http://localhost:26670"
      },
      "/tmt/v1/stream/ws": {
        target: "ws://localhost:26670",
        ws: true
      },
      "/tmt/v1/targets/ws": {
        target: "ws://localhost:26670",
        ws: true
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: manualChunks
      }
    }
  }
});
