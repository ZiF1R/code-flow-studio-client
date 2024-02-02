<template>
  <nav class="header__menu">
    <label class="header__logo">
      <ArrowDownIcon />
      <input @change="(event) => this.showMenu = event.target.checked"
             type="checkbox"/>
    </label>
    <ul class="menu__list" :style="{display: showMenu ? 'flex' : 'none'}">
      <template v-for="(item, i) in menu" :key="i">
        <div v-if="item.divider" class="list__divider"></div>
        <router-link v-else-if="item.link" class="list__item" :to="item.link">
          <img :src="`${menuIconsBaseUrl}/${item.icon}`"
               :alt="item.icon">
          <span>{{item.name}}</span>
        </router-link>
        <li v-else class="list__item">
          <img :src="`${menuIconsBaseUrl}/${item.icon}`" :alt="item.icon">
          <span>{{item.name}}</span>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import ArrowDownIcon from "./Icons/ArrowDownIcon.vue";

export default {
  name: "Menu",

  components: {
    ArrowDownIcon
  },

  data() {
    return {
      menuIconsBaseUrl: "@/modules/Dashboard/components/Header/Icons",
      showMenu: false,
      menu: [
        {
          icon: "ProfileIcon",
          name: "Profile",
          link: "/u/user-name",
          action: () => {},
          divider: false,
        },
        {
          icon: "PreferencesIcon",
          name: "Preferences",
          link: null,
          action: () => {},
          divider: false,
        },
        {
          icon: "",
          name: "",
          link: null,
          action: () => {},
          divider: true,
        },
        {
          icon: "LinkIcon",
          name: "codeflowstudio.io",
          link: "/",
          action: () => {},
          divider: false,
        },
        {
          icon: "SignoutIcon",
          name: "Sign out",
          link: "/",
          action: () => {},
          divider: false,
        },
      ]
    }
  }
}
</script>

<style>

</style>
