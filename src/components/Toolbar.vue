<script setup lang="ts">

import ToolbarItem from "@/components/ToolbarItem.vue";
import {ItemType} from "@/types/ItemTypes.ts";


const items = [
  {
    imageUrl: "/src/assets/headline.svg",
    type: ItemType.HEADLINE,
    text: "Headline",
  },
  {
    imageUrl: "/src/assets/paragraph.svg",
    type: ItemType.PARAGRAPH,
    text: "Paragraph",
  },
  {
    imageUrl: "/src/assets/button.svg",
    type: ItemType.BUTTON,
    text: "Button",
  },
  {
    imageUrl: "/src/assets/image.svg",
    type: ItemType.IMAGE,
    text: "Image",
  }
]
</script>

<template>
  <div class="border-r border-(--divider) w-[270px]">
    <div class="grid grid-cols-2 p-[30px] gap-[10px]">
      <ToolbarItem
          v-for="item in items"
          :data="item"
      />
    </div>
  </div>

</template>
