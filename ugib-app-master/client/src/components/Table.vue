
<template>
  <div class="wrapper-content wrapper-content--fixed">
    <div class="wrapper-table" data-app>
      <v-card>
        <v-card-title>
          <p>
            Реестр фондовых материалов
          </p>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск по реестру объектов учета ЕБГИ..."
            single-line
            hide-details
          ></v-text-field>
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
          <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length">
              <div class="wrapper-simple-table" data-app>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>Вид объекта учета</th>
                        <th>
                          Сведения о наличии ограничений оборота передаваемых
                          данных
                        </th>
                        <th>Права на материалы объекта</th>
                        <th>
                          Наименование регламентирующего документа (наименование
                          работ)
                        </th>
                        <th>
                          Геологические объекты, ассоциируемые с объектом учета
                        </th>
                        <th>Полезные ископаемые попутные</th>
                        <th>Группа полезных ископаемых</th>
                        <th>Местоположение</th>
                        <th>Номенклатуры листов НД</th>
                        <th>Дополнительные сведения о местоположении</th>
                        <th>Тип информации</th>
                        <th>Государственная регистрация</th>
                        <th>Вид носителя инофрмации</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td >{{ item.obj_type }}</td>
                        <td>{{ item.obj_restrict }}</td>
                        <td>{{ item.obj_rights }}</td>
                        <td>{{ item.obj_rdoc_name }}</td>
                        <td>{{ item.obj_assoc_geol }}</td>
                        <td>{{ item.obj_supl_min }}</td>
                        <td>{{ item.obj_group_min }}</td>
                        <td>{{ item.spat_loc }}</td>
                        <td>{{ item.spat_num_grid }}</td>
                        <td>{{ item.spat_toponim }}</td>
                        <td>{{ item.inf_type }}</td>
                        <td>{{ item.path_others }}</td>
                        <td>{{item.inf_media}}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </td>
          </template>
          <template v-slot:[`item.path_cloud`]="{ value }">
            <v-btn class="mx-1" fab x-small @click="onButtonClickCloud(value)">
              <v-icon dark>mdi-application-import</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.stor_folder`]="{ value }">
            <a  v-bind:href = "'http://gis311k1:8000/?query=' + value"> {{value}} </a>
          </template>
          <template v-slot:[`item.oid`]="{ value }">
            <v-btn class="mx-1" fab x-small @click="onButtonClickBascet(value)">
              <v-icon dark>mdi-cart</v-icon>
            </v-btn>
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
        {text: "Добавить в корзину", value: "oid", sortable:false},
        {
          text: "Перейти к материалам",
          value: "path_cloud",
          width: "100",
          sortable: false,
        },
        { text: "Директория хранения", value: "stor_folder", width: "130"},
        // { text: "oid", value: "oid", width: "130"},
        { text: "Название объекта", value: "obj_name", width: "280" },
        { text: "Автор (авторы)", value: "obj_authors", width: "150" },
        { text: "Год составления объекта", value: "obj_year", width: "80" },
        {
          text: "Инвентарные номера в каталогах учета",
          value: "obj_assoc_inv_nums",
          width: "150",
        },
        {
          text: "Полезные ископаемые основные",
          value: "obj_main_min",
          width: "120",
        },
        { text: "Вид работ", value: "type_of_work", width: "100" },
        { text: "Организации", value: "obj_orgs", width: "100" },
        {
          text: "Сведения о привязке в рамках АТД и АТЕ",
          value: "spat_atd_ate",
        },
        {
          text: "Ключевые слова",
          value: "obj_terms",
          width: "230",
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
      .get(`http://${domain}:3000/api/json`)
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
