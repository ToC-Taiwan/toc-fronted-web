import { type Ref, computed, reactive, toRefs } from "vue";

interface LayoutConfig {
  menuMode: string;
  activeMenuItem: string;
}

const layoutConfig = reactive<LayoutConfig>({
  menuMode: "static",
  activeMenuItem: ""
});

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false
});

export function useLayout() {
  const setActiveMenuItem = (item: string | Ref<string>) => {
    if (typeof item === "string") {
      layoutConfig.activeMenuItem = item;
    } else {
      layoutConfig.activeMenuItem = item.value;
    }
  };

  const onMenuToggle = () => {
    if (layoutConfig.menuMode === "overlay") {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive =
        !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  };

  const isSidebarActive = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  );

  return {
    layoutConfig: toRefs(layoutConfig),
    layoutState: toRefs(layoutState),
    onMenuToggle,
    isSidebarActive,
    setActiveMenuItem
  };
}
