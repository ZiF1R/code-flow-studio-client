<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.store";
import {onBeforeMount} from "vue";

const auth = useAuthStore();
onBeforeMount(async () => {
  await auth.loadUser();
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
