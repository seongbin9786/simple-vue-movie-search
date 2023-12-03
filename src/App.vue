<script setup lang="ts">
import { ref } from 'vue'
import MovieList from './components/MovieList.vue'
import SearchBar from './components/SearchBar.vue'
import { Movie, fetchMovie } from './api/api'

// 초기값은 null, api 반환 값은 빈 배열일 수 있음.
const data = ref<Movie[] | null>(null)

const searchMovie = async (title: string) => {
  data.value = await fetchMovie(title)
}
</script>

<template>
  <SearchBar @submit-title="searchMovie" />
  <MovieList :movies="data" />
</template>
