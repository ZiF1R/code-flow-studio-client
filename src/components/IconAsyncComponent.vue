<template>
  <AsyncIcon />
</template>

<script setup lang="ts">
import {Component, computed, defineAsyncComponent, defineProps} from "vue";

const props = defineProps<{
  baseUrl: string
  iconName: string
  defaultIcon?: string
}>();

const AsyncIcon = defineAsyncComponent({
  loader: async () => {
    return import(props.baseUrl + props.iconName + '.vue').catch(
      () => import('../assets/images/default.vue')
    ) as Promise<Component>
  },
})
</script>
