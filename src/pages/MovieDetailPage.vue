<script setup lang="ts">
import Link from "../shared/Link.vue";

const id = window.location.pathname.split("/").pop();

console.log(id);
</script>

<template>
    <div>detail page {{ id }}</div>
    <Link href="/">go to main</Link>
</template>
