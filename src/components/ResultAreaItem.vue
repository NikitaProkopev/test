<script setup lang="ts">

import { ItemType, type WorkAreaItemWithId } from "@/types/ItemTypes.ts";
import {computed, ref, toRef, toRefs, watch} from "vue";

const props = defineProps<{
  item: WorkAreaItemWithId
}>()

const { item } = toRefs(props);

const value = computed(getValue)

function getValue() {
  if (item.value.value.length !== 0) {
    return item.value.value;
  }
  switch (item.value.type) {
    case ItemType.HEADLINE:
      return "A legendary cap set that feels like new";
    case ItemType.IMAGE:
      return "/src/assets/image-default.png";
    case ItemType.PARAGRAPH:
      return "Prompt your customer to revisit your store by showing them the products they left behind. Consider offering them a coupon code to close the deal.\n" +
          "Using the \"Insert\" panel on the right, drag and drop \n" +
          "the Abandoned Cart element onto the page below.";
    case ItemType.BUTTON:
      return "Register now";
  }
}


</script>

<template>
  <div>
    <div
        class="flex justify-center"
        v-if="item.type === ItemType.IMAGE"
    >
      <img class="max-w-[540px] max-h-[230px] rounded-sm" :src="value" alt="">
    </div>
    <div v-if="item.type === ItemType.HEADLINE">
      <h2 class="text-[22px] font-bold text-(--text-primary) leading-[1.5] tracking-[0.02em]">
        {{ value }}
      </h2>
    </div>
    <div v-if="item.type === ItemType.PARAGRAPH">
      <p class="text-center text-(--secondary-text) text-[14px] leading-[1.5] tracking-[0.02em] whitespace-pre-line">
        {{ value }}
      </p>
    </div>
    <div v-if="item.type === ItemType.BUTTON">
      <button class="bg-(--primary-button) rounded-sm text-(--button-background) px-[32px] py-[10px] text-[14px] tracking-[2%]">
        {{ value }}
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>