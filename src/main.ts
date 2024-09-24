import App from "@/App.vue";
import "@/assets/css/styles.scss";
import firebaseApp from "@/firebase";
import { i18n } from "@/i18n";
import router from "@/router";
import { registerLicense } from "@syncfusion/ej2-base";
import { ChartPlugin } from "@syncfusion/ej2-vue-charts";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import { createApp } from "vue";
import { VueFire } from "vuefire";

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE);

const app = createApp(App);
app.use(createPinia());
app.use(ChartPlugin);
app.use(router);
app.use(i18n);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);

if (import.meta.env.PROD) {
  app.use(VueFire, { firebaseApp });
} else {
  /* eslint no-console: "off" */
  console.debug("VueFire is not available in development mode.");
}

app.directive("ripple", Ripple);
app.directive("tooltip", Tooltip);

app.mount("#app");
