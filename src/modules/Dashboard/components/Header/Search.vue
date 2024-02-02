<template>
  <label class="search-input__container">
    <SearchIcon />
    <input type="text" placeholder="Search"/>
  </label>
</template>

<script>
import SearchIcon from "./Icons/SearchIcon.vue";

export default {
  name: "Search",

  components: {
    SearchIcon
  }
}
</script>

<style>
@import "../../assets/search.scss";
</style>
