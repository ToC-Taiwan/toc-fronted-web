import "./assets/css/main.scss";

import { registerPlugins } from "@/plugins";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router";

const app = createApp(App);

registerPlugins(app);

app.use(createPinia());
app.use(router);

app.mount("#app");
