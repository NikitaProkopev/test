<script setup lang="ts">

import type {ToolbarItemType, WorkAreaItemType} from "@/types/ItemTypes.ts";
import { useStore } from "vuex";
import { ref } from "vue";

const { data } = defineProps<{
  data: ToolbarItemType
}>()

const store = useStore();
const onDragging = ref(false);

function clickHandle() {
  const newItem: WorkAreaItemType = {
    ...data,
    value: ""
  }
  store.commit('addItem', newItem)
}

function dragStartHandle(e: DragEventInit) {
  onDragging.value = true;
  store.commit("setSelectedIndex", null)
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  }
}

function dragEndHandler (e: DragEvent) {
  onDragging.value = false;
}

</script>

<template>
  <div
    :class="'wrapper bg-(--button-background) px-[5px] py-[10px] rounded-[6px] flex flex-col items-center gap-[9px] border-[5px] border-(--button-background)'
      + (onDragging ? ' dragging' : '')"
    v-on:click="clickHandle"
    draggable="true"
    @dragstart="dragStartHandle"
    @dragend="dragEndHandler"
  >
    <img class="h-[25px] w-[25px]" :src="data.imageUrl" alt="" draggable="false">
    <p class="text-xs text-center leading-[1.5]">{{ data.text }}</p>
  </div>
</template>

<style scoped>
  .wrapper {
    box-sizing: border-box;

    &.dragging {
      opacity: 0.5;
      border: 5px dashed var(--primary-button)
    }
  }
</style>