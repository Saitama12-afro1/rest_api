<template>
  <div class="wrapper-content wrapper-content--fixed">
    <div class="wrapper-table" data-app>
      <v-card>
        <v-card-title>
          <p>
            Фонд ЦНИГРИ. Сводная таблица объектов учета в аналоговом виде
          </p>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск по фондовым материалам ЕБГИ..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="OBJECTID"
          show-expand
          fixed-header
          height="79vh"
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
          <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length">
              <div class="wrapper-simple-table" data-app>
                <v-simple-table>
                  <template v-slot:default>
                    <thead class="col-4">
                      <tr>
                        <th>Тип документа</th>
                        <th>Раздел</th>
                        <th>
                          Сведения о наличии ограничений оборота передаваемых
                          данных
                        </th>
                        <th>Государство</th>
                        <th>
                          Количество страниц
                        </th>
                        <th>
                          Геологические объекты, ассоциируемые с объектом учета
                        </th>
                        <th>Полезные ископаемые попутные</th>
                        <th>Тип месторождения</th>
                        <th>Местоположение</th>
                        <th>Номенклатуры листов НД</th>
                        <th>Дополнительные сведения о местоположении</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ item.TIP }}</td>
                        <td>{{ item.RAZDEL }}</td>
                        <td>{{ item.SECR }}</td>
                        <td>{{ item.GOSVO }}</td>
                        <td>{{ item.obj_rdoc_name }}</td>
                        <td>{{ item.SELFOBJ }}</td>
                        <td>{{ item.METAL_S }}</td>
                        <td>{{ item.TYPEMST }}</td>
                        <td>{{ item.OBLST_S }}</td>
                        <td>{{ item.NOMALL }}</td>
                        <td>{{ item.MAINOBJ }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </td>
          </template>
        </v-data-table>
        <div class="text-center">
          <v-btn color="ma-2" dark href="#">
            Скачать Excel
          </v-btn>
          <v-btn color="ma-2" dark href="Бланк_заявки.doc">
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
      options: {},
      search: "",
      headers: [
        { text: "Название объекта", value: "NAZVANIE", width: "350" },
        { text: "Автор (авторы)", value: "GLAVTOR", width: "300" },
        { text: "Год издания", value: "GOD_IZD", width: "80" },
        {
          text: "Инвентарные номера в каталогах учета",
          value: "INV_NO",
          width: "150",
        },
        {
          text: "Полезные ископаемые основные",
          value: "METAL",
          width: "120",
        },
        { text: "Предмет", value: "Predmet", width: "100" },
        { text: "Организации", value: "IZD_ORG", width: "100" },
        {
          text: "Сведения о привязке в рамках АТД и АТЕ",
          value: "OBLST",
        },
        {
          text: "Участок, площадь, РУ, РП, месторождение",
          value: "MSTORS",
          width: "250",
        },
      ],
      items: [],
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    axios
      .get("http://localhost:3000/api/fund", {})
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
    getColor(obj_year) {
      if (obj_year > 1934) return "orange";
      else if (obj_year > 1950) return "red";
      else return "grey";
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
  margin: -20px 20px 20px 0px;
}
//.v-data-table-header th {
//  white-space: nowrap;
//}
</style>
