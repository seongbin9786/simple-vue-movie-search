<script setup lang="ts">
import { ref } from "vue";
import MovieList from "../components/MovieList.vue";
import SearchBar from "../components/SearchBar.vue";
import { Movie, fetchMovieList } from "../api/api";

// 초기값은 null, api 반환 값은 빈 배열일 수 있음.
const data = ref<Movie[] | null>(null);

const searchMovie = async (title: string) => {
    try {
        data.value = await fetchMovieList(title);
    } catch (e) {
        if (e instanceof Error) {
            alert(e.message);
        }
    }
};
</script>

<template>
    <SearchBar @submit-title="searchMovie" />
    <MovieList :movies="data" />
</template>
