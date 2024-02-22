<template>
  <div class="dashboard-container container">
    <Header />
    <main>
      <Sidebar />
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Header/Header.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import {onMounted, onUnmounted, provide, ref} from "vue";
import {DefaultTemplates, UserTemplates} from "@/utils/types/global.types";
import {
  fetchDefaultTemplates, fetchUserTemplates,
} from "@/utils/services/projects.service";
import {useCheckMobile} from "@/utils/helpers/useCheckMobile";
import {useAuthStore} from "@/stores/auth.store";

let defaultTemplates = ref<DefaultTemplates | null>(null);
let userTemplates = ref<UserTemplates | null>(null);
const { isMobile } = useCheckMobile();
const auth = useAuthStore();

provide("templates", {defaultTemplates, userTemplates})
provide("isMobile", isMobile)

onMounted(async () => {
  defaultTemplates.value = await fetchDefaultTemplates();
  userTemplates.value = await fetchUserTemplates(auth.currentUser?.id);
});
</script>

<style lang="scss">
@import "../assets/dashboard.scss";
</style>
