export enum ActionType {
    CreateCard = "createCard",
    UpdateCard = "updateCard",
    MoveCardToBoard = "moveCardToBoard",
    CopyCard = "copyCard"
}

export interface ClosedStatus {
    closed: boolean
}

interface ListStatus {
    idList: string
}

type ActionCard = ClosedStatus | any;

type Old = ClosedStatus | ListStatus;

interface List {
    id: string,
    name: string
}

export interface UpdateData {
    listBefore: List
    listAfter: List,
    card: ActionCard,
    old: Old
}

export interface CreateData {
    list: List,
    card: ActionCard
}

export interface CloseData {
    list: List,
    card: ActionCard
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

export interface CloseAction {
    date: string,
    type: ActionType,
    data: CloseData
}

export type Action = CreateAction | UpdateAction | CloseAction;

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

