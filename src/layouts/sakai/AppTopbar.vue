<script setup lang="ts">
import { Logout } from "@/apis/auth/auth";
import router from "@/router";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import { useLayout } from "./composables/layout";

const { onMenuToggle } = useLayout();

const outsideClickListener = ref();
const topbarMenuActive = ref(false);

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};

const topbarMenuClasses = computed(() => {
  return {
    "layout-topbar-menu-mobile-active": topbarMenuActive.value
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event: any) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
};

const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener.value);
    outsideClickListener.value = null;
  }
};

const isOutsideClicked = (event: any) => {
  if (!topbarMenuActive.value) return;
  const sidebarEl = document.querySelector(".layout-topbar-menu");
  const topbarEl = document.querySelector(".layout-topbar-menu-button");
  return !(
    sidebarEl?.isSameNode(event.target) ||
    sidebarEl?.contains(event.target) ||
    topbarEl?.isSameNode(event.target) ||
    topbarEl?.contains(event.target)
  );
};

const op = ref();
const toggle = (event: any) => {
  op.value.toggle(event);
};

const logout = () => {
  Logout();
  router.push("/login");
};
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img src="@/assets/svg/logo.svg" alt="logo" />
      <span>Machine Trading</span>
    </router-link>

    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button class="p-link layout-topbar-button" @click="toggle">
        <i class="pi pi-user"></i>
        <span>{{ $t("user") }}</span>
        <OverlayPanel ref="op">
          <div class="flex flex-column gap-3 w-10rem">
            <div>
              <ul class="list-none p-0 m-0 flex flex-column gap-3">
                <button
                  text
                  class="p-link layout-topbar-button"
                  @click="logout"
                >
                  <li class="flex align-items-center gap-2">
                    <div>
                      <span class="font-medium">{{ $t("logout") }}</span>
                    </div>
                    <div
                      class="flex align-items-center gap-2 text-color-secondary ml-auto text-sm"
                    >
                      <i class="pi pi-sign-out"></i>
                    </div>
                  </li>
                </button>
              </ul>
            </div>
          </div>
        </OverlayPanel>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
