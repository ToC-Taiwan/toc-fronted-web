import "./assets/css/main.scss";

import { setupI18n } from "@/i18n";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { createVuetify } from "vuetify";

import App from "@/App.vue";
import router from "@/router";

const app = createApp(App);
const vuetify = createVuetify({});
const i18n = setupI18n();

app.use(createPinia());
app.use(vuetify);
app.use(router);
app.use(i18n);

app.mount("#app");
