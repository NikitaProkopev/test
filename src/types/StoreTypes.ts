import type { WorkAreaItemWithId } from "@/types/ItemTypes.ts";

export type StoreType = {
    workAreaItems: WorkAreaItemWithId[]
    selectedItemId: number | undefined,
    maxItemId: number,
}

export type UpdateItemEventType = {
    id: number,
    newValue: string
}

export type ChangeItemPositonEventType = {
    id: number,
    direction: "up" | "down"
}

export type AddItemByIndex = {
    item: WorkAreaItemWithId,
    index: number
}