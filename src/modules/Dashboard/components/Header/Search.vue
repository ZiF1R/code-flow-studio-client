<template>
  <label class="search-input__container">
    <SearchIcon />
    <input type="text" placeholder="Поиск"/>
  </label>
</template>

<script setup>
import SearchIcon from "./Icons/SearchIcon.vue";
</script>

<style>
@import "../../assets/search.scss";
</style>
