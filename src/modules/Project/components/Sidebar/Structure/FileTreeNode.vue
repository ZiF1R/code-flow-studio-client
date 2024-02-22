<template>
  <div v-if="node.type === 'file'" class="tree-node"
       :class="{'tree-node_placeholder': node.placeholder}"
       :style="{marginLeft: `${20 * level}px`}"
       @click="emit('openFile', title)"
       @contextmenu.prevent.stop="(e) => showContextMenu(e, undefined, node)"
       @blur="finishRename"
       @keydown.enter="finishRename"
  >
    <PlusIcon v-if="node.placeholder"/>
    <FileIcon v-else/>
    <span v-show="!renameAction">
      {{newTitle}}
    </span>
    <input v-show="renameAction" :id="`input${node.id}`" v-model.trim="newTitle"
           class="editable-block"
           @blur="finishRename" @keydown.enter="finishRename">
  </div>

  <v-list-group v-if="node.type === 'folder'" :value="node.id">
    <template v-slot:activator="{ props }">
      <div class="tree-node tree-folder" v-bind="props"
           :style="{marginLeft: `${20 * level}px`}"
           :class="{'tree-folder_active': currentSubTree.id ===
                   node.id}"
           @click="selectSubtree"
           @contextmenu.prevent.stop="(e) => showContextMenu(e, undefined, node)">
        <div>
          <FolderIcon/>
          <span v-show="!renameAction">{{newTitle}}</span>
          <input v-show="renameAction" :id="`input${node.id}`"
                 v-model.trim="newTitle"
                 class="editable-block"
                 @blur="finishRename" @keydown.enter="finishRename">
        </div>
<!--        ArrowIcon -->
      </div>
    </template>
    <template v-for="child of Object.keys(node.content)" :key="node.content[child].id">
      <FileTreeNode :title="child"
                    :node="node.content[child]"
                    :eventBus
                    :level="level + 1"
                    @action="handleNodeAction"
                    @selectSubtree="changeSubtree"
                    @openFile="emit('openFile', `${title}/${$event}`)"
                    @showContextMenu="showContextMenu"
      />
    </template>
  </v-list-group>
</template>

<script setup lang="ts">
import {defineProps} from "vue/dist/vue";
import {ContextMenuAction, FileNode} from "@/utils/types/global.types";
import {
  defineEmits,
  inject, nextTick,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  watch
} from "vue";
import ContextMenu
  from "@/components/ContextMenu.vue";
import {TinyEmitter} from "tiny-emitter";
import PlusIcon from "@/modules/Dashboard/components/Header/Icons/PlusIcon.vue";
import FileIcon from "@/modules/Project/components/Icons/FileIcon.vue";
import FolderIcon from "@/modules/Project/components/Icons/FolderIcon.vue";
import {debounce, throttle} from "@/utils/helpers/helpers";

const props = defineProps<{
  title: string,
  node: FileNode,
  eventBus: TinyEmitter,
  level: number
}>();
const emit = defineEmits(["selectSubtree", "openFile", "showContextMenu",
  "action"]);
const currentSubTree = inject<{
  id: number | null,
  path: string
}>("currentSubTree");

const newTitle = ref<string>(props.title);
const renameAction = ref<boolean>(false);

watch(() => props.title, (val) => newTitle.value = val);

onBeforeMount(() => {
  props.eventBus.on("contextAction", handleContextAction);
});

onBeforeUnmount(() => {
  props.eventBus.off("contextAction", handleContextAction);
});

const finishRename = throttle(() => {
  if (newTitle.value.trim() === '') {
    newTitle.value = props.title;
  } else if (newTitle.value !== props.title) {
    emitFileAction('rename');
  }
  renameAction.value = false;
}, 100);

function emitFileAction(action: string) {
  const file = {
    name: props.title,
    type: props.node.type,
    path: props.title,
    content: props.node.content,
  };
  emit("action", {
    file,
    action,
    changedFile: {
      ...file,
      path: newTitle.value,
      name: newTitle.value,
      removed: action === 'delete',
    }
  });
}

function handleNodeAction(data) {
  data.file.path = `${props.title}/${data.file.path}`;
  data.changedFile.path = `${props.title}/${data.changedFile.path}`;
  emit("action", data);
}

function changeSubtree(data: {id: number, path: string}) {
  emit("selectSubtree", {
    id: data.id,
    path: `${props.title}/${data.path}`,
  });
}

function selectSubtree() {
  emit("selectSubtree", {
    id: props.node.id,
    path: props.title
  });
}

function showContextMenu(event, path: string | undefined, node: FileNode |
  null) {
  const nativeEvent = event instanceof PointerEvent;

  if (nativeEvent) {
    event.preventDefault();
  }

  const x = nativeEvent ? event.clientX : event.x;
  const y = nativeEvent ? event.clientY : event.y;
  emit("showContextMenu", {x, y}, `${props.title}${path ? '/' + path : ''}`,
    node || props.node);
}

function handleContextAction(data: ContextMenuAction) {
  if (data.node.id === props.node.id) {
    if (data.action === 'rename') {
      renameAction.value = true;
      nextTick(() => {
        const input = document.getElementById('input' + props.node.id);
        input?.focus();
      });
    } else if (data.action === 'delete') {
      emitFileAction('delete');
    }
  }
}
</script>
