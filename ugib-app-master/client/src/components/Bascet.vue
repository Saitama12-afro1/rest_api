<template>
    <div class="wrapper-content wrapper-content--fixed">
      <div class="wrapper-table" data-app>
        <v-card>
          <v-card-title>
            <p>
              Корзина
            </p>
            <v-spacer></v-spacer>
           
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="oid"
            show-expand
            fixed-header
            height="75vh"
            class="elevation-1"
            :footer-props="{
              'items-per-page-options': [50, 100, 200],
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
            :header-props="{ sortIcon: null, sortByText: 'Сортировать по:' }"
            :loading="loadTable"
            loading-text="Загрузка... Подождите"
          >
            
            <template v-slot:[`item.stor_folder`]="{ value }">
              <a  v-bind:href = "'http://gis311k1:8000/?query=' + value"> {{value}} </a>
            </template>
            
            <template v-slot:[`item.buff`]="{ value }">
              <a  v-bind:href = "'http://gis311k1:8000/?query=' + value"> {{value}} </a>
            </template>
            <template v-slot:[`item.uniq_id`]="{ value }">
              <v-btn
                v-if="value"
                class="mx-1"
                fab
                x-small
                @click="onButtonClickReestre(value)"
              >
                <v-icon>mdi-map-search-outline</v-icon>
              </v-btn>
              <v-btn v-else class="mx-1" fab x-small disabled>
                <v-icon>mdi-map-search-outline</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <div class="text-center">
            <v-btn color="ma-2" dark href="Fund.zip">
              Скачать Excel
            </v-btn>
            <v-btn color="ma-2" dark href="Blank.docx">
              Скачать форму заявки
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        expanded: [],
        singleExpand: false,
        loadTable: true,
        value: "",
        options: {},
        search: "",
        headers: [
          { text: "Показать на карте", value: "uniq_id", sortable: false },
        
          {
            text: "№ п/п",
            value: "oid",
            sortable: false,
            width: "100",
          },
          { text: "Директория хранения", value: "stor_folder", },
          // { text: "oid", value: "oid", width: "130"},
          { text: "Название объекта", value: "obj_name",  width: "300"},
          { text: "Автор (авторы)", value: "obj_authors", },
          { text: "Год составления объекта", value: "obj_year",  },
          {
            text: "Инвентарные номера в каталогах учета",
            value: "obj_assoc_inv_nums",
           
          },
          
        ],
        items: [],
      };
    },
    computed: {
      ...mapGetters(["text"]),
    },
    created() {
      if (localStorage.getItem("token") === null) {
        this.$router.push("/login");
      }
      const domain = localStorage.getItem("domain");
      const reports = localStorage.getItem("fromMapValue");
      axios
        .get(`http://${domain}:3000/api/addInBascet`)
        .then((res) => {
          this.items = res.data;
          this.loadTable = true;
          if (!reports) return;
          this.search = reports;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    methods: {
      onButtonClickCloud(value) {
        window.open(value, "_blank");
      },
      onButtonClickBascet(value){
        const domain = localStorage.getItem("domain");
        console.log(111111);
        const uri = window.location.pathname;
        axios.post(`http://${domain}:3000/api/addInBascet`, {oid:value, uri:uri, userId:localStorage.getItem("userId")})
        .then(function (responce){
          console.log(resp);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      onButtonClickReestre(value) {
        this.value = "";
        if (!value) return;
        localStorage.setItem("reportValue", value);
        this.$router.push("/map");
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  input,
  textarea,
  select,
  button {
    border: 0px !important;
  }
  td {
    text-align: left  !important;
  }
  .wrapper-table {
    margin: 30px 0px 0px 0px;
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
  .simple-body-table{
    text-align: justify;
  }
  .expanded-btn {
    display: flex;
    justify-content: center;
    margin: 20px;
  }
  .ma-2 {
    margin: -20px 20px 20px 0px;
  }
  //.v-data-table-header th {
  //  white-space: nowrap;
  //}
  </style>
  