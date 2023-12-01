<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const count = ref(0)
</script>

<template>
  <h2>App.vue</h2>
  <h3>{{ count }}</h3>
  <HelloWorld />
</template>
