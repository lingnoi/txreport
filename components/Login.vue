<template>
  <v-app id="login">
    <v-app-bar app clipped-left>
      <v-toolbar-title>Tx Report</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Snapex API Creds</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="API-ID"
                    name="apiid"
                    prepend-icon="mdi-identifier"
                    type="text"
                    v-model="input.apiId"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="API-Key"
                    name="apikey"
                    prepend-icon="mdi-key"
                    type="password"
                    v-model="input.apiKey"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      input: {
        apiId: "",
        apiKey: ""
      }
    };
  },
  methods: {
    login() {
      if (this.input.apiId === "123" && this.input.apiKey === "123") {
        this.$store.commit("setAuthentication", "validToken");
        this.$router.replace({ name: "records" });
      } else {
        console.log("Invalid credentials!");
      }
    }
  }
};
</script>