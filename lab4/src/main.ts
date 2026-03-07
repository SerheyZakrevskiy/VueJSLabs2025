import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import { i18n, syncLocaleWithSettings } from "./i18n";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
syncLocaleWithSettings(pinia);

app.use(i18n);
app.use(router);

app.mount("#app");
