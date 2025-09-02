//@ts-ignore
import { createStore } from "vuex";
import type {
    AddItemByIndex,
    ChangeItemPositonEventType,
    StoreType,
    UpdateItemEventType
} from "@/types/StoreTypes.ts";
import { type WorkAreaItemType, type WorkAreaItemWithId } from "@/types/ItemTypes.ts";
import createPersistedState from 'vuex-persistedstate';
import {toRaw} from "vue";

export const store = createStore({
    state (): StoreType {
        return {
            workAreaItems: [],
            selectedItemId: undefined,
            maxItemId: 0
        }
    },
    getters: {
        workAreaItems: (state: StoreType): WorkAreaItemWithId[] => state.workAreaItems,
    },
    mutations: {
        addItem (state: StoreType, item: WorkAreaItemType) {
            const newId = ++state.maxItemId;
            state.workAreaItems.push({
                ...item,
                id: newId
            })
            state.selectedItemId = newId;
        },
        addItemByIndex(state: StoreType, {item, index}: AddItemByIndex) {
            const newItem = {
                ...item,
                id: ++state.maxItemId
            }

            let oldArray = structuredClone
                ? structuredClone(toRaw(state.workAreaItems))
                : JSON.parse(JSON.stringify(toRaw(state.workAreaItems)));

            if (state.workAreaItems.length === 0) {
                oldArray = [newItem];
            }
            else if (index === -1) {
                oldArray = [newItem, ...oldArray];
            }
            else if (index === state.workAreaItems.length) {
                oldArray = [...oldArray, newItem];
            }
            else {
                const firstPart = oldArray.slice(0, index);
                const secondPart = oldArray.slice(index);
                oldArray = [...firstPart, newItem, ...secondPart];
            }

            state.workAreaItems = oldArray;
            state.selectedItemId = newItem.id;
        },
        updateItemValue(state: StoreType, {id, newValue}: UpdateItemEventType) {
            const index = state.workAreaItems.findIndex(item => item.id === id);
            state.workAreaItems[index].value = newValue;
        },
        deleteItem(state: StoreType, id: number) {
            const index = state.workAreaItems.findIndex(item => item.id === id);
            state.workAreaItems.splice(index, 1);
            if (state.workAreaItems.length === 0) {
                state.selectedItemId = undefined;
            }
        },
        copyItem(state: StoreType, id: number) {
            const item = state.workAreaItems.find(item => item.id === id);
            const newId = ++state.maxItemId;
            if (item) {
                state.workAreaItems.push({
                    ...item,
                    id: newId
                })
            }
            state.selectedItemId = newId;
        },
        changeItemPositon(state: StoreType, {id, direction}: ChangeItemPositonEventType) {
            const index = state.workAreaItems.findIndex(item => item.id === id);
            const array = state.workAreaItems;
            if (direction === "up") {
                const temp = array[index - 1];
                array[index - 1] = array[index];
                array[index] = temp;
            } else if (direction === "down") {
                const temp = array[index + 1];
                array[index + 1] = array[index];
                array[index] = temp;
            }
            state.workAreaItems = array;
        },
        setSelectedIndex(state: StoreType, id: number) {
            state.selectedItemId = id;
        }
    },
    plugins: [createPersistedState()],
})