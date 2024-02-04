<template>
  <div class="container">
    <Header :projectName :projectPublic="project?.public" />
    <div class="editor">
      <Sidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
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
  ServerToClientEvents, User
} from "@/utils/types/global.types";
import {getProject, getProjectRoom} from "@/utils/services/projects.service";
import Header from "@/modules/Dashboard/components/Header/Header.vue";
import Sidebar from "@/modules/Project/components/Sidebar/Sidebar.vue";
import {io, Socket} from "socket.io-client";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io("http://localhost:3000", {
  autoConnect: false,
});

const socketConnected = ref<boolean>(socket.connected);
const location = useRoute();
const project = ref<Project | null>(null)
const loading = computed<boolean>(() => project.value === null);
const projectName = computed<string>(() => {
  if (project.value !== null) {
    return project.value.name || project.value.codeName
  } else {
    return "";
  }
});
const projectRoom = ref(null);

watchEffect(async () => {
  if (socketConnected.value) {
    projectRoom.value = await getProjectRoom(project.value?.codeName);
  }
})

onBeforeMount(async () => {
  project.value = await getProject(location.params.projectName.toString());

  const user: User = {
    id: 1,
    accessToken: "123",
    email: "email@gmail.com",
  }
  const joinEvent = {
    user,
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
