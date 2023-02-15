<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <h2>Добро пожаловать в ЕБГИ ЦНИГРИ (Beta)!</h2>
          </slot>
        </header>
    
        <div class="modal-answer" id="modalAnswer">
          <slot name="info">
            Для входа в ЕБГИ введите свой адрес электронной почты ЦНИГРИ и
            пароль. Для получения и восстановления доступа к ЕБГИ обращайтесь на
            электронную почту
            <a
              href="https://mail1.tsnigri.ru/?client=advanced#1"
              target="_blank"
              >сhernyshov@tsnigri.ru</a
            > или <a href="https://mail1.tsnigri.ru/?client=advanced#1"
              target="_blank"
              >fedorenko@tsnigri.ru</a>
          </slot>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <!-- <button type="button" class="btn btnDefault" @click="toInfo">
              О Едином Банке
            </button> -->
            <v-btn
              type="button"
              class="ma-2 btn__default v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default"
              @click="close"
            >
              <span class="white--text px-8">Закрыть</span>
            </v-btn>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import Section from "./Section.vue";
export default {
  components: { Section },
  name: "modal",
  methods: {
    close() {
      this.$emit("close");
    },
    toInfo() {
      this.$router.push("/info");
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  max-width: 40em;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}
.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}
.modal-header {
  justify-content: center;
}
.modal-footer {
  justify-content: flex-end;
}
.modal-body {
  position: relative;
  text-align: justify;
  padding: 10px 15px;
}
.modal-answer {
  position: relative;
  font-weight: bolder;
  text-align: center;
  padding: 0px 15px;
}
.btn-close {
  border: none;
  font-size: 17px;
  margin-left: 40px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}
.btn {
  font-size: 14px;
  margin: 5px;
}
</style>
