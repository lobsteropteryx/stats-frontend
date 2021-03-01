export enum ActionType {
    CreateCard = "createCard",
    UpdateCard = "updateCard",
    MoveCardToBoard = "moveCardToBoard",
    CopyCard = "copyCard"
}

interface ClosedActionCard {
    closed: boolean
}

type ActionCard = ClosedActionCard | any;

interface List {
    id: string,
    name: string
}

interface UpdateData {
    listBefore: List
    listAfter: List,
    card: ActionCard
}

interface CreateData {
    list: List,
    card: ActionCard
}

interface CloseData {
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

