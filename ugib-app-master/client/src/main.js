import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./scss/main.scss";
import vuetify from "./plugins/vuetify";

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.config.devtools = false;

new Vue({
  eventBus,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
