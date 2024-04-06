import "@/assets/css/style.scss";

import { setupI18n } from "@/i18n";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router";

const app = createApp(App);
const i18n = setupI18n();

app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
