<template>
  <div class="home">
    <info />
  </div>
</template>

<script>
// @ is an alias to /src
import info from "@/components/Info.vue";

export default {
  name: "Info",
  components: {
    info,
  },
};
</script>
