<script setup lang="ts">

import {ItemType, type WorkAreaItemWithId} from "@/types/ItemTypes.ts";
import {computed, ref} from "vue";
import {useStore} from "vuex";

const { item } = defineProps<{
  item: WorkAreaItemWithId,
  upItemDisabled: boolean,
  downItemDisabled: boolean,
  isActive: boolean,
}>();

const store = useStore();
const updateValueTimeout = ref<number | null>(null);

const placeholder = computed(() => {
  switch (item.type) {
    case ItemType.IMAGE:
      return "Image URL";
    case ItemType.HEADLINE:
      return "Headline text";
    case ItemType.PARAGRAPH:
      return "Paragraph text";
    case ItemType.BUTTON:
      return "Button text";
  }
})

function updateValue(event: InputEvent) {
  if (updateValueTimeout.value) {
    clearTimeout(updateValueTimeout.value);
  }
  updateValueTimeout.value = setTimeout(() => {
    store.commit("updateItemValue", {
      id: item.id,
      newValue: (event.target as HTMLInputElement).value
    })
  }, 500)
}

function deleteItem() {
  store.commit("deleteItem", item.id);
}

function copyItem() {
  store.commit("copyItem", item.id);
}

function changeItemPositon(direction: "up" | "down") {
  store.commit("changeItemPositon", {
    id: item.id,
    direction
  })
}

function clickHandle() {
  if (store.state.selectedItemId === item.id) {
    store.commit('setSelectedIndex', null);
    return;
  }

  store.commit('setSelectedIndex', item.id);
}

</script>

<template>
  <div
      :class="'wrapper flex flex-col relative bg-white gap-2.5 px-2.5 py-[15px] items-center rounded-md'
        + (item.type !== ItemType.DRAG ? ' work-area__item' : ' drag-item')
        + (isActive ? ' active' + ' ' + (item.type === ItemType.PARAGRAPH ? 'h-[195px]' : 'h-[131px]') : ' h-[83px]')"
      v-on:click="clickHandle"
    >
    <div
       class="actions-buttons flex gap-[5px] h-[27px] absolute top-0 right-2.5 z-[-1] opacity-0"
       v-on:click="(e) => e.stopPropagation()"
    >
      <div class="flex gap-[5px] p-[3px] rounded-tl-[3px] rounded-tr-[3px]">
        <button
            class="border-none bg-transparent p-[3px] rounded-[2px]"
            :disabled="downItemDisabled"
            v-on:click="() => changeItemPositon('down')"
        >
          <img class="h-[15px] w-[15px]" src="/src/assets/arrow-top.svg" alt="arrow down" draggable="false"/>
        </button>
        <button
            class="border-none bg-transparent p-[3px] rounded-[2px]"
            :disabled="upItemDisabled"
            v-on:click="() => changeItemPositon('up')"
        >
          <img class="h-[15px] w-[15px]" src="/src/assets/arrow-top.svg" alt="arrow top" draggable="false"/>
        </button>
      </div>
      <div class="flex gap-[5px] p-[3px] rounded-tl-[3px] rounded-tr-[3px]">
        <button
            class="border-none bg-transparent p-[3px] rounded-[2px]"
            v-on:click="copyItem">
          <img class="h-[15px] w-[15px]" src="/src/assets/copy.svg" alt="copy" draggable="false"/>
        </button>
        <button
            class="border-none bg-transparent p-[3px] rounded-[2px]"
            v-on:click="deleteItem">
          <img class="h-[15px] w-[15px]" src="/src/assets/trash.svg" alt="delete" draggable="false"/>
        </button>
      </div>
    </div>
    <img class="h-[25px] w-[25px]" :src="item.imageUrl" alt="item image"  draggable="false">
    <p class="text-xs leading-[1.5] font-normal">{{ item.text }}</p>
    <div class="input__wrapper overflow-hidden hidden w-[100%] bg-(--white-background) p-[5px] rounded-xs"
         v-on:click="(e) => e.stopPropagation()"
    >
      <input
          v-if="item.type !== ItemType.PARAGRAPH"
          class="h-[100%] w-[100%] border border-(--divider) rounded-xs p-[5px] outline-none text-(--primary-text) text-[11px] leading-[1.5] tracking-[0.02em]"
          type="text"
          :placeholder="placeholder"
          :value="item.value"
          v-on:input="updateValue"
      />
      <textarea
        v-if="item.type === ItemType.PARAGRAPH"
        rows="5"
        :placeholder="placeholder"
        v-on:input="updateValue"
        :value="item.value"
        class="resize-none h-[100%] w-[100%] border border-(--divider) rounded-xs p-[5px] outline-none text-(--primary-text) text-[11px] leading-[1.5] tracking-[0.02em]"
      />
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    transition: background-color 0.3s ease-in-out;

    &.drag-item {
      opacity: 0.5;
      border: 5px dashed var(--primary-button)
    }

    &.active {
      background-color: #D9E7FF;

      .input__wrapper {
        display: block;
      }

      .actions-buttons {
        z-index: 2;
        opacity: 1;
        transform: translateY(-100%);
      }
    }

    .input__wrapper {
      transition: height 0.3s ease-in-out;
      box-sizing: border-box;
      box-shadow:
          0 2px 2px 0 #D3D6D733,
          0 4px 4px 0 #D3D6D733,
          0 16px 16px 0 #D3D6D733,
          0 32px 32px 0 #D3D6D733,
          0 64px 64px 0 #D3D6D733;

    }

    .actions-buttons {
      transition: all 0.3s ease-in-out;

      & button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
      }

      & > div:first-child {
        background-color: var(--secondary-button);

        button:nth-child(2) {
          transform: rotate(180deg);
        }
      }
      & > div:nth-child(2) {
        background-color: var(--third-button);

        button:active {
          background-color: var(--third-button-active);
        }
      }
    }
  }
</style>