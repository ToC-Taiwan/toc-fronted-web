<script setup lang="ts">
import type { PropType } from "vue";
import { onBeforeMount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import { useLayout } from "./composables/layout";
import { type MenuItem } from "./types/menu";

const { t } = useI18n();
const route = useRoute();

const { layoutConfig, layoutState, setActiveMenuItem, onMenuToggle } =
  useLayout();

const props = defineProps({
  item: {
    type: Object as PropType<MenuItem>,
    required: true
  },
  index: {
    type: Number,
    default: 0
  },
  root: {
    type: Boolean,
    default: true
  },
  parentItemKey: {
    type: String,
    default: null
  }
});

const isActiveMenu = ref(false);
const itemKey = ref("");

onBeforeMount(() => {
  itemKey.value = props.parentItemKey
    ? props.parentItemKey + "-" + props.index
    : String(props.index);

  const activeItem = layoutConfig.activeMenuItem;

  isActiveMenu.value =
    activeItem.value === itemKey.value || activeItem
      ? activeItem.value.startsWith(itemKey.value + "-")
      : false;
});

watch(
  () => layoutConfig.activeMenuItem.value,
  (newVal) => {
    isActiveMenu.value =
      newVal === itemKey.value || newVal.startsWith(itemKey.value + "-");
  }
);

const itemClick = (event: MouseEvent, item: MenuItem) => {
  if (item.disabled) {
    event.preventDefault();
    return;
  }

  const { overlayMenuActive, staticMenuMobileActive } = layoutState;

  if (
    (item.to || item.url) &&
    (staticMenuMobileActive.value || overlayMenuActive.value)
  ) {
    onMenuToggle();
  }

  // if (item.command) {
  //   item.command({ originalEvent: event, item: item });
  // }

  const foundItemKey = item.items
    ? isActiveMenu.value
      ? props.parentItemKey
      : itemKey
    : itemKey.value;

  setActiveMenuItem(foundItemKey);
};

const checkActiveRoute = (item: MenuItem) => {
  return route.path === item.to;
};
</script>

<template>
  <li
    :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }"
  >
    <div
      v-if="root && item.visible !== false"
      class="layout-menuitem-root-text"
    >
      {{ t(item.label ? item.label : "unknown") }}
    </div>

    <a
      v-if="(!item.to || item.items) && item.visible !== false"
      :href="item.url"
      :class="item.class"
      :target="item.target"
      tabindex="0"
      @click="itemClick($event, item)"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{
        t(item.label ? item.label : "unknown")
      }}</span>
      <i
        v-if="item.items"
        class="pi pi-fw pi-angle-down layout-submenu-toggler"
      ></i>
    </a>

    <router-link
      v-if="item.to && !item.items && item.visible !== false"
      :class="[item.class, { 'active-route': checkActiveRoute(item) }]"
      tabindex="0"
      :to="item.to"
      @click="itemClick($event, item)"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{
        t(item.label ? item.label : "unknown")
      }}</span>
      <i
        v-if="item.items"
        class="pi pi-fw pi-angle-down layout-submenu-toggler"
      ></i>
    </router-link>

    <Transition
      v-if="item.items && item.visible !== false"
      name="layout-submenu"
    >
      <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
        <app-menu-item
          v-for="(child, i) in item.items"
          :key="child.label + String(i)"
          :index="i"
          :item="child"
          :parent-item-key="itemKey"
          :root="false"
        ></app-menu-item>
      </ul>
    </Transition>
  </li>
</template>

<style lang="scss" scoped></style>
