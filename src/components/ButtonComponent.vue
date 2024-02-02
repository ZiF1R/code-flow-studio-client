<template>
  <button :class="classes">
    <slot />
  </button>
</template>

<script lang="ts">
import { Size, Variant } from "@/utils/types/global.types";

export default {
  name: "ButtonComponent",

  props: {
    variant: {
      type: String,
      default: Variant.Text
    },
    size: {
      type: String,
      default: Size.Medium
    }
  },

  computed: {
    classes() {
      return `${this.variant} ${this.size} ${this.$attrs.class}`
    }
  }
}
</script>
