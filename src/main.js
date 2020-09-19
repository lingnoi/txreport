import Vue from "vue";
import vuetify from "./vuetify";

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  el: "#app",
  components: { App },
  template: "<App/>"
});
