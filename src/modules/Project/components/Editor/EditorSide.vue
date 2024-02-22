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
    <div class="active-tab__content">
      <codemirror
        v-model="code"
        style="height: 100%;"
        placeholder="Откройте файл для того чтобы увидеть содержимое..."
        :disabled="!activeTab"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, shallowRef, watch} from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import {defineProps, onBeforeMount, onBeforeUnmount, ref} from "vue";
import FileIcon from "@/modules/Project/components/Icons/FileIcon.vue";
import CloseIcon from "@/components/Icons/CloseIcon.vue";
import {TinyEmitter} from "tiny-emitter";
import {getLanguagePackage} from "@/utils/helpers/editor-languages";

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
const code = ref<string>('');

onBeforeMount(() => {
  props.eventBus.on("openFile", handleOpenFile);
});

onBeforeUnmount(() => {
  props.eventBus.off("openFile", handleOpenFile);
});

watch(
  () => activeTab.value,
  async (val) => {
    currentLanguage.value
      = getLanguagePackage(getFileExtension(val?.name));
    code.value = val?.content;
  },
);

watch(
  () => code.value,
  async (val) => {
    activeTab.value.content = val;
  },
);

const currentLanguage = ref(javascript);
const extensions = computed(() => {
  // console.log(currentLanguage.value)
  return [currentLanguage.value(), oneDark];
});

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view
}

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
  const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
  // more state info ...
  // return ...
}

async function loadLanguageExtension(extension: string) {

}

function getFileExtension(fileName: string): string {
  return fileName.split('.').pop();
}

function isOpened(tabPath: string): boolean {
  return tabs.value.findIndex(tab => tab.path === tabPath) !== -1;
}

function getTabByPath(path: string): EditorTab | undefined {
  return tabs.value.find(tab => tab.path === path);
}

function closeTab(path: string): void {
  tabs.value = tabs.value.filter(tab => tab.path !== path);
  if (tabs.value.length > 0) {
    if (activeTab.value.path === path) {
      activeTab.value = tabs.value[0];
    }
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
