<template>
  <div class="wrapper-content wrapper-content--fixed">
    <div class="wrapper-table" data-app>
      <v-card>
        <v-card-title>
          <p>
            Реестр материалов апробации
          </p>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск по прогнозным ресурсам ЕБГИ..."
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
          height="76vh"
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
                        <th>Дата составления объекта учета</th>
                        <th>Права на материалы объекта</th>
                        <th>
                          Наименование регламентирующего документа (наименование
                          работ)
                        </th>
                        <th>Группа полезных ископаемых</th>
                        <th>Полезные ископаемые попутные</th>
                        <th>Номенклатуры листов НД</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ item.obj_type }}</td>
                        <td>{{ item.obj_date }}</td>
                        <td>{{ item.obj_rights }}</td>
                        <td>{{ item.obj_rdoc_name }}</td>
                        <td>{{ item.obj_group_min }}</td>
                        <td>{{ item.obj_supl_min }}</td>
                        <td>{{ item.spat_num_grid }}</td>
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
          <template v-slot:[`item.uniq_id`]="{ value }">
            <v-btn
              class="mx-1"
              fab
              x-small
              @click="onButtonClickReestre(value)"
            >
              <v-icon dark>mdi-map-search-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <div class="text-center">
          <v-btn color="ma-2" dark href="APR.zip">
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
          text: "Перейти к материалам",
          value: "path_cloud",
          width: "100",
          sortable: false,
        },
        { text: "Название объекта", value: "obj_name", width: "500" },
        { text: "Единицы хранения", value: "stor_units", width: "150" },
        { text: "Синопсис", value: "obj_synopsis", width: "300" },
        {
          text: "Полезные ископаемые основные",
          value: "obj_main_min",
          width: "120",
        },
        {
          text: "Сведения о привязке в рамках АТД и АТЕ",
          value: "spat_atd_ate",
        },
        {
          text: "Директория хранения",
          value: "stor_folder",
          width: "20",
        },
        {
          text: "Геологические объекты, ассоциируемые с документом",
          value: "obj_assoc_geol",
          width: "200",
        },
      ],
      items: [],
      protocols: [],
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    let role = localStorage.getItem("role");
    const domain = localStorage.getItem("domain");
    const reports = localStorage.getItem("fromRecourcesValue");
    axios
      .all([
        axios.get(`http://${domain}:3000/api/apr`),
        axios.get(`http://${domain}:3000/api/protocols`),
      ])
      .then((resArr) => {
        if (role == "chief") {
          const json = resArr[0].data;
          this.items = json;
        } else {
          const json = resArr[1].data;
          this.items = json;
        }
        this.loadTable = false;
        if (!reports) return;
        this.search = reports;
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
    onButtonClickReestre(value) {
      this.value = "";
      localStorage.setItem("protocolValue", value);
      this.$router.push("/resources");
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
.btnDefault {
  margin: 0px 10px 10px 0;
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
  margin: -20px 20px 20px 0px;
}
//.v-data-table-header th {
//  white-space: nowrap;
//}
</style>
