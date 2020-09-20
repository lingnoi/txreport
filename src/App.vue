<template>
  <v-app id="app" v-model="creds">
    <v-app-bar app clipped-left>
      <v-toolbar-title>Tx Report</v-toolbar-title>
      <v-text-field
        id="password"
        label="Token"
        name="token"
        prepend-icon="mdi-key"
        type="password"
        v-model="creds.token"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn raised @click="loadData()">Load Data</v-btn>
    </v-app-bar>

    <v-main></v-main>
  </v-app>
</template>

<script>
import { getOrderHistory } from "./services/order-history";

export default {
  name: "App",
  data() {
    return {
      creds: {
        token: ""
      }
    };
  },
  methods: {
    async loadData() {
      if (this.creds.token && this.creds.token !== "") {
        var data = {};
        const response = await getOrderHistory(
          this.creds.token,
          1,
          99999,
          false
        );
        data = await response.json();
        console.log(data);
      } else {
        console.log("invalid creds!");
      }
    }
  }
};
</script>

<style>
#app {
  margin-top: 60px;
  margin-left: 30px;
  margin-right: 30px;
}
</style>
