<template>
  <div class="template">
    <IconAsyncComponent :base-url="iconsBaseUrl" :icon-name="props.type" />
    <h4>{{title}}</h4>
    <span class="template__author">{{type}}</span>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps, ref} from "vue";
import IconAsyncComponent from "@/components/IconAsyncComponent.vue";

const props = defineProps<{
  type: string
  title: string
}>();

const iconsBaseUrl =
  ref<string>('../modules/Dashboard/components/assets/icons/');
</script>
