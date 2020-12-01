import moment from 'moment';

export interface Card {
    id: string,
    name: string
    actions: Status[]
}

export interface Status {
    startColumn: Column,
    endColumn: Column,
    date: moment.Moment
}

interface Column {
    id: string,
    name: string
}