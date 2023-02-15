<template>
  <div class="wrapper-content wrapper-content--fixed">
    <div class="wrapper-table" data-app>
      <v-card>
        <v-card-title>
          <p>
            Библиотека ЦНИГРИ. Сводная таблица объектов библиотечного учета
          </p>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск по библиотеке..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          item-key="ind"
          fixed-header
          height="75vh"
          class="elevation-1"
          :footer-props="{
            'items-per-page-options': [50, 200, 500],
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus',
            'items-per-page-text': 'Объектов на странице: ',
          }"
          :items-per-page="50"
          :search="search"
          :sort-desc="[false, true]"
          multi-sort
          :header-props="{ sortIcon: null }"
          :loading="loadTable"
          loading-text="Загрузка... Подождите"
        >
        </v-data-table>
        <div class="text-center">
          <v-btn color="ma-2" dark href="Library.rar">
            Скачать Excel
          </v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      expanded: [],
      loadTable: true,
      options: {},
      search: "",
      headers: [
        { text: "№ п.п.", value: "ind", width: "80" },
        { text: "Название", value: "title", width: "220" },
        { text: "Автор (авторы)", value: "author", width: "100" },
        { text: "Организации", value: "org", width: "160" },
        {
          text: "Тематика",
          value: "subj_index",
          width: "100",
        },
        {
          text: "Тип издания",
          value: "pub_type",
          width: "100",
        },
        { text: "Год издания", value: "pub_year", width: "80" },
        {
          text: "Место издания",
          value: "pub_place",
          width: "100",
        },
        { text: "Кол-во томов", value: "volume", width: "50" },
        { text: "Название тома", value: "vol_name", width: "180" },
        {
          text: "Объем",
          value: "num_pages",
        },
        { text: "ПИ", value: "metall", width: "100" },

        {
          text: "Инвентарный номер",
          value: "inv_number",
        },
        {
          text: "УДК",
          value: "udk",
        },
        {
          text: "Сведения о привязке в рамках АТД и АТЕ",
          value: "geo_region",
        },
      ],
      items: [],
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      console.log("True!");
      this.$router.push("/login");
    }
    axios
      .get("http://localhost:3000/api/library", {})
      .then((res) => {
        this.items = res.data;
        this.loadTable = false;
      })
      .catch((error) => {
        console.log(error.response);
        this.loadTable = true;
      });
  },
  methods: {
    onButtonClickCloud(value) {
      window.open(value, "_blank");
    },
    onButtonClick(value) {
      console.log("click on " + value + " item");
      this.$router.push("/");
      this.$emit("on-click", value);
    },
  },
};
</script>

<style lang="scss">
input,
textarea,
select,
button {
  border: 0px !important;
}
td {
  text-align: center !important;
}
.wrapper-table {
  margin: 15px 0px 0px 0px;
}
.wrapper-simple-table {
  margin: 20px;
}
.v-select__slot {
  height: 25px;
}
.v-text-field__slot {
  padding-top: 30px;
  height: 30px;
}
.text-center {
  text-align: left;
  margin-left: 10px;
}
.expanded-btn {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.ma-2 {
  margin: 0px 20px 20px 0px;
}
//.v-data-table-header th {
//  white-space: nowrap;
//}
</style>
