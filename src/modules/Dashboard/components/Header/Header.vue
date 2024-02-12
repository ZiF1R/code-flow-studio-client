<template>
  <header class="dashboard__header">
<!--    <Menu />-->
    <router-link to="/" class="logo-icon">
      <LogoIcon />
    </router-link>

    <div class="project-title" v-show="isProjectPage">
      <router-link :to="{ name: 'recent' }">Проекты</router-link>
      <span>/</span>
      <input :disabled="owner === false"
             class="project-name editable-block"
             v-model.trim="editableProjectName" />
      <div class="project-visibility">
        <PublicIcon :class="{public: projectPublic}" />
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          {{tooltipText}}
        </v-tooltip>
      </div>
    </div>

    <div class="header__buttons">
      <div v-if="roomUsers?.length" class="header__users">
        <div v-for="user in roomUsers" :key="user.id" class="user-avatar">
          <img :src="user?.picture" referrerpolicy="no-referrer">
          <v-tooltip
            activator="parent"
            location="bottom"
          >
            {{user.email}}
          </v-tooltip>
<!--          {{owner ? '(владелец)' : ''}}-->
        </div>
      </div>

      <template v-if="isProjectPage">
        <ButtonComponent :variant="Variant.Contained" :size="Size.Small">
          <ShareIcon />
          Поделиться
        </ButtonComponent>
        <ButtonComponent :variant="Variant.Contained" :size="Size.Small">
          <TasksIcon />
          Задачи
        </ButtonComponent>
        <ButtonComponent :variant="Variant.Contained" :size="Size.Small">
          <ChatIcon />
          Чат
        </ButtonComponent>
      </template>

      <ButtonComponent :variant="Variant.Text" :size="Size.Small">
        <NotificationsIcon />
      </ButtonComponent>
      <ButtonComponent :variant="Variant.Text" :size="Size.Small">
        <PreferencesIcon />
      </ButtonComponent>
    </div>
  </header>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/ButtonComponent.vue";
import NotificationsIcon from "./Icons/NotificationsIcon.vue";
import {Size, User, Variant} from "@/utils/types/global.types";
import PreferencesIcon
  from "@/modules/Dashboard/components/Header/Icons/PreferencesIcon.vue";
import LogoIcon from "@/components/Icons/FullLogoIcon.vue";
import {computed, defineProps, ref, watch} from "vue";
import {useRoute} from "vue-router";
import PublicIcon
  from "@/modules/Dashboard/components/Header/Icons/PublicIcon.vue";
import ChatIcon from "@/modules/Dashboard/components/Header/Icons/ChatIcon.vue";
import TasksIcon from "@/modules/Dashboard/components/Header/Icons/TasksIcon.vue";
import ShareIcon from "@/modules/Dashboard/components/Header/Icons/ShareIcon.vue";
import {useAuthStore} from "@/stores/auth.store";

const props = defineProps<{
  projectName?: string,
  projectPublic?: boolean
  roomUsers?: User[]
  owner: boolean
}>();

const editableProjectName = ref<string>('');

watch(
  () => props.projectName,
  (val) => editableProjectName.value = val
);

const auth = useAuthStore();
const route = useRoute();
const isProjectPage = computed<boolean>(() => route.name === 'project');
const tooltipText = computed<string>(() => {
  if (props.projectPublic) {
    return 'Этот проект доступен для просмотра другим пользователям';
  } else {
    return 'Проект не виден другим пользователям';
  }
});
</script>

<style>
@import "../../assets/header.scss";
</style>
