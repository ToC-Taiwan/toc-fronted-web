<script setup lang="ts">
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";
import { type MenuItem } from "./types/menu";

const model = ref<MenuItem[]>([
  {
    label: "realtime",
    items: [
      {
        label: "future",
        icon: "pi pi-fw pi-slack",
        to: "/realtime/future"
      }
    ]
  },
  {
    label: "basic",
    items: [
      {
        label: "stocks_data",
        icon: "pi pi-fw pi-wallet",
        to: "/basic/stocks"
      }
    ]
  }
]);
</script>

<template>
  <ul class="layout-menu">
    <div v-for="(item, i) in model" :key="item.label">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </div>
  </ul>
</template>

<style lang="scss" scoped></style>
