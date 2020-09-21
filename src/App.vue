<template>
  <v-app id="app" v-model="creds">
    <v-app-bar app clipped-left color="blue-grey">
      <v-toolbar-title>Tx Report</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn raised @click="loadData()">Load Data</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-card v-model="balance">
              <v-card-title>Balance</v-card-title>
              <v-devider></v-devider>
              <v-list>
                <v-list-item dense v-for="item in balance" :key="item.name">
                  <v-list-item-title>{{ `${item.name}:` }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right">{{ floor2(item.value) }}</v-list-item-subtitle>
                </v-list-item>
                <v-devider></v-devider>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="18">
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
              <v-data-table dense :headers="headers" :items="records" :search="search">
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
                <template v-slot:item.lever="{ item }">{{ `${floor2(item.lever)}x` }}</template>
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
          </v-col>
        </v-row>
      </v-container>
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
import {
  getOrderHistory,
  getNetProfitData,
  getDepositData
} from "./services/report-data";

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
          align: "start d-none",
          sortable: false,
          value: "code"
        },
        { text: "OpenTime", value: "ordertime" },
        { text: "CloseTime", value: "overtime" },
        { text: "ContractName", value: "currencyname" },
        { text: "Long/Short", value: "direction" },
        { text: "Invested", value: "amount" },
        { text: "Leverage", value: "lever" },
        { text: "PositionSize", value: "positions" },
        { text: "Transaction Fee", value: "charge" },
        { text: "Over-night Fee", value: "interest" },
        { text: "Open", value: "strikeprice" },
        { text: "Close", value: "settlement" },
        { text: "P/L", value: "profit" },
        { text: "Net P/L", value: "netprofit" }
      ],
      balance: [
        {
          name: "Total deposits",
          value: 0.0
        },
        {
          name: "Total net profits",
          value: 0.0
        },
        {
          name: "Total net losses",
          value: 0.0
        },
        {
          name: "Total balance",
          value: 0.0
        }
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
    async calculateBalance(token) {
      const depositResponse = await getDepositData(token, 1, 99999);
      const depositData = await depositResponse.json();
      const netProfitResponse = await getNetProfitData(token, 1, 99999);
      const netProfitData = await netProfitResponse.json();

      this.balance[0].value = 0.0;
      this.balance[1].value = 0.0;
      this.balance[2].value = 0.0;
      this.balance[3].value = 0.0;

      var dep;
      for (dep of depositData.entryRecordList) {
        this.balance[0].value += dep.actualAmount;
      }

      var rec;
      for (rec of netProfitData.otherList) {
        this.balance[1].value += rec.backmoney >= 0 ? rec.backmoney : 0.0;
        this.balance[2].value += rec.backmoney < 0 ? rec.backmoney : 0.0;
      }

      this.balance[3].value =
        this.balance[0].value + this.balance[1].value + this.balance[2].value;
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
        this.calculateBalance(this.creds.token);
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
