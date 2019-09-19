import Vue from "vue";
import App from "./App.vue";

import { store } from "./store/";
// import {router} from './routes.js';

// import VueResource from 'vue-resource';

// Vue.use(VueResource);
// Vue.http.options.root = 'http://js.dmitrylavrik.ru/api/'

new Vue({
  el: "#app",
  store,
  // router,
  render: h => h(App)
});

import "../css/main.min.css";

navigator.serviceWorker.register("./service-worker.js");

let deferredPrompt;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  store.commit("setInstallPrompt", e);
});
