import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

axios.interceptors.request.use(
  function(config) {
    const token = store.state["auth"].token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(undefined, function(err) {
  return new Promise(function(resolve, reject) {
    if (
      (err.response.status === 401 || err.response.status === 403) &&
      err.response.config &&
      !err.response.config.__isRetryRequest &&
      store.getters["auth/isAuthenticated"]
    ) {
      store.commit("auth/logout");
    }
    reject(err);
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
