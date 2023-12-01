<script setup lang="ts">
defineProps(['movies'])
</script>

<template>
  <div class="movies">
    <div class="movie" v-for="movie in movies">
      <div class="movie__description">
        <h3 class="movie__title">{{ movie.title }}</h3>
        <span class="movie__year">{{ movie.year }}</span>
      </div>
      <img class="movie__poster" :src="movie.poster" />
    </div>
  </div>
</template>
