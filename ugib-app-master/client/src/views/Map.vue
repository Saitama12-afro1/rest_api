<template>
  <div class="home">
    <mapLeaflet />
  </div>
</template>

<script>
// @ is an alias to /src
import mapLeaflet from "@/components/Map.vue";

export default {
  name: "Map",
  components: {
    mapLeaflet,
  },
};
</script>
