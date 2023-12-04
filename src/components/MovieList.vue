<script setup lang="ts">
import type { Movie } from "../api/api";
import { goTo } from "../shared/goTo";

interface Props {
    movies: Movie[] | null;
}

defineProps<Props>();

const findParent = ($: HTMLElement): HTMLElement => {
    if ($.classList.contains("movie")) {
        return $;
    }

    return findParent($.parentElement as HTMLElement);
};

const goToDetailPage = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // moives 영역 클릭한 경우
    if (target.classList.contains("movies")) {
        return;
    }

    const $ = findParent(target);

    const { id } = $.dataset;

    goTo(`/details/${id}`);
};
</script>

<template>
    <div v-if="!movies"></div>
    <div v-else-if="movies.length === 0">검색 결과가 없습니다!</div>
    <div v-else class="movies" @click="goToDetailPage">
        <div
            v-for="{ title, year, poster, imdbID } in movies"
            :key="imdbID"
            :data-id="imdbID"
            class="movie"
        >
            <div class="movie__description">
                <h3 class="movie__title">{{ title }}</h3>
                <span class="movie__year">{{ year }}</span>
            </div>
            <img class="movie__poster" :src="poster" />
        </div>
    </div>
</template>
