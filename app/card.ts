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
    CardCreated = "cardCreated",
    CardMoved = "cardMoved",
    CardClosed = "cardClosed",
    CardReopened = "cardReopened",
    CardClosedOnAnotherBoard = "cardClosedOnAnotherBoard",
    CardReopenedOnAnotherBoard = "cardReopenedOnAnotherBoard"
}

export interface Action {
    type: ActionType,
    startColumn: Column,
    endColumn: Column,
    date: moment.Moment
}

export interface Column {
    id: string,
    name: string
}