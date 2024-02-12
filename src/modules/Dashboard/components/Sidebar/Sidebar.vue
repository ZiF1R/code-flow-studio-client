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
                     @click="() => activeLink = i"
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
    name: "Недавние",
    link: "/dashboard/recent",
    divider: false,
  },
  {
    icon: "SharedIcon",
    name: "Доступные мне",
    link: "/dashboard/shared",
    divider: false,
  },
  {
    icon: "FavouriteIcon",
    name: "Понравившиеся",
    link: "/dashboard/favourites",
    divider: false,
  },
  {
    icon: "",
    name: "Репозитории",
    link: "",
    divider: true,
  },
  {
    icon: "ContributionIcon",
    name: "Мой вклад",
    link: "/dashboard/contributions",
    divider: false,
  },
  {
    icon: "RepositoriesIcon",
    name: "Все репозитории",
    link: "/dashboard/repositories",
    divider: false,
  },
  {
    icon: "",
    name: "Проекты",
    link: "",
    divider: true,
  },
  {
    icon: "TemplatesIcon",
    name: "Шаблоны",
    link: "/dashboard/templates",
    divider: false,
  },
  {
    icon: "ProjectsIcon",
    name: "Все проекты",
    link: "/dashboard/projects",
    divider: false,
  },
]);

const menuIconsBaseUrl =
    ref<string>("../modules/Dashboard/components/Sidebar/Icons/"),
  defaultPageLink = ref<string>("/dashboard/recent"),
  activeLink = ref(menu.findIndex(item => item.link === window.location.pathname));
</script>

<style lang="scss">
@import "../../assets/sidebar.scss";
</style>
