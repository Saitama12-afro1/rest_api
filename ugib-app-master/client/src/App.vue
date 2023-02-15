<template>
  <div id="app">
    <div id="nav">
      <header>
        <div class="navbar">
          <div class="navbar-content">
            <img
              src="./img/tsnigri.png"
              style="height: 48px; margin: 1px 0 1px 19px"
              alt="tsnigri-logo-img"
            />
            <ul class="navbar-list" v-if="$route.meta.show">
              <div class="text-center font-weight-bold">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" plain dark v-bind="attrs" v-on="on">
                      О Едином Банке
                    </v-btn>
                  </template>
                  <v-list dark>
                    <v-list-item :to="'/'" @click="$vuetify.goTo('#dashboard')">
                      <v-list-item-title>
                        Назначение, компоненты и предоставление информации
                        </v-list-item-title>
                    </v-list-item>
                      <v-list-item :to="'/'" @click="$vuetify.goTo('#reglament')">
                      <v-list-item-title>
                        Регламентирующие документы, бланки
                        </v-list-item-title>
                    </v-list-item>
                  </v-list>
                  
                </v-menu>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" plain dark v-bind="attrs" v-on="on">
                      Фондовые материалы
                    </v-btn>
                  </template>
                  <v-list dark>
                    <v-list-item
                      v-for="(fund, index) in funds"
                      :key="index"
                      :to="fund.link"
                    >
                      <v-list-item-title>{{ fund.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" plain dark v-bind="attrs" v-on="on">
                      Материалы апробации ПР
                    </v-btn>
                  </template>
                  <v-list dark>
                    <v-list-item
                      v-for="(apr, index) in aprs"
                      :key="index"
                      :to="apr.link"
                    >
                      <v-list-item-title>{{ apr.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" plain dark v-bind="attrs" v-on="on">
                      Материалы ГРР
                    </v-btn>
                  </template>
                  <v-list dark>
                    <v-list-item
                      v-for="(material, index) in materials"
                      :key="index"
                      :to="material.link"
                    >
                      <v-list-item-title>{{
                        material.title
                      }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <v-toolbar-title data-app>
                <v-menu bottom left dark :offset-x="offset">
                  <template v-slot:activator="{ on: menu, attrs }">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                          dark
                          large
                          icon
                          v-bind="attrs"
                          v-on="{ ...tooltip, ...menu }"
                        >
                          <v-icon>mdi-account</v-icon>
                        </v-btn>
                      </template>
                      <span>Личный кабинет</span>
                    </v-tooltip>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(admin, i) in admins"
                      :key="i"
                      :to="admin.link"
                    >
                      <v-list-item-title>{{ admin.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar-title>
            </ul>
          </div>
        </div>
      </header>
    </div>
    <router-view />
    <v-footer app bottom fixed dark padless>
      <v-col>
        Отдел геоинформационных систем. Лаборатория ЕБГИ ©
        {{ new Date().getFullYear() }} ФГБУ "ЦНИГРИ"
      </v-col>
    </v-footer>
    <modal v-show="isModalVisible" style="z-index:100;" @close="closeModal" />
  </div>
</template>

<script>
import modal from "@/components/UI/Modal.vue";

export default {
  name: "App",
  components: {
    modal,
  },
  data() {
    return {
      show: false,
      admin: false,
      events: [
        "click",
        "mousemove",
        "mousedown",
        "scroll",
        "keypress",
        "load",
        "unload",
      ],
      logoutTimer: null,
      isModalVisible: false,
      offset: true,
      links: [{ title: "О Едином Банке", url: "/" }],
      items: [
        {
          title: "Назначение, компоненты и предоставление информации",
          link: "/",
          method: "$vuetify.goTo('#dashboard')",
        },

        { title: "Регламентирующие документы, бланки", link: "/",
          method: "$vuetify.goTo('#v-parallax__content')"
      },
      ],
      admins: [
        { title: "История заявок", link: "/404" },
        { title: "Доступные материалы", link: "/404" },
        { title: "Корзина", link: "/bascet" },
        { title: "Выйти", link: "/login" },
      ],
      funds: [
        { title: "Реестр фондовых материалов", link: "/table" },
        { title: "Карта объектов фондовых материалов", link: "/map" },
      ],
      aprs: [
        { title: "Реестр материалов апробации ПР", link: "/forecast" },
        { title: "Карта объектов апробации ПР", link: "/resources" },
      ],
      materials: [
        { title: "Реестр материалов постановки ГРР", link: "/staging" },
        { title: "Реестр материалов сопровождения ГРР", link: "/accompany" },
        { title: "Карта объектов ГРР", link: "/exploration" },
      ],
    };
  },
  mounted() {
    console.info("UGIB version 2.6");

    if (localStorage.getItem("token") === "admin") {
      this.admin = true;
    }

    this.events.forEach(function(event) {
      window.addEventListener(event, this.resetTimer);
    }, this);

    // window.onbeforeunload = function() {
    //   return confirm();
    // };
    // window.addEventListener("beforeunload", this.deleteToken);

    this.setTimers();
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    adminPanelHandler() {
      this.$router.push("/admin");
    },
    logoutHandler() {
      let message = "Вы действительно хотите выйти из своей учетной записи?";
      let result = window.confirm(message);
      if (result) {
        localStorage.clear();
        this.$router.push("/login");
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    setTimers: function() {
      this.logoutTimer = setTimeout(this.logout, 1000 * 60 * 60);
    },
    resetTimer: function() {
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
    deleteToken() {
      localStorage.clear();
    },
  },
};
</script>

<style lang="scss">
.v-btn {
  // color: #c1a365 !important;
  font-weight: 700;
}
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  a {
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: #d3b36f;
    }
  }
}

button {
  border: 0px !important;
}

.v-tooltip__content {
  padding: 0px;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 12px !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 11px !important;
}
</style>
