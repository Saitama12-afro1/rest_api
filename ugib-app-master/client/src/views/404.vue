<template>
  <center>
    <h1>Страница не найдена!</h1>
    <p>
      <a href="/">Вернуться на главную</a>
    </p>
  </center>
</template>

<script>
export default {
  name: "404",
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss" scoped>
center {
  margin: 25vw;
}

h1 {
  color: var(--border);
  font-size: 2em;
}
</style>
