<template>
  <div class="recent__container">
    <div class="page-header">
      <h2>
        Шаблоны
      </h2>
    </div>

    <CardsBlock :cards="cards" />
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.store";
import {onBeforeMount, ref} from "vue";
import {getTemplates} from "@/utils/services/projects.service";
import CardsBlock from "@/modules/Dashboard/components/Recent/CardsBlock.vue";

const auth = useAuthStore();
const cards = ref(null);

onBeforeMount(async () => {
  cards.value = await getTemplates(auth.currentUser?.id);
});
</script>
