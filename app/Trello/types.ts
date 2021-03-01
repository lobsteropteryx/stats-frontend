export enum ActionType {
    CreateCard = "createCard",
    UpdateCard = "updateCard",
    MoveCardToBoard = "moveCardToBoard",
    CopyCard = "copyCard"
}

interface List {
    id: string,
    name: string
}

interface UpdateData {
    listBefore: List
    listAfter: List
}

interface CreateData {
    list: List
}

export interface CreateAction {
    date: string,
    type: ActionType,
    data: CreateData
}

export interface UpdateAction {
    date: string,
    type: ActionType,
    data: UpdateData
}

export type Action = CreateAction | UpdateAction;

export interface Label {
    id: string,
    name: string,
    color: string
}

export interface Card {
    id: string,
    name: string,
    labels: Array<Label>,
    actions: Array<Action>
}

