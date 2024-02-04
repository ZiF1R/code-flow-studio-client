<template>
  <div class="editor-sidebar">
    <header class="sidebar__header">
      <div class="sidebar__tabs">
        <div class="sidebar-tab" :class="{tab_active: activeTab === tab}"
             v-for="tab
         in tabs"
             :key="tab.id"
             @click="activeTab = tab">
          <IconAsyncComponent :icon-name="tab.icon" :base-url="iconBaseUrl" />
          <v-tooltip
            activator="parent"
            location="top"
          >
            {{tab.name}}
          </v-tooltip>
        </div>
      </div>
      <div class="sidebar__actions">
        <div v-show="activeTab.id === 1" class="sidebar-action">
          <PlusIcon />
          <v-tooltip
            activator="parent"
            location="top"
          >
            Создать
          </v-tooltip>
          <v-menu activator="parent">
            <v-list>
              <div class="create-action">
                <FileIcon />
                <span>Файл</span>

                <v-menu open-on-hover location="end" activator="parent">
                  <v-list>
                    <div class="create-action">
                      <FileIcon />
                      <span>HTML</span>
                    </div>
                    <div class="create-action">
                      <FileIcon />
                      <span>CSS</span>
                    </div>
                    <div class="create-action">
                      <FileIcon />
                      <span>JavaScript</span>
                    </div>
                    <div class="create-action">
                      <FileIcon />
                      <span>TypeScript</span>
                    </div>
                  </v-list>
                </v-menu>
              </div>
              <div class="create-action">
                <FolderIcon />
                <span>Папка</span>
              </div>
            </v-list>
          </v-menu>
        </div>
        <div class="sidebar-action" @click="showMenu = !showMenu">
          <MenuIcon />
          <v-tooltip
            activator="parent"
            location="top"
          >
            {{menuText}}
          </v-tooltip>
        </div>
      </div>
    </header>

    <div class="sidebar__tab-content">
      <keep-alive>
        <component :is="activeTab?.component" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref, shallowRef} from "vue";
import StructureTab
  from "@/modules/Project/components/Sidebar/Tabs/StructureTab.vue";
import SearchTab from "@/modules/Project/components/Sidebar/Tabs/SearchTab.vue";
import GitTab from "@/modules/Project/components/Sidebar/Tabs/GitTab.vue";
import IconAsyncComponent from "@/components/IconAsyncComponent.vue";
import PlusIcon from "@/modules/Dashboard/components/Header/Icons/PlusIcon.vue";
import MenuIcon from "@/modules/Project/components/Icons/MenuIcon.vue";
import FileIcon from "@/modules/Project/components/Icons/FileIcon.vue";
import StructureFileIcon
  from "@/modules/Project/components/Icons/StructureFileIcon.vue";
import FolderIcon from "@/modules/Project/components/Icons/FolderIcon.vue";

type Tab = {
  id: number,
  name: string,
  component: Object,
  icon: string,
}

const iconBaseUrl = ref<string>("../modules/Project/components/Icons/");
const tabs = reactive<Tab[]>([
  {
    id: 1,
    name: 'Структура',
    component: shallowRef(StructureTab),
    icon: 'FileIcon',
  },
  {
    id: 2,
    name: 'Поиск',
    component: shallowRef(SearchTab),
    icon: 'SearchIcon',
  },
  {
    id: 3,
    name: 'Git',
    component: shallowRef(GitTab),
    icon: 'GitIcon',
  },
]);
const activeTab = ref<Tab>(tabs[0]);
const showMenu = ref<boolean>(true);
const menuText = computed<string>(() => {
  if (showMenu.value) {
    return 'Скрыть боковую панель';
  } else {
    return 'Показать боковую панель';
  }
});
</script>

<style lang="scss">

</style>
