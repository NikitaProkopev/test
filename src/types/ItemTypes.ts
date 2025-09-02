export enum ItemType {
    HEADLINE,
    PARAGRAPH,
    BUTTON,
    IMAGE,
    DRAG
}

export type ToolbarItemType = {
    imageUrl: string,
    type: ItemType,
    text: string,
}

export type WorkAreaItemType = ToolbarItemType & {
    value: string,
}

export type WorkAreaItemWithId = WorkAreaItemType & {
    id: number,
}