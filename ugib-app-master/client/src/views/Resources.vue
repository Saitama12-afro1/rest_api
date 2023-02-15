<template>
  <div class="home">
    <resourcesLeaflet />
  </div>
</template>

<script>
// @ is an alias to /src
import resourcesLeaflet from "@/components/Resources.vue";

export default {
  name: "Resources",
  components: {
    resourcesLeaflet,
  },
};
</script>
