<template>
  <div class = "background" >
    <v-main class = "main_form">
      <v-card class = "pa-3" width = "400px">
        <v-form @submit.prevent = "signup" ref = "form">
          <v-card-text>
            <v-text-field
            v-model ="email"
            :rules="emailRules"
            type="email"
            label = "Email"
            placeholder=""
            required
            />
            <v-text-field
            v-model ="name"
            type="text"
            label = "Name"
            placeholder=""
            required
            />
            <v-text-field
            v-model ="password"
            :rules="passwordRules"
            type="password"
            label = "Password"
            placeholder=""
            required
            />
            <v-text-field
            v-model ="position"
            type="text"
            label = "position"
            placeholder=""
            required
            />
            <v-text-field
            v-model ="departament"
            type="departament"
            label = "Deaprtament"
            placeholder=""
            required
            />
          </v-card-text>
          <v-card-actions class="justify-center">
                <v-btn
                  :loading="loading"
                  type="submit"
                  class="ma-2 btn__default v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default"
                >
                  <span class="white--text px-8">Зарегистрироваться</span>
                </v-btn>
              </v-card-actions>
        </v-form>
      </v-card>
    </v-main>

    <v-snackbar top color="red" v-model="invalidbar">
      Почта уже занята 
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      departament: "",
      loading: false,
      invalidbar:false,
      position: "",
      error: "",
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
    };
  },
  methods: {
    signup() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
        departament: this.departament,
        position: this.position
      };
      console.log(newUser);
      const domain = localStorage.getItem("domain");
      console.log(domain);
      axios.post(`http://localhost:5000/signup`, newUser).then(
        (res) => {
          console.log(res);
          this.error = "";
          this.loading = true;
          this.$router.push("/login");
        },
        (err) => {
          console.log(err.response);
          this.error = err.response.data.error;
          this.loading = true;
          setTimeout(() =>{
            this.loading = false
            this.invalidbar = true;
            this.$refs.form.reset();

          }, 2000);
        }
      );
    },
  },
};
</script>

<style>

.background {
  background-image: url(../img/banner_main_plus.gif) !important;
  height: 100%;
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  background-size: cover;
}
label{
  margin-top: -15px;
  margin-left: 45%;
}
input {
  border: none !important;
  margin: 10px !important;
  box-sizing: border-box !important;
}
.main_form{
  padding: 50px;
  position: fixed; top: 50%; left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
button{
  margin-left: 25%;
}
</style>
