<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
</script>

<template>
  <main>
    <Header/>
    <RouterView />
  </main>
</template>

<style scoped>

main {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
}

</style>
