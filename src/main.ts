import App from "@/App.vue";
import "@/assets/css/styles.scss";
import { firebaseApp } from "@/firebase";
import { i18n } from "@/i18n";
import router from "@/router";
import { registerLicense } from "@syncfusion/ej2-base";
import { ChartPlugin } from "@syncfusion/ej2-vue-charts";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import { createApp } from "vue";
import { VueFire } from "vuefire";

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE);
createApp(App)
  .use(createPinia())
  .use(VueFire, { firebaseApp })
  .use(ChartPlugin)
  .use(router)
  .use(i18n)
  .use(PrimeVue)
  .use(ToastService)
  .mount("#app");
