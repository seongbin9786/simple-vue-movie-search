<script setup lang="ts">
import { goTo } from "./goTo";

interface Props {
    href: string;
}

const { href } = defineProps<Props>();
</script>

<template>
    <a @click="goTo(href)">
        <slot />
    </a>
</template>
