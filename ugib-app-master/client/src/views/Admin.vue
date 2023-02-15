<template>
  <div class="admin">
    <adminPanel />
  </div>
</template>

<script>
// @ is an alias to /src
import adminPanel from "@/components/AdminPanel.vue";

export default {
  name: "admin",
  components: {
    adminPanel,
  },
};
</script>
