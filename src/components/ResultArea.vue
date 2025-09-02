<script setup lang="ts">

import {computed} from "vue";
import {useStore} from "vuex";
import {ItemType} from "@/types/ItemTypes.ts";
import ResultAreaItem from "@/components/ResultAreaItem.vue";

const store = useStore();

const itemsList = computed(() => {
  return store.state.workAreaItems;
})

console.log(itemsList.value, 'items list')

</script>

<template>
  <div class="flex flex-col items-center p-[30px] gap-[30px]">
    <ResultAreaItem
        v-for="item in itemsList"
        :item="item"
    />
  </div>
</template>

<style scoped>

</style>