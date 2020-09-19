import Vue from "vue";

import {
  MdButton,
  MdContent,
  MdCard,
  MdTable
} from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";

import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdCard);
Vue.use(MdTable);

new Vue({
  render: (h) => h(App)
}).$mount("#app");
