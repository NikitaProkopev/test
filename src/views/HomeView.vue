<script setup lang="ts">
import Toolbar from "@/components/Toolbar.vue";
import WorkArea from "@/components/WorkArea.vue";
import ResultArea from "@/components/ResultArea.vue";
</script>

<template>
  <div class="page-wrapper grid h-[100%]">
    <Toolbar/>
    <WorkArea/>
    <ResultArea/>
  </div>
</template>

<style scoped>
  .page-wrapper {
    grid-template-columns: auto 3.32fr 3.9fr;
  }
</style>
