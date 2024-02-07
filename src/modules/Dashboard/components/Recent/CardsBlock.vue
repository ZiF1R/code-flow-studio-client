<template>
  <div class="cards-block__container">
    <h3>{{title}}</h3>

    <div class="cards-block__list">
      <template v-if="props.cards === null">
        <v-skeleton-loader
          v-for="n in 3"
          :key="n"
          max-width="250"
          width="250"
          type="image"
        >
        </v-skeleton-loader>
      </template>

      <template v-else-if="props.cards.length > 0">
        <router-link v-for="(card, i) in props.cards" :to="`/p/${card.codeName}`"
                     :key="i"
                     class="cards-block__card">
          <header class="card__header">
            <h4>{{card.name}}</h4>
            <!--          <CardMenu />-->
          </header>
          <footer class="card__footer">
            <time>{{getLastUpdate(card.updatedAt)}}</time>
          </footer>
        </router-link>
      </template>
      <p v-else>У вас пока нет проектов</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {formatRelative} from "date-fns";
import { ru } from 'date-fns/locale'
import {defineProps} from "vue";

const props = defineProps(['title', 'cards']);

function getLastUpdate(date) {
  return formatRelative(date, new Date(), { locale: ru })
}
</script>

