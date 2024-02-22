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
                      :node="filesTree[child]"
                      :eventBus
                      :level="0"
                      @action="emit('fileAction', $event)"
                      @selectSubtree="changeSubtree"
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
  Changes,
  FileMap, FileNode,
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
const emit = defineEmits(["openFile", "toggleShowForm",
  "createFile", "fileAction"]);
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
const contextNode = ref<FileNode | null>(null);
const contextMenuNodePath = ref<string | null>(null);
const menuX = ref(0);
const menuY = ref(0);

const showContextMenu = (event, path: string, node: FileNode) => {
  showContext.value = true;
  contextNode.value = node;
  contextMenuNodePath.value = path;
  menuX.value = event.x;
  menuY.value = event.y;
};

function handleActionClick(action) {
  props.eventBus.emit("contextAction", {
    action,
    path: contextMenuNodePath.value,
    node: contextNode.value,
  });
  showContext.value = false;
}

watch(() => showNewFileForm.value, handleShowNewFileForm);

onBeforeMount(() => {
  props.socket.on("newFile", insertNewFile);
  props.eventBus.on("newFileClick", handleNewFileClick);
  props.eventBus.on("changes", handleChanges);
});

onBeforeUnmount(() => {
  props.socket.off('newFile', insertNewFile);
  props.eventBus.off("newFileClick", handleNewFileClick);
  props.eventBus.off("changes", handleChanges);
});

function handleNewFileClick(data: {type: FileType, extension: string | null}) {
  newFile.type = data.type;
  newFile.extension = data.extension;
}

function handleChanges(data: Changes) {
  if (data.action === "edit") {
    return;
  }

  console.log(data)
  switch (data.action) {
    case "rename": return renameFile(data.file.path, data.changedFile.name);
    case "delete": return deleteFile(data.file.path);
    default: return;
  }
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
  currentSubTree.id = null;
  currentSubTree.path = '';
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

function renameFile(filePath: string, newFilename: string): void {
  const nodeInfo = findNodeByPath(filePath);
  if (nodeInfo) {
    const { targetNode, filename } = nodeInfo;
    const node = targetNode[filename];
    delete targetNode[filename];
    targetNode[newFilename] = node;
  }
}

function deleteFile(filePath: string): void {
  const nodeInfo = findNodeByPath(filePath);
  if (nodeInfo) {
    const { targetNode, filename } = nodeInfo;
    delete targetNode[filename];
  }
}

function transferFile(sourcePath: string, destinationPath: string): void {
  const sourceNodeInfo = findNodeByPath(sourcePath);
  const destinationNodeInfo = findNodeByPath(destinationPath);

  if (sourceNodeInfo && destinationNodeInfo) {
    const { targetNode: sourceNode, filename: sourceFilename } = sourceNodeInfo;
    const { targetNode: destinationNode, filename: destinationFilename } = destinationNodeInfo;

    const node = sourceNode[sourceFilename];
    delete sourceNode[sourceFilename];
    destinationNode[destinationFilename] = node;
  }
}

function findNodeByPath(path: string): { targetNode: FileMap, filename: string } | undefined {
  const pathParts = path.split('/');
  let currentNode: FileMap = filesTree.value;
  let filename = '';

  for (let i = 0; i < pathParts.length; i++) {
    filename = pathParts[i];
    if (typeof currentNode[filename] === 'string') {
      break;
    } else if (i !== pathParts.length - 1) {
      currentNode = currentNode[filename].content as FileMap;
    }
  }

  if (filename) {
    return { targetNode: currentNode, filename };
  } else {
    return undefined;
  }
}
</script>
