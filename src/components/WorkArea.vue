<script setup lang="ts">

import WorkAreaItem from "@/components/WorkAreaItem.vue";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {ItemType, type ToolbarItemType} from "@/types/ItemTypes.ts";

const store = useStore();
const wrapper = ref<HTMLDivElement | null>(null);
const draggingItemIndex = ref<number | null>(null);

const itemsList = computed(() => {
  if (draggingItemIndex.value !== null) {
    const draggingItem = {
      id: Number.MAX_VALUE,
      type: ItemType.DRAG,
      imageUrl: "/src/assets/headline.svg",
      text: "Item",
      value: ""
    }
    if (store.getters.workAreaItems.length === 0) {
      return [ draggingItem ]
    }
    if (draggingItemIndex.value === -1) {
      return [ draggingItem, ...store.getters.workAreaItems];
    }
    if (draggingItemIndex.value === store.getters.workAreaItems.length) {
      return [...store.getters.workAreaItems, draggingItem];
    }
    const firstPart = store.getters.workAreaItems.slice(0, draggingItemIndex.value);
    const secondPart = store.getters.workAreaItems.slice(draggingItemIndex.value);
    return [...firstPart, draggingItem, ...secondPart];
  }
  return store.getters.workAreaItems
});

function onDragOver(e: DragEvent) {
  e.preventDefault();
  if (itemsList.value.length === 0) {
    draggingItemIndex.value = 0;
  }
  const closestItem = (e.target as HTMLDivElement).closest('.work-area-item__wrapper') as HTMLDivElement;
  if (closestItem && closestItem.parentNode) {
    let index = Array.prototype.indexOf.call(closestItem.parentNode.children, closestItem);
    if (index === 0) {
      const { top, height } = closestItem.getBoundingClientRect();
      const clientY = e.clientY;
      const addOnTop = ((clientY - top) / height) <= 0.5;
      index += addOnTop ? -1 : 1;
    }

    if (draggingItemIndex.value !== index) {
      draggingItemIndex.value = index;
    }
  }

}

function onDrop(e: DragEvent) {
  e.preventDefault();
  if (e.dataTransfer) {
    const toolbarItem: ToolbarItemType = JSON.parse(e.dataTransfer.getData('text/plain'));
    store.commit('addItemByIndex', {
      item: { ...toolbarItem, value: "" },
      index: draggingItemIndex.value
    });
    draggingItemIndex.value = null;
  }
}

function onDragLeave(e: DragEvent) {
  if (e.relatedTarget && wrapper.value && wrapper.value.contains(e.relatedTarget as Node)) {
    return;
  }

  draggingItemIndex.value = null;
}
</script>

<template>
  <div
    class="work-area bg-(--background) flex flex-col overflow-y-auto max-h-[calc(100vh-70px)]"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
    ref="wrapper"
  >
    <div
      :class="`item-wrapper pt-[15px] px-[30px] pb-0${item.type !== ItemType.DRAG ? ' work-area-item__wrapper' : ''}`"
      v-for="(item, index) in itemsList"
    >
      <WorkAreaItem
          :up-item-disabled="index === 0"
          :down-item-disabled="index === itemsList.length - 1"
          :item="item"
          :is-active="item.id === store.state.selectedItemId"
      />
    </div>


  </div>
</template>

<style scoped>
  .work-area {

    .item-wrapper:last-child {
      padding-bottom: 25px;
    }

    .item-wrapper:first-child {
      padding-top: 25px;
    }
  }

</style>