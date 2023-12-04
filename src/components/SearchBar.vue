<script setup lang="ts">
defineEmits(["submitTitle"]);
</script>

<template>
    <div class="search-bar">
        <h2 class="search-bar__title">Search Movie</h2>
        <input
            class="search-bar__input"
            placeholder="엔터 키로 검색..."
            @keydown.enter="$emit('submitTitle', ($event.target as HTMLInputElement).value)"
        />
    </div>
</template>
