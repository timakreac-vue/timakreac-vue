import Vue from "vue";
import App from "./App.vue";
import "../css/main.min.css";

import { store } from "./store/";
import { router } from "./routes.js";

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});

navigator.serviceWorker.register("/service-worker.js");

let deferredPrompt;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  store.commit("setInstallPrompt", e);
});
