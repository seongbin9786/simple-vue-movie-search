<script setup lang="ts">
import MovieSearchPage from "./pages/MovieSearchPage.vue";
import MovieDetailPage from "./pages/MovieDetailPage.vue";
import PathRouter from "./shared/PathRouter.vue";

const pathConfig = [
    {
        path: /\/details\/.+/,
        component: MovieDetailPage,
    },
    {
        path: /^\/$/,
        component: MovieSearchPage,
    },
];
</script>

<template>
    <PathRouter :path-config="pathConfig"></PathRouter>
</template>
