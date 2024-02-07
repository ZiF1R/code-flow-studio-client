<template>
  <div class="container">
    <template v-if="hasAccess">
      <Header :projectName :projectPublic="project?.public"
              :roomUsers="projectRoom?.users" />
      <div class="editor">
        <Sidebar />
      </div>
    </template>
    <template v-else>
      <v-dialog
        :model-value="!hasAccess"
        width="auto"
        persistent
      >
        <v-card
          width="400"
          title="Запрет в доступе"
          text="У вас нет доступа для просмотра данного проекта, попробуйте попросить создателя дать вам доступ для просмотра"
        >
          <v-card-actions>
            <v-spacer />
            <router-link :to="{ name: 'recent' }" style="text-decoration:
            none; ">
              <ButtonComponent :variant="Variant.Primary">
                Вернуться
              </ButtonComponent>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script setup lang="ts">
import {Size, Variant} from "@/utils/types/global.types";
import {useRoute} from "vue-router";
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  reactive,
  ref,
  watchEffect
} from "vue";
import {
  ClientToServerEvents,
  Project,
  ServerToClientEvents
} from "@/utils/types/global.types";
import {getProject, getProjectRoom} from "@/utils/services/projects.service";
import Header from "@/modules/Dashboard/components/Header/Header.vue";
import Sidebar from "@/modules/Project/components/Sidebar/Sidebar.vue";
import {io, Socket} from "socket.io-client";
import {useAuthStore} from "@/stores/auth.store";
import ButtonComponent from "@/components/ButtonComponent.vue";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io("http://localhost:3000", {
  autoConnect: false,
});

const socketConnected = ref<boolean>(socket.connected);
const location = useRoute();
const project = ref<Project | null>(null)
const loading = computed<boolean>(() => project.value === null);
const hasAccess = ref<boolean>(true);
const projectName = computed<string>(() => {
  if (project.value !== null) {
    return project.value.name || project.value.codeName
  } else {
    return "";
  }
});
const projectRoom = ref(null);
const auth = useAuthStore();

watchEffect(async () => {
  if (socketConnected.value) {
    projectRoom.value = await getProjectRoom(location.params.projectName.toString());
  }
})

onBeforeMount(async () => {
  project.value = await getProject(location.params.projectName.toString(),
    auth.currentUser?.id);

  if (project.value === null) {
    hasAccess.value = false;
  }

  const joinEvent = {
    user: auth.currentUser,
    projectName: project.value?.codeName || ''
  }

  socket.on("connect", () => {
    console.log('connected')
    socket.emit("joinProject", joinEvent);
    socketConnected.value = true;
  });

  socket.on('disconnect', () => {
    socketConnected.value = false;
  });

  socket.on('changes', (e) => {
    console.log(e)
  });

  socket.connect();
});

onBeforeUnmount(() => {
  socket.disconnect();

  socket.off('connect');
  socket.off('disconnect');
  socket.off('changes');
});
</script>

<style lang="scss">
@import "../assets/editor";
</style>
