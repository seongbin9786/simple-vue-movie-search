<!-- 영화 포스터 로딩 시 불량 src의 경우 placeholder 이미지를 대신 표시한다 -->
<script setup lang="ts">
const FALLBACK_IMG_URL = "https://cringemdb.com/img/movie-poster-placeholder.png";

const fallbackToDefaultImg = (e: Event) => {
    if (!(e.target instanceof HTMLImageElement)) {
        return;
    }

    e.target.src = FALLBACK_IMG_URL;
};
</script>
<template>
    <img @error="fallbackToDefaultImg" />
</template>
