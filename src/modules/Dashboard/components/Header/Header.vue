<template>
  <header class="dashboard__header">
    <Menu />
    <Search />

    <div class="header__buttons">
      <ButtonComponent :variant="Variant.Text" :size="Size.Small">
        <PlusIcon />
        <span>Create</span>
      </ButtonComponent>

<!--      {/* when open the project */}-->

<!--      {/*<Button variant={Variant.Text} size={Size.Small}>*/}-->
<!--      {/*  <ChatIcon />*/}-->
<!--      {/*  <span>Chat</span>*/}-->
<!--      {/*</Button>*/}-->
<!--      {/*<Button variant={Variant.Text} size={Size.Small}>*/}-->
<!--      {/*  <TasksIcon />*/}-->
<!--      {/*  <span>Tasks</span>*/}-->
<!--      {/*</Button>*/}-->

      <ButtonComponent :variant="Variant.Text" :size="Size.Small">
        <NotificationsIcon />
      </ButtonComponent>
    </div>
  </header>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
import PlusIcon from "./Icons/PlusIcon.vue";
import NotificationsIcon from "./Icons/NotificationsIcon.vue";
import Search from "./Search.vue";
import Menu from "./Menu.vue";
import { Size, Variant } from "@/utils/types/global.types";

export default {
  name: "Header",

  components: {
    ButtonComponent,
    PlusIcon,
    NotificationsIcon,
    Search,
    Menu
  },

  data() {
    return {
      Size,
      Variant
    }
  },
}
</script>

<style>
@import "../../assets/header.scss";
</style>
