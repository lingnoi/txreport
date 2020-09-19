import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import vuetify from "./vuetify"; // path to vuetify export

import App from "./App.vue";
import Login from "../components/Login.vue";
import Records from "../components/Records.vue";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
  state: {
    token: ""
  },
  mutations: {
    setAuthentication(state, status) {
      state.token = status;
    }
  }
});

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: {
        name: "login"
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/records",
      name: "records",
      component: Records,
      beforeEnter: (to, from, next) => {
        if (store.state.token !== "") {
          next();
        } else {
          next("/login");
        }
      }
    }
  ]
});

new Vue({
  vuetify,
  store: store,
  router: router,
  el: "#app",
  components: { App },
  template: "<App/>"
});
