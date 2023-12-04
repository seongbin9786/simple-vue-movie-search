<script setup lang="ts">
import { ref } from "vue";
import type { MovieDetail } from "../api/api";
import { goBack } from "../shared/goBack";
import MoviePoster from "./MoviePoster.vue";

interface Props {
    id: string;
}

const { id } = defineProps<Props>();

const detail = ref<MovieDetail | null>(null);

const fetchMovieDetail = async (id: string) => {
    const response = await fetch(`/api/details?id=${id}`);
    const result = await response.json();

    return result;
};

try {
    detail.value = await fetchMovieDetail(id);
} catch (e) {
    if (e instanceof Error) {
        alert(e.message);
    }
}
</script>

<template>
    <a @click.prevent="goBack">목록으로 돌아가기</a>
    <div v-if="!detail">영화 상세 정보가 없습니다.</div>
    <div v-else class="detail">
        <div class="detail__left-section">
            <div>
                <span>제목</span>
                <span>{{ detail.title }}</span>
            </div>
            <div>
                <span>연도</span>
                <span>{{ detail.year }}</span>
            </div>
            <div>
                <span>개봉일</span>
                <span>{{ detail.released }}</span>
            </div>
            <div>
                <span>길이</span>
                <span>{{ detail.runtime }}</span>
            </div>
            <div>
                <span>장르</span>
                <span>{{ detail.genre }}</span>
            </div>
            <div>
                <span>제작사</span>
                <span>{{ detail.production }}</span>
            </div>
            <div>
                <span>감독</span>
                <span>{{ detail.director }}</span>
            </div>
            <div>
                <span>각본</span>
                <span>{{ detail.writer }}</span>
            </div>
            <div>
                <span>배우</span>
                <span>{{ detail.actors }}</span>
            </div>
            <div>
                <span>언어</span>
                <span>{{ detail.language }}</span>
            </div>
            <div>
                <span>국적</span>
                <span>{{ detail.country }}</span>
            </div>
            <div>
                <span>줄거리</span>
                <span>{{ detail.plot }}</span>
            </div>
        </div>
        <div class="detail__right-section">
            <MoviePoster class="detail__poster" :src="detail.poster.replace('SX300', 'SX700')" />
        </div>
    </div>
</template>
