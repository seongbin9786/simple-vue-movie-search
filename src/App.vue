<script setup lang="ts">
import { ref } from 'vue'
import MovieList from './components/MovieList.vue'
import SearchBar from './components/SearchBar.vue'
import { Movie, fetchMovie } from './api/api'

const data = ref<Movie[]>([])

const searchMovie = async (title: string) => {
  data.value = await fetchMovie(title)
}
</script>

<template>
  <SearchBar @submit-title="searchMovie" />
  <MovieList :movies="data" />
</template>
