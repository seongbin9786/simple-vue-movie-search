<script setup lang="ts">
import MovidDetail from "../components/MovieDetail.vue";
import { goTo } from "../shared/goTo";

const id = window.location.pathname.split("/").pop();

if (!id || id.length === 0) {
    throw new Error("ID가 없어요.");
}
</script>

<template>
    <!-- 로딩 상태를 선언적으로 처리하기 위해 Suspense를 사용 -->
    <!-- 참고: https://vuejs.org/guide/built-ins/suspense.html -->
    <Suspense>
        <MovidDetail :id="id" />
        <template #fallback>
            <button class="nav-button" @click.prevent="goTo('/')">목록으로 돌아가기</button>
        </template>
    </Suspense>
</template>
