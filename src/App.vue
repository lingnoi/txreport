<template>
  <v-app id="app" v-model="creds">
    <v-app-bar app clipped-left>
      <v-toolbar-title>Tx Report</v-toolbar-title>
      <v-text-field
        label="API-ID"
        name="apiid"
        prepend-icon="mdi-identifier"
        type="text"
        v-model="creds.apiId"
      ></v-text-field>

      <v-text-field
        id="password"
        label="API-Key"
        name="apikey"
        prepend-icon="mdi-key"
        type="password"
        v-model="creds.apiKey"
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
        apiId: "",
        apiKey: ""
      }
    };
  },
  methods: {
    async loadData() {
      if (this.creds.apiId && this.creds.apiKey) {
        const data = await getOrderHistory(this.creds.apiId, this.creds.apiKey);
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
