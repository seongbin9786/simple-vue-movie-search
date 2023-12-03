<script setup lang="ts">
import type { Movie } from '../api/api'

interface Props {
  movies: Movie[] | null
}

defineProps<Props>()

const findParent = ($: HTMLElement): HTMLElement => {
  if ($.classList.contains('movie')) {
    console.log($)
    return $
  }

  return findParent($.parentElement as HTMLElement)
}

const openDetail = (e: MouseEvent) => {
  const $ = findParent(e.target as HTMLElement)
  const { id } = $.dataset
  // TODO: 상세 페이지 표시

  console.log(id)
}
</script>

<template>
  <div v-if="!movies"></div>
  <div v-else-if="movies.length === 0">검색 결과가 없습니다!</div>
  <div v-else class="movies" @click="openDetail">
    <div
      v-for="movie in movies"
      :key="movie.imdbID"
      :data-id="movie.imdbID"
      class="movie">
      <div class="movie__description">
        <h3 class="movie__title">{{ movie.title }}</h3>
        <span class="movie__year">{{ movie.year }}</span>
      </div>
      <img class="movie__poster" :src="movie.poster" />
    </div>
  </div>
</template>
