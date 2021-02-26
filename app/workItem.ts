import moment from 'moment';
import { groupBy, first } from 'lodash'
import { Card } from './card';

export interface WorkItem {
    id: string,
    name: string,
    isComplete: boolean,
    startDate: moment.Moment,
    completionDate: moment.Moment,
    duration: moment.Duration
}

export function cardToWorkItem(card: Card, startColumn: string, endColumn: string): WorkItem {

    const startDate = getDate(card, startColumn);
    const endDate = getDate(card, endColumn);
    const isComplete = !wasMovedBack(card, startColumn, endColumn) && 
        startDate !== null && 
        endDate !== null;

    return {
        id: card.id,
        name: card.name,
        isComplete: isComplete,
        startDate: startDate,
        completionDate: isComplete ? endDate : null,
        duration: isComplete ? moment.duration(endDate.diff(startDate)) : null
    }
}

function getDate(card: Card, column: string): moment.Moment {
    return card.actions
    .filter(x => x.endColumn.id === column)
    .map(x => x.date)
    .sort( (x, y) => x.diff(y))
    .shift() || null; 
}

function wasMovedBack(card: Card, startColumn: string, endColumn: string): boolean {
    return card.actions
        .filter(x => x.endColumn.id === endColumn || x.endColumn.id === startColumn)
        .length % 2 !== 0
}