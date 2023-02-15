<template>
  <div :class="classes" class="base-section-heading">
    <div class="base-body-download">
      <base-body class="base-body-download" max-width="700">
        <slot v-if="$slots.default" />
        <template v-else>
          {{ text }}
        </template>
      </base-body>
    </div>
  </div>
</template>

<script>
// Mixins
import Heading from "@/mixins/heading";
import baseDivider from "@/components/UI/Divider.vue";

export default {
  name: "BaseSectionHeading",

  components: {
    baseDivider,
  },

  mixins: [Heading],

  props: {
    align: {
      type: String,
      default: "center",
    },
    color: {
      type: String,
      default: "primary",
    },
    icon: String,
    outlined: Boolean,
    space: {
      type: [Number, String],
      default: 12,
    },
    subtitle: String,
    text: String,
    title: String,
  },

  computed: {
    classes() {
      return [`text-${this.align}`, `mb-${this.space}`];
    },
  },
};
</script>

<style lang="scss">
.base-body-download {
  margin: 25px 100px 5px;
}
</style>
