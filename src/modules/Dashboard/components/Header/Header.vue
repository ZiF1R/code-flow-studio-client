<template>
  <header class="dashboard__header">
<!--    <Menu />-->
    <router-link to="/" class="logo-icon">
      <LogoIcon />
    </router-link>

    <div class="project-title" v-show="isProjectPage">
      <router-link :to="{ name: 'recent' }">Проекты</router-link>
      <span>/</span>
      <span class="project-name">{{props.projectName}}</span>
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
import PlusIcon from "./Icons/PlusIcon.vue";
import NotificationsIcon from "./Icons/NotificationsIcon.vue";
import Menu from "./Menu.vue";
import { Size, Variant } from "@/utils/types/global.types";
import PreferencesIcon
  from "@/modules/Dashboard/components/Header/Icons/PreferencesIcon.vue";
import LogoIcon from "@/components/Icons/LogoIcon.vue";
import {computed, defineProps} from "vue";
import {useRoute} from "vue-router";
import PublicIcon
  from "@/modules/Dashboard/components/Header/Icons/PublicIcon.vue";
import ChatIcon from "@/modules/Dashboard/components/Header/Icons/ChatIcon.vue";
import TasksIcon from "@/modules/Dashboard/components/Header/Icons/TasksIcon.vue";
import ShareIcon from "@/modules/Dashboard/components/Header/Icons/ShareIcon.vue";

const props = defineProps<{
  projectName: string,
  projectPublic: boolean
}>();

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
