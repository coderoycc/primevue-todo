import { createApp } from "vue";
import store from "./store";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import App from "./App.vue";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import ConfirmPopup from "primevue/confirmationservice";
import router from "./router";
import "@assets/index.css";
import "@assets/tailwind.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.directive("tooltip", Tooltip);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".app-dark",
    },
  },
});
app.use(ToastService);
app.use(ConfirmPopup);

app.mount("#app");
