<template>
  <div>
    <h1>Project {{project?.codeName}}</h1>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, onBeforeMount, reactive, ref} from "vue";
import {Project} from "@/utils/types/global.types";
import {getProject} from "@/utils/services/projects.service";

const location = useRoute();
const project = ref<Project | null>(null)
const loading = computed<boolean>(() => project.value === null);

onBeforeMount(async () => {
  project.value = await getProject(location.params.projectName.toString());
});
</script>

<style lang="scss">

</style>
