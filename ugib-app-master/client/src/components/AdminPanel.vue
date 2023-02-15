<template>
  <div class="wrapper-content wrapper-content--fixed">
    <div class="wrapper-table" data-app>
      <v-navigation-drawer absolute dark width="15%" permanent>
        <div style="margin: 45px 0px 0px 0px ">
          <v-list>
            <v-list-item
              v-for="([icon, text], i) in routes"
              :key="i"
              link
              @click="toggleHandler"
            >
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </v-navigation-drawer>
      <TableCRUD v-if="table" />
      <ForecastCRUD v-if="forecast" />
      <FundCRUD v-if="fund" />
      <SignUp v-if="signUp" />
    </div>
  </div>
</template>

<script>
import FundCRUD from "./UI/FundCRUD.vue";
import TableCRUD from "./UI/TableCRUD.vue";
import ForecastCRUD from "./UI/ForecastCRUD.vue";
import SignUp from "../views/Signup.vue";

export default {
  name: "adminPanel",
  components: {
    FundCRUD,
    TableCRUD,
    ForecastCRUD,
    SignUp,
  },
  data() {
    return {
      table: false,

      routes: [
        ["mdi-table-multiple", "Реестр фондовых материалов"],
        ["mdi-table-multiple", "Реестр прогнозных ресурсов"],
        ["mdi-table-multiple", "Все фондовые материалы"],
        ["mdi-account-supervisor-circle", "Регистрация"],
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toggleHandler() {
      this.table = true;
    },
  },
};
</script>
