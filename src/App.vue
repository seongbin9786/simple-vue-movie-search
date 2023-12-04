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
    <!-- 
        MovieDetailPage의 경우 인스턴스 캐싱 시 직전의 정보가 먼저 보이게 되므로 캐싱에서 제외
        MovieSearchPage는 검색 결과가 보존되어야 하므로 포함 
    -->
    <PathRouter
        :cached-instance-name-pattern="/MovieSearchPage/"
        :path-config="pathConfig"
    ></PathRouter>
</template>
