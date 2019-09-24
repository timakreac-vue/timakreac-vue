import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Games from "./components/Games";
import Genres from "./components/Genres";
import Card from "./components/Card";
import E404 from "./components/E404";

const routes = [
  { path: "/", redirect: { name: "genres" } },
  { path: "/games/:genre", component: Games },
  { path: "/games/:genre/:id", component: Card },
  { name: "genres", path: "/genres", component: Genres },
  { path: "*", component: E404 }
];

export const router = new VueRouter({
  routes,
  mode: "history"
});
