import Vue from "vue";
import VueRouter from "vue-router";
import Info from "../views/Info.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Info",
    component: Info,
    meta: { show: true },
  },
  {
    path: "/table",
    name: "Table",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Table.vue"),
    meta: { show: true },
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("../views/Map.vue"),
    meta: { show: true },
  },
  {
    path: "/resources",
    name: "Resources",
    component: () => import("../views/Resources.vue"),
    meta: { show: true },
  },
  {
    path: "/forecast",
    name: "Forecast",
    component: () => import("../views/Forecast.vue"),
    meta: { show: true },
  },
  {
    path: "/accompany",
    name: "Accompany",
    component: () => import("../views/Accompany.vue"),
    meta: { show: true },
  },
  {
    path: "/staging",
    name: "Staging",
    component: () => import("../views/Staging.vue"),
    meta: { show: true },
  },
  {
    path: "/exploration",
    name: "Exploration",
    component: () => import("../views/Exploration.vue"),
    meta: { show: true },
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/404.vue"),
    meta: { show: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
    meta: { show: false },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    meta: { show: true, admin: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
    meta: { show: false },
  },
  {
    path: "/bascet",
    name: "Bascet",
    component: () => import("../views/Bascet.vue"),
    meta: { show: false },
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
