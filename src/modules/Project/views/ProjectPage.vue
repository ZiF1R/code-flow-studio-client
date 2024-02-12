<template>
  <div class="container">
    <template v-if="hasAccess">
      <Header :projectName :projectPublic="project?.public"
              :roomUsers="projectRoom?.users" :owner="project?.userId ===
              auth.currentUser?.id" />
      <main id="projectContent" class="project-page__content">
        <Sidebar :socket
                 :eventBus
                 @openFile="handleOpenFile"
                 @createFile="handleCreateFile" />
        <EditorContainer :eventBus />
      </main>
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
import {
  FileMap, ProjectFile,
  ProjectRoom,
  User,
  Variant
} from "@/utils/types/global.types";
import {useRoute} from "vue-router";
import {
  computed,
  onBeforeMount,
  onBeforeUnmount, provide,
  ref,
  watchEffect
} from "vue";
import {
  ClientToServerEvents,
  Project,
  ServerToClientEvents
} from "@/utils/types/global.types";
import {
  getProject,
  getProjectRoom,
  openFile, updateVisitDate
} from "@/utils/services/projects.service";
import Header from "@/modules/Dashboard/components/Header/Header.vue";
import Sidebar from "@/modules/Project/components/Sidebar/Sidebar.vue";
import {io, Socket} from "socket.io-client";
import {useAuthStore} from "@/stores/auth.store";
import ButtonComponent from "@/components/ButtonComponent.vue";
import EditorContainer from "@/modules/Project/components/Editor/EditorContainer.vue";
import {TinyEmitter} from "tiny-emitter";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io("http://localhost:3000", {
  autoConnect: false,
});

const eventBus = new TinyEmitter();

const socketConnected = ref<boolean>(socket.connected);
const location = useRoute();
const project = ref<Project | null>(null)
const hasAccess = ref<boolean>(true);
const projectName = computed<string>(() => {
  if (project.value !== null) {
    return project.value.name || project.value.codeName
  } else {
    return "";
  }
});
const filesTree = ref<FileMap>({});
const projectRoom = ref<ProjectRoom | null>(null);
const auth = useAuthStore();
provide('filesTree', filesTree);

watchEffect(async () => {
  if (socketConnected.value) {
    projectRoom.value = await getProjectRoom(location.params.projectName.toString());
    await updateVisitDate(project.value?.id, auth.currentUser?.id);
  }
});

function handleCreateFile(data: ProjectFile) {
  socket.emit("newFile", {
    file: data,
    projectName: project.value?.codeName,
  });
}

async function handleOpenFile(path: string) {
  const fileContent = await openFile(project.value?.codeName, path);
  eventBus.emit("openFile", {
    path,
    content: fileContent
  })
}

onBeforeMount(async () => {
  const data = await getProject(location.params.projectName.toString(),
    auth.currentUser?.id);
  project.value = data?.project;
  filesTree.value = data?.filesTree;

  if (project.value === null) {
    hasAccess.value = false;
  }

  const joinEvent = {
    user: auth.currentUser,
    projectName: project.value?.codeName || ''
  }

  socket.on("connect", () => {
    socket.emit("joinProject", joinEvent);
    socketConnected.value = true;
  });

  socket.on('userJoin', (user: User) => {
    projectRoom.value?.users.push(user);
  });

  socket.on('userLeave', (user: User) => {
    projectRoom.value.users = projectRoom.value?.users.filter(usr => usr.id
      !== user.id);
  });

  socket.on('changes', (e) => {
    console.log('changes', e)
  });

  socket.on('disconnect', () => {
    socketConnected.value = false;
  });

  socket.connect();
});

onBeforeUnmount(() => {
  socket.disconnect();

  socket.off('connect');
  socket.off('disconnect');
  socket.off('changes');
  socket.off('newFile');
  socket.off('userJoin');
});
</script>

<style lang="scss">
@import "../assets/editor";
</style>
