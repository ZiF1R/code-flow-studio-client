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
              <div v-for="file in fileOptions" :key="file.id"
                   class="create-action" @click="() =>
                   handleNewFileClick(file.type, file.extension)">
                <keep-alive>
                  <component :is="file.icon" />
                </keep-alive>
                <span>{{file.name}}</span>

                <template v-if="file.options.length">
                  <v-menu open-on-hover
                          location="end"
                          activator="parent">
                    <v-list>
                      <div v-for="option in file.options"        :key="option.id"
                           class="create-action"
                           @click.stop="() =>
                   handleNewFileClick(file.type, option.extension)"
                      >
                        <keep-alive>
                          <component :is="option.icon" />
                        </keep-alive>
                        <span>{{option.name}}</span>
                      </div>
                    </v-list>
                  </v-menu>
                </template>
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
        <component :socket :eventBus :is="activeTab?.component"
                   @fileAction="emit('fileAction', $event)"
                   @openFile="emit('openFile', $event)"
                   @toggleShowForm="showNewFileForm = $event"
                   @createFile="emit('createFile', $event)"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps, provide,
  reactive,
  ref,
  shallowRef,
  watch
} from "vue";
import FilesTree
  from "@/modules/Project/components/Sidebar/Tabs/FilesTree.vue";
import SearchTab from "@/modules/Project/components/Sidebar/Tabs/SearchTab.vue";
import GitTab from "@/modules/Project/components/Sidebar/Tabs/GitTab.vue";
import IconAsyncComponent from "@/components/IconAsyncComponent.vue";
import PlusIcon from "@/modules/Dashboard/components/Header/Icons/PlusIcon.vue";
import MenuIcon from "@/modules/Project/components/Icons/MenuIcon.vue";
import FileIcon from "@/modules/Project/components/Icons/FileIcon.vue";
import FolderIcon from "@/modules/Project/components/Icons/FolderIcon.vue";
import {Socket} from "socket.io-client";
import {TinyEmitter} from "tiny-emitter";

const props = defineProps<{
  socket: Socket,
  eventBus: TinyEmitter
}>();
const emit = defineEmits(["createFile", "openFile", "fileAction"]);

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
    component: shallowRef(FilesTree),
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

const fileOptions = reactive([
  {
    id: 1,
    icon: shallowRef(FileIcon),
    name: "Файл",
    type: "file",
    extension: null,
    options: [
      {
        id: 1,
        name: "HTML",
        icon: shallowRef(FileIcon),
        extension: "html",
      },
      {
        id: 2,
        name: "CSS",
        icon: shallowRef(FileIcon),
        extension: "css",
      },
      {
        id: 3,
        name: "JavaScript",
        icon: shallowRef(FileIcon),
        extension: "js",
      },
      {
        id: 4,
        icon: shallowRef(FileIcon),
        name: "TypeScript",
        extension: "ts",
      },
    ],
  },
  {
    id: 2,
    icon: shallowRef(FolderIcon),
    name: "Папка",
    type: "folder",
    extension: null,
    options: [],
  }
]);
const showNewFileForm = ref<boolean>(false);
provide("showNewFileForm", showNewFileForm);

function handleNewFileClick(type, extension) {
  props.eventBus.emit("newFileClick", {type, extension});
  showNewFileForm.value = true;
}
</script>
