<template>
  <div class="overlay" @click="emit('close')" @contextmenu.prevent=""></div>
  <div
    class="fixed h-1/3 z-50 context-menu"
    :style="{ top: y + 'px', left: x + 'px' }"
  >
    <div
      v-for="action in actions"
      :key="action.action"
      @click="emitAction(action.action)"
    >
      {{ action.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps} from "vue";

const { actions, x, y } = defineProps(['actions', 'x', 'y']);
const emit = defineEmits(['actionClicked', 'close']);

const emitAction = (action) => {
  emit('actionClicked', action);
};
</script>

<style lang="scss">
.context-menu {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  z-index: 50;
}

.context-menu div {
  padding: 10px;
  cursor: pointer;
}

.context-menu div:hover {
  background-color: #f0f0f0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 49;
}

.overlay::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
}

.overlay:hover {
  cursor: pointer;
}
</style>
