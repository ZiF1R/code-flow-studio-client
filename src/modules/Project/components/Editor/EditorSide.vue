<template>
  <div class="editor">
    <header class="editor__tabs">
      <div v-for="tab in tabs" :key="tab.id" class="editor__tab"
           :class="{tab_active: activeTab?.id === tab.id}" @click="activeTab
           = tab">
        <FileIcon class="file-icon" />
        <span>{{tab.name}}</span>
        <CloseIcon class="close-icon" @click.stop="() => closeTab(tab.path)" />
      </div>
    </header>
    <div v-if="tabs.length" class="active-tab__content">
      <textarea v-if="activeTab === null"></textarea>
      <textarea v-else :value="activeTab?.content"
                @input="e => activeTab.content = e.target.value"></textarea>
    </div>
    <p v-else class="pa-4">Откройте файл для того чтобы увидеть содержимое</p>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onBeforeMount, onBeforeUnmount, ref} from "vue";
import FileIcon from "@/modules/Project/components/Icons/FileIcon.vue";
import CloseIcon from "@/components/Icons/CloseIcon.vue";
import {TinyEmitter} from "tiny-emitter";

const props = defineProps<{
  eventBus: TinyEmitter
}>();

type EditorTab = {
  id: number,
  name: string,
  path: string,
  content: string,
};

const tabs = ref<EditorTab[]>([]);
const activeTab = ref<EditorTab | null>(null);

onBeforeMount(() => {
  props.eventBus.on("openFile", handleOpenFile);
});

onBeforeUnmount(() => {
  props.eventBus.off("openFile", handleOpenFile);
});

function isOpened(tabPath: string): boolean {
  return tabs.value.findIndex(tab => tab.path === tabPath) !== -1;
}

function getTabByPath(path: string): EditorTab | undefined {
  return tabs.value.find(tab => tab.path === path);
}

function closeTab(path: string): void {
  tabs.value = tabs.value.filter(tab => tab.path !== path);
  if (tabs.value.length > 0) {
    activeTab.value = tabs.value[0];
  } else {
    activeTab.value = null;
  }
}

function handleOpenFile(data: {content: string, path: string}): void {
  const {content, path} = data;

  if (isOpened(path)) {
    activeTab.value = getTabByPath(path) || null;
  } else {
    tabs.value.push({
      id: Date.now(),
      name: path.split('/').pop(),
      path,
      content,
    });
    activeTab.value = tabs.value[tabs.value.length - 1];
  }
}
</script>
