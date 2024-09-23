<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="w-8 sm:w-6 align-items-center justify-content-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            rgba(33, 150, 243, 0.4) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
          style="border-radius: 53px"
        >
          <img
            src="@/assets/svg/logo.svg"
            alt="TMT logo"
            class="mb-5 w-6rem flex-shrink-0"
          />
          <span class="text-blue-500 font-bold text-8xl">404</span>
          <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">
            {{ t("not_found") }}
          </h1>
          <router-link to="/" class="flex align-items-center py-5 border-300">
            <span
              class="flex justify-content-center align-items-center bg-cyan-400 border-round"
              style="height: 3.5rem; width: 3.5rem"
            >
              <i class="text-50 pi pi-fw pi-home text-2xl"></i>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="json">
{
  "meta": {
    "title": "not_found",
    "layout": "BlankLayout"
  }
}
</route>
