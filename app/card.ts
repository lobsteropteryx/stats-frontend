import moment from 'moment';

export interface Card {
    id: string,
    name: string
    actions: Action[]
}

export interface Action {
    startColumn: Column,
    endColumn: Column,
    date: moment.Moment
}

interface Column {
    id: string,
    name: string
}