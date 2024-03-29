import Vue from "vue";
import App from "./App.vue";
import "./plugins/vuetify";
import router from "./router";
import store from "./store";

import "./plugins/axios";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
