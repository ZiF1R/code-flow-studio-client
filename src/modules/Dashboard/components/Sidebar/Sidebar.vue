<template>
  <aside>
<!--    <TeamsSelect />-->

    <ul class="menu__list">
      <li v-for="(item, i) in menu" :key="i">
        <div v-if="item.divider" class="list__divider">
          {{item.name}}
        </div>
        <router-link v-else
                     :to="item.link"
                     @click="() => this.activeLink = i"
                     class="list__item"
                     :class="{item_active: activeLink === i}"
        >
          <IconAsyncComponent :base-url="menuIconsBaseUrl" :icon-name="item.icon" />
          <span>{{item.name}}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import IconAsyncComponent from "@/components/IconAsyncComponent.vue";

const menu = reactive([
  {
    icon: "RecentIcon",
    name: "Recent",
    link: "/dashboard/recent",
    divider: false,
  },
  {
    icon: "SharedIcon",
    name: "Shared with me",
    link: "/dashboard/shared",
    divider: false,
  },
  {
    icon: "FavouriteIcon",
    name: "Favourites",
    link: "/dashboard/favourites",
    divider: false,
  },
  {
    icon: "",
    name: "Repositories",
    link: "",
    divider: true,
  },
  {
    icon: "ContributionIcon",
    name: "Contributions",
    link: "/dashboard/contributions",
    divider: false,
  },
  {
    icon: "RepositoriesIcon",
    name: "All repositories",
    link: "/dashboard/repositories",
    divider: false,
  },
  {
    icon: "",
    name: "Projects",
    link: "",
    divider: true,
  },
  {
    icon: "TemplatesIcon",
    name: "Templates",
    link: "/dashboard/templates",
    divider: false,
  },
  {
    icon: "ProjectsIcon",
    name: "All projects",
    link: "/dashboard/projects",
    divider: false,
  },
]);

const menuIconsBaseUrl =
    ref<string>("../modules/Dashboard/components/Sidebar/Icons/"),
  defaultPageLink = ref<string>("/dashboard/recent"),
  activeLink = ref(menu.findIndex(item => item.link === defaultPageLink.value));
</script>

<style lang="scss">
@import "../../assets/sidebar.scss";
</style>
