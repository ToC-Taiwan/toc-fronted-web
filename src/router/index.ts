import { Refresh } from "@/apis/auth/auth";
import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import generatedRoutes from "~pages";

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to) => {
  let valid = false;
  try {
    valid = await Refresh();
  } catch {
    valid = false;
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
