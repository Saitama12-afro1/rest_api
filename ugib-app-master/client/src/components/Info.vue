<template>
  <v-app dark>
    <v-main>
      <section>
        <v-parallax
          src="@/img/banner_main_plus.gif"
          height="600"
          class="parallax"
        >
          <v-layout column align-center justify-center class="white--text">
            <h1
              class="white--text mb-2 display-1 text-xs-center"
              style="font-weight: 900; text-shadow: 3px 2px #000000"
            >
              Единый банк геологической информации ФГБУ«ЦНИГРИ»
            </h1>
            <div
              class="white--text subheading mb-3 text-xs-center"
              style="font-weight: 900; text-shadow: 2px 2px #000000; max-width: 550px"
            >
              Учет, накопление, безопасное хранение и предоставление сотрудникам
              ФГБУ "ЦНИГРИ" геологической информации
            </div>
            <!-- <v-btn class="lighten-2 mt-5" large @click="clickHandler">
              Начать
            </v-btn> -->
          </v-layout>
        </v-parallax>
      </section>

      <section id="dashboard">
        <v-layout column wrap class="my-5" align-center>
          <v-flex xs12 sm4 class="my-3"> </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large>mdi-forum-outline</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Назначение ЕБГИ</div>
                    </v-card-title>
                    <v-card-text>
                      Единый банк геологической информации ФГБУ«ЦНИГРИ» (ЕБГИ)
                      предназначен для обеспечения сотрудников ФГБУ«ЦНИГРИ»
                      цифровыми геологическими материалами, необходимыми для
                      выполнения работ по государственным контрактам и
                      государственным заданиям, написания научных трудов и
                      другой деятельности, направленной на выполнение задач
                      Института
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large>mdi-database</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">
                        Основные компоненты ЕБГИ
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Реестр фондовых материалов (поиск, получение кратких
                      сведений об объектах учета геологических фондов); Реестр
                      материалов апробации ПР (поиск, получение кратких сведений
                      об апробированных объектах); Карта объектов фондовых
                      материалов (отображение контуров работ и геологических
                      объектов, поиск материалов по объектам и местоположению);
                      Карта объектов апробации (отображение контуров
                      геологических объектов апробации прогнозных ресурсов,
                      поиск материалов по объектам и местоположению); Реестр
                      материалов постановки ГРР (поиск, получение кратких
                      сведений об объектах постановки ГРР); Реестр отчетных
                      материалов ГРР (поиск, получение кратких сведений об
                      объектах, на которых проведены (проводятся) ГРР); Карта
                      объектов ГРР (отображение контуров объектов ГРР, поиск
                      материалов по объектам и местоположению)
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large
                        >mdi-checkbox-multiple-marked-circle-outline</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">
                        Предоставление информации
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Реестры и карты ЕБГИ доступны всем авторизованным
                      пользовательям. Геологические материалы предоставляются в
                      соответствии с регламентирующими документами,
                      утвержденными руководством ФГБУ "ЦНИГРИ"
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large>mdi-cog</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Форматы данных</div>
                    </v-card-title>
                    <v-card-text
                      >Более 50 000 единиц данных в текстовых, растровых и
                      векторных форматах, ГИС-данные, локальные базы данных,
                      цифровые комплекты ГГК всех поколений, топографические
                      карты
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large>mdi-server</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Единицы хранения</div>
                    </v-card-title>
                    <v-card-text>
                      Общее количество уникальных объектов учета, приведенных к
                      цифровым форматам, составляет более 4000 единиц. Суммарное
                      количество площадных объектов на карте составляет более
                      8000 единиц
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large>mdi-file-table-box-multiple</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Виды документов</div>
                    </v-card-title>
                    <v-card-text>
                      Геологические отчеты, авторефераты диссертационных работ,
                      атласы, протоколы, экспертные заключения, заключения
                      рабочих групп, паспорта апробируемых объектов, материалы
                      организаций-зявителей на апробацию прогнозных ресурсов,
                      материалы на постановку ГРР
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section id = "reglament">
        <v-parallax src="@/img/stones.gif" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">
              Регламентирующие документы
            </div>
           
            <v-btn class="lighten-2 mt-5" large href="order.zip">
              Скачать
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Лаборатория ЕБГИ</div>
                </v-card-title>
                <v-card-text>
                  По вопросам получения данных ЕБГИ просим обращаться на
                  электронную почту и по телефону:
                </v-card-text>
                <v-card-text class="font-weight-bold">
                 Чернышов Д.С.
                </v-card-text>
                <v-card-text>
                  тел. внутр.: 106 <br />
                  <a
                    href="https://mail1.tsnigri.ru/?client=advanced#1"
                    target="_blank"
                    >chernyshov@tsnigri.ru</a
                  >
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Техническая поддержка</div>
                </v-card-title>
                <v-card-text>
                  В случае возникновения проблем с работой ЕБГИ просим
                  обращаться на электронную почту и по телефону:
                </v-card-text>
                <v-card-text class="font-weight-bold">
                  <div>
                    Чернышов Д.С.
                  </div>
                </v-card-text>
                <v-card-text>
                  тел. внутр.: 106 <br />
                  <a
                    href="https://mail1.tsnigri.ru/?client=advanced#1"
                    target="_blank"
                    >chernyshov@tsnigri.ru</a
                  >
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <base-section id="affiliates" space="20">
        <v-container class="container__padding">
          <v-card-title primary-title class="layout justify-center">
            <div class="headline padding">Основано на открытых технологиях</div>
          </v-card-title>
          <v-slide-group>
            <template v-for="n in 9">
              <v-slide-item :key="n" class="align-self-center">
                <baseImg
                  :src="require(`@/img/logo-${n}.png`)"
                  color="grey"
                  contain
                  height="40"
                  width="125"
                />
              </v-slide-item>
              <v-responsive
                v-if="n < 9"
                :key="`divider-${n}`"
                class="text-center"
                height="56"
                width="48"
              >
                <v-divider vertical />
              </v-responsive>
            </template>
          </v-slide-group>
        </v-container>
      </base-section>
    </v-main>
  </v-app>
</template>

<script>
import baseSection from "@/components/UI/Section.vue";
import baseSectionHeading from "@/components/UI/SectionHeading.vue";
import baseImg from "@/components/UI/Img.vue";

export default {
  components: {
    baseSection,
    baseSectionHeading,
    baseImg,
  },
  name: "Info",

  data: function() {
    return {
      title: "ugib",
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  methods: {
    clickHandler() {
      this.$router.push("/map");
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 0px 0px 30px 0px;
}

.container__padding {
  padding: 0px 0px 30px 0px;
}

.padding {
  padding: 0px 0px 30px 0px;
}

.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
</style>
