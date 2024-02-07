<template>
  <div class="recent__container">
    <div class="page-header">
      <h2>
        Недавние
      </h2>
      <Search />
    </div>

    <div class="recent__actions">
      <ButtonComponent @click="() => createDialog = true"
                       :variant="Variant.Contained"
                       :size="Size.Large">
        <ProjectsIcon />
        <span>Новый проект</span>
      </ButtonComponent>
      <ButtonComponent :variant="Variant.Contained" :size="Size.Large">
        <ImportIcon />
        <span>Импорт репозитория</span>
      </ButtonComponent>
      <ButtonComponent :variant="Variant.Contained" :size="Size.Large">
        <PlusIcon />
        <span>Создать команду</span>
      </ButtonComponent>
    </div>

    <CreateProjectModal :show="createDialog"
                        @closeDialog="createDialog = false"
                        @projectCreated="updateRecentProjects" />

    <CardsBlock title="Вы недавно открывали" :cards="cards" />
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/ButtonComponent.vue";
import PlusIcon from "../Header/Icons/PlusIcon.vue";
import ImportIcon from "./Icons/ImportIcon.vue";
import ProjectsIcon from "./Icons/ProjectsIcon.vue";
import CardsBlock from "./CardsBlock.vue";
import {Size, Variant} from "@/utils/types/global.types";
import {onBeforeMount, reactive, ref} from "vue";
import CreateProjectModal
  from "@/modules/Dashboard/components/CreateProjectModal.vue";
import {getRecentProjects} from "@/utils/services/projects.service";
import Search from "../Header/Search.vue";
import {useAuthStore} from "@/stores/auth.store";

const createDialog = ref<Boolean>(false);
const page = ref<number>(1);
const cards = ref(null);
const auth = useAuthStore();

onBeforeMount(async () => {
  cards.value = await getRecentProjects(page.value, auth.currentUser?.id);
});

async function updateRecentProjects() {
  cards.value = await getRecentProjects(page.value, auth.currentUser?.id);
}
</script>

<style>
@import "../../assets/recent.scss";
</style>
