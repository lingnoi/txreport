<template>
  <v-app id="app" v-model="creds">
    <v-app-bar app clipped-left color="blue-grey">
      <v-toolbar-title>Tx Report</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn raised @click="loadData()">Load Data</v-btn>
    </v-app-bar>

    <v-main>
      <v-card>
        <v-card-title>Records
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="records" :search="search">
          <template
            v-slot:item.ordertime="{ item }"
          >{{ (item.ordertime && item.ordertime!=="")?item.ordertime:item.pendingTime }}</template>
          <template v-slot:item.direction="{ item }">
            <v-icon
              :color="getDirectionColor(item.direction)"
              dark
            >{{ item.direction===0?"mdi-arrow-up":"mdi-arrow-down" }}</v-icon>
          </template>
          <template v-slot:item.amount="{ item }">{{ floor2(item.amount) }}</template>
          <template v-slot:item.positions="{ item }">{{ floor2(item.positions) }}</template>
          <template v-slot:item.charge="{ item }">{{ floor2(item.charge) }}</template>
          <template v-slot:item.interest="{ item }">{{ floor2(item.interest) }}</template>
          <template v-slot:item.profit="{ item }">{{ floor2(item.profit) }}</template>
          <template v-slot:item.netprofit="{ item }">
            <v-chip
              :color="getPLColor(item.profit-item.charge-item.interest)"
              dark
            >{{ item.netprofit=floor2(item.profit-item.charge-item.interest) }}</v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-main>
    <v-footer app color="blue-grey" class="white--text">
      <v-text-field
        id="password"
        label="Token"
        name="token"
        prepend-icon="mdi-key"
        type="password"
        v-model="creds.token"
      ></v-text-field>
      <v-spacer></v-spacer>
      <span>&copy; by lingnoi {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { getOrderHistory } from "./services/order-history";

export default {
  name: "App",
  data() {
    return {
      search: "",
      creds: {
        token: ""
      },
      headers: [
        {
          text: "OrderId",
          align: "start",
          sortable: false,
          value: "code"
        },
        { text: "OpenTime", value: "ordertime" },
        { text: "CloseTime", value: "overtime" },
        { text: "ContractName", value: "currencyname" },
        { text: "Long/Short", value: "direction" },
        { text: "Invested", value: "amount" },
        { text: "PositionSize", value: "positions" },
        { text: "Transaction Fee", value: "charge" },
        { text: "Over-night Fee", value: "interest" },
        { text: "Open", value: "strikeprice" },
        { text: "Close", value: "settlement" },
        { text: "P/L", value: "profit" },
        { text: "Net P/L", value: "netprofit" }
      ],
      records: []
    };
  },
  methods: {
    floor2(val) {
      return (Math.floor(val * 100) / 100).toFixed(2);
    },
    getDirectionColor(val) {
      if (val === 0) return "green";
      return "red";
    },
    getPLColor(val) {
      if (val > 0) return "green";
      else if (val < 0) return "red";
      return "grey";
    },
    async loadData() {
      if (this.creds.token && this.creds.token !== "") {
        const response = await getOrderHistory(
          this.creds.token,
          1,
          99999,
          false
        );
        const data = await response.json();
        this.records = data.datas;
      } else {
        console.log("No permissions, please provide token!");
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
