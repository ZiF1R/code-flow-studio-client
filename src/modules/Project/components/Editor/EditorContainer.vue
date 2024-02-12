<template>
  <section class="editor-container">
    <EditorSide :eventBus />
    <EditorPreview />
  </section>
</template>

<script setup lang="ts">
import EditorSide from "@/modules/Project/components/Editor/EditorSide.vue";
import EditorPreview
  from "@/modules/Project/components/Editor/EditorPreview.vue";
import {defineProps} from "vue/dist/vue";
import {TinyEmitter} from "tiny-emitter";

const props = defineProps<{
  eventBus: TinyEmitter
}>();
</script>
