<template>
  <v-list-item v-if="node.type === 'file'" class="tree-node"
               :class="{'tree-node_placeholder': node.placeholder}"
               :prepend-icon="node.placeholder ? 'mdi-plus':
               'mdi-file-outline'"
               @click="emit('openFile', title)"
               @contextmenu.prevent="showContextMenu"
  >
    <v-list-item-title>{{title}}</v-list-item-title>
  </v-list-item>

  <v-list-group v-if="node.type === 'folder'" :value="node.id">
    <template v-slot:activator="{ props }">
      <v-list-item class="tree-node tree-folder" v-bind="props"
                   prepend-icon="mdi-folder-outline" @click="selectSubtree"
                   :class="{'tree-folder_active': currentSubTree.id ===
                   node.id}"
                   @contextmenu.prevent="showContextMenu">
        <v-list-item-title>{{title}}</v-list-item-title>
      </v-list-item>
    </template>
    <template v-for="child of Object.keys(node.content)" :key="node.content[child].id">
      <FileTreeNode :title="child"
                    :node="node.content[child]" @selectSubtree="changeSubtree"
                    @openFile="emit('openFile', `${title}/${$event}`)"
                    @showContextMenu="showContextMenu"
      />
    </template>
  </v-list-group>
</template>

<script setup lang="ts">
import {defineProps} from "vue/dist/vue";
import {FileNode} from "@/utils/types/global.types";
import {defineEmits, inject, ref} from "vue";
import ContextMenu
  from "@/components/ContextMenu.vue";

const props = defineProps<{
  title: string,
  node: FileNode
}>();
const emit = defineEmits(["selectSubtree", "openFile", "showContextMenu"]);
const currentSubTree = inject<{
  id: number | null,
  path: string
}>("currentSubTree");

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

function showContextMenu(event, path: string | undefined) {
  const nativeEvent = event instanceof PointerEvent;

  if (nativeEvent) {
    event.preventDefault();
  }

  const x = nativeEvent ? event.clientX : event.x;
  const y = nativeEvent ? event.clientY : event.y;
  emit("showContextMenu", {x, y}, `${props.title}${path ? '/' + path : ''}`);
}
</script>
