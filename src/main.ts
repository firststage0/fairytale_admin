import App from "@/App.vue";
import router from "@/router/index";
import { createPinia } from "pinia";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "./style.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.mount("#app");
