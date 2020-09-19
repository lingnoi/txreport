<template>
  <div id="app">
    <md-card>
      <md-card-header>
        <div class="md-title">Tx Report</div>
        <div class="md-subhead">by lingnoi</div>
      </md-card-header>

      <md-card-content>
        <md-button class="md-raised md-primary" v-on:click="loadReportEntries()">Load data</md-button>
      </md-card-content>
    </md-card>
    <div>
      <md-table v-model="reportEntries" md-sort="date" md-sort-order="asc" md-card>
        <md-table-toolbar>
          <h1 class="md-title">Records</h1>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Date" md-sort-by="date">{{ item.date }}</md-table-cell>
          <md-table-cell md-label="Product" md-sort-by="product">{{ item.product }}</md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="productName">{{ item.productName }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      reportEntries: []
    };
  },
  methods: {
    loadReportEntries: function() {
      this.reportEntries.push({
        id: "0f30ea5bf89c28",
        date: "10/02/2020",
        product: "CFD",
        productName: "ADA/TETHER"
      });
      this.reportEntries.push({
        id: "2b30ea5bf89c28",
        date: "11/02/2020",
        product: "CFD",
        productName: "BTC/TETHER"
      });
      this.reportEntries.push({
        id: "5689ea5bf89c28",
        date: "12/02/2020",
        product: "CFD",
        productName: "ETH/TETHER"
      });
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
