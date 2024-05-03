import { Refresh } from "@/apis/auth/auth";
import { i18n } from "@/i18n";
import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import generatedRoutes from "~pages";

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

const locale = i18n.global.tm;

router.beforeEach(async (to) => {
  let valid = false;
  try {
    valid = await Refresh();
  } catch {
    valid = false;
  }

  const title: string = to.meta.title as string;
  if (title) {
    document.title = `TMT - ${locale(title)}`;
  }

  if (!valid) {
    if (to.meta.auth) {
      return "/login";
    }
  } else {
    if (to.path === "/login") {
      return "/";
    }
  }
});

export default router;
