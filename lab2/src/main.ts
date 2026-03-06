import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { getUser } from "@/services/auth";

const app = createApp(App);

app.provide("auth_user", getUser());

app.use(router).mount("#app");
