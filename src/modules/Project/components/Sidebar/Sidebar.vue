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

    <v-dialog
      :model-value="showNewFileForm"
      @update:modelValue="() => showNewFileForm = !showNewFileForm"
      width="auto"
    >
      <v-card width="400">
        <v-card-title>
          Создать {{newFile.type === 'file' ? 'файл' : 'папку'}}
        </v-card-title>
        <v-card-text>
          <v-text-field label="Название"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <ButtonComponent :variant="Variant.Contained">
            Создать
          </ButtonComponent>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="sidebar__tab-content">
      <keep-alive>
        <component :is="activeTab?.component" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Size, Variant} from "@/utils/types/global.types";
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
import {ProjectFile} from "@/utils/types/global.types";
import ButtonComponent from "@/components/ButtonComponent.vue";

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
const newFile = reactive<ProjectFile>({
  name: "",
  extension: null,
  type: null,
});
const showNewFileForm = ref<boolean>(false);

function handleNewFileClick(type, extension) {
  console.log(showNewFileForm.value)
  newFile.type = type;
  newFile.extension = extension;
  showNewFileForm.value = true;
}
</script>
