import moment from 'moment';

export interface Card {
    id: string,
    name: string,
    labels: Label[],
    actions: Action[]
}

export interface Label {
    id: string,
    name: string,
    color: string
}

export enum ActionType {
    CreateCard = "createCard",
    UpdateCard = "updateCard",
    MoveCardToBoard = "moveCardToBoard"
}

export interface Action {
    type: ActionType,
    startColumn: Column,
    endColumn: Column,
    date: moment.Moment
}

interface Column {
    id: string,
    name: string
}