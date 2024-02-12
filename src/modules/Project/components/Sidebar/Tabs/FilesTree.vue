<template>
  <div class="files-tree" @click.self="resetSubtree">
    <v-dialog
      :model-value="showNewFileForm"
      @update:modelValue="emit('toggleShowForm', !showNewFileForm)"
      width="auto"
    >
      <v-card width="400">
        <v-card-title>
          Создать {{newFile.type === 'file' ? 'файл' : 'папку'}}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model.trim="newFile.name"
                        label="Название"
                        @keydown.enter="handleFileCreate"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <ButtonComponent @click="handleFileCreate"
                           :variant="Variant.Contained">
            Создать
          </ButtonComponent>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-list v-if="Object.keys(filesTree).length > 0">
      <template v-for="child of Object.keys(filesTree)" :key="filesTree[child].id">
        <FileTreeNode :title="child"
                      :node="filesTree[child]" @selectSubtree="changeSubtree"
                      @openFile="emit('openFile', $event)"
                      @showContextMenu="showContextMenu"
        />
      </template>
    </v-list>

    <ContextMenu
      v-if="showContext"
      :x="menuX"
      :y="menuY"
      :actions="contextMenuActions"
      @close="showContext = false"
      @actionClicked="handleActionClick"
    />
  </div>
</template>

<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  inject,
  onBeforeMount, onBeforeUnmount, provide,
  reactive,
  Ref,
} from "vue";
import FileTreeNode
  from "@/modules/Project/components/Sidebar/Structure/FileTreeNode.vue";
import {
  FileMap,
  FileType,
  ProjectFile,
  Variant
} from "@/utils/types/global.types";
import {Socket} from "socket.io-client";
import {TinyEmitter} from "tiny-emitter";
import {watch} from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import {ref} from "vue";
import ContextMenu from "@/components/ContextMenu.vue";

const props = defineProps<{
  socket: Socket
  eventBus: TinyEmitter
}>();
const emit = defineEmits(["selectSubtree", "openFile", "toggleShowForm",
  "createFile", 'renameFile', 'deleteFile']);
const showNewFileForm = inject<Ref<boolean>>("showNewFileForm");
const filesTree = inject<Ref<FileMap | {}>>("filesTree");
const currentSubTree = reactive({
  path: '',
  id: null
});
provide("currentSubTree", currentSubTree);
const newFile = reactive<ProjectFile>({
  name: "",
  extension: null,
  type: null,
  path: '',
});
const contextMenuActions = ref([
  { label: 'Переименовать', action: 'rename' },
  { label: 'Удалить', action: 'delete' },
]);
const showContext = ref<boolean>(false);
const contextMenuNodePath = ref<string | null>(null);
const menuX = ref(0);
const menuY = ref(0);

const showContextMenu = (event, path: string) => {
  showContext.value = true;
  contextMenuNodePath.value = path;
  menuX.value = event.x;
  menuY.value = event.y;
};

function handleActionClick(action) {
  console.log(action);
}

watch(() => showNewFileForm.value, handleShowNewFileForm);

onBeforeMount(() => {
  props.socket.on("newFile", insertNewFile)
  props.eventBus.on("newFileClick", handleNewFileClick)
});

onBeforeUnmount(() => {
  props.socket.off('newFile', insertNewFile);
  props.eventBus.off("newFileClick", handleNewFileClick)
});

function handleNewFileClick(data: {type: FileType, extension: string | null}) {
  console.log(data)
  newFile.type = data.type;
  newFile.extension = data.extension;
}

function handleShowNewFileForm(val) {
  if (val) {
    insertNewFile({
      name: newFile.type === 'file' ? 'Новый файл' : "Новая папка",
      extension: null,
      path: currentSubTree.path,
      type: 'file',
    }, true);
  } else {
    removePlaceholder();
    clearNewFile();
  }
}

function handleFileCreate() {
  if (newFile.name.length === 0) {
    return;
  }
  const fileData = {
    ...newFile,
    path: currentSubTree.path
  };
  console.log(fileData)

  emit("createFile", fileData);
  emit("toggleShowForm", false);
  clearNewFile();
  insertNewFile(fileData);
}

function getTree(path: string) {
  if (path == '') return filesTree.value;

  try {
    return path.split('/').reduce((pre, current) => {
      return pre[current].content
    }, filesTree.value)
  } catch (err) {
    return undefined
  }
}

function clearNewFile() {
  newFile.name = "";
  newFile.type = null;
  newFile.extension = null;
}

function resetSubtree() {
  emit("selectSubtree", {
    id: null,
    path: '',
  });
}

function changeSubtree(data: {path: string, id: number}) {
  if (currentSubTree.path.startsWith(data.path)) {
    currentSubTree.id = null;
    currentSubTree.path = '';
  } else {
    currentSubTree.id = data.id;
    currentSubTree.path = data.path;
  }
}

function insertNewFile(data: ProjectFile, placeholder: boolean = false) {
  const currentTree = getTree(data.path);

  const fileName = data.name + (data.extension ? "." + data.extension : '');
  currentTree[fileName] = {
    id: Date.now(),
    type: data.type,
    content: data.type === 'file' ? '' : {}
  }

  if (placeholder) {
    currentTree[fileName].placeholder = true;
  }
}

function removePlaceholder() {
  const currentTree = getTree(currentSubTree.path);
  for (const file of Object.keys(currentTree)) {
    if (currentTree[file].placeholder) {
      delete currentTree[file];
      return;
    }
  }
}
</script>
