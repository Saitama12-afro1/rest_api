<template>
  <v-app>
    <div class="background" />
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="2" class="mx-auto">
        <v-card class="pa-3" width="400px">
          <div class="text-center">
            <v-avatar size="80" color="brown lighten-4">
              <v-icon size="40" color="dark">mdi-account-group</v-icon>
            </v-avatar>
            <h2 class="dark--text">Войти в ЕБГИ</h2>
          </div>
          <v-form @submit.prevent="submitHandler" ref="form">
            <v-card-text>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                type="email"
                label="Email"
                placeholder=""
                prepend-inner-icon="mdi-account"
                required
              />
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="passwordShow ? 'text' : 'password'"
                label="Пароль"
                placeholder=""
                prepend-inner-icon="mdi-key"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="passwordShow = !passwordShow"
                required
              />
              <!-- <v-switch label="Запомнить меня" color="indigo"></v-switch> -->
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                :loading="loading"
                type="submit"
                class="ma-2 btn__default v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default"
              >
                <span class="white--text px-8">Войти</span>
              </v-btn>
            </v-card-actions>
            <v-btn to="/signup" class="ma-2 btn__default v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default">
              Зарегистрироваться
            </v-btn>

          </v-form>
          <div>
            <a class="link" @click="showModal">Не удалось войти?</a>
          </div>
          <div>
            <a href="Order.pdf" target="_blank" class="link"
              >Правила использования</a
            >
          </div>
        </v-card>
      </v-col>
    </v-main>
    <v-snackbar top color="green" v-model="snackbar">
      Корректный логин и пароль
    </v-snackbar>
    <v-snackbar top color="red" v-model="invalidbar">
      Некорректный логин или пароль.
    </v-snackbar>
    <!-- <v-snackbar top color="yellow" v-model="warningbar">
      Разрыв сессии. Войдите снова.
    </v-snackbar> -->
    <modal v-show="isModalVisible" style="z-index:100;" @close="closeModal" />
  </v-app>
</template>

<script>
import modal from "@/components/UI/Modal.vue";
import axios from "axios";

export default {
  name: "Login",
  components: {
    modal,
  },
  data: () => ({
    isModalVisible: false,
    loading: false,
    snackbar: false,
    invalidbar: false,
    passwordShow: false,
    email: "",
    emailRules: [
      (v) => !!v || "Введите Email",
      (v) => /.+@.+\..+/.test(v) || "E-mail должен быть корректным",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Введите пароль без CAPS LOCK",
      (v) =>
        (v && v.length >= 3) ||
        "Пароль должен содержать не менее 8 символов без CAPS LOCK",
    ],
    role: "",
    error: "",
  }),
  created() {
    localStorage.clear();
  },
  methods: {
    submitHandler() {
      if (this.$refs.form.validate()) {
        let user = {
          email: this.email,
          password: this.password,
        };
        const domain = "localhost";
        axios.post(`http://${domain}:5000/login`, user).then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("domain", domain);
            console.log(res.data.userId)
            localStorage.setItem("userId", res.data.userId)
            this.loading = true;
            setTimeout(() => {
              this.snackbar = true;
            }, 500);
            setTimeout(() => {
              this.$store.commit("setRole", res.data.role);
              localStorage.getItem("role") === "admin"
                ? this.$router.push("/admin")
                : this.$router.push("/");
            }, 2000);
          }
          (err) => {
            console.log(err.response);
            this.error = err.response.data.error;
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.invalidbar = true;
            }, 2500);
          };
        });
       
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
<style lang="scss">
input {
  border: none !important;
  margin: 0 !important;
  box-sizing: border-box !important;
}
.background {
  background-image: url(../img/banner_main_plus.gif) !important;
  height: 100%;
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  background-size: cover;
}
</style>
