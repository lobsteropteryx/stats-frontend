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
    return {
        id: card.id,
        name: card.name,
        isComplete: false,
        startDate: getStartDate(card, startColumn),
        completionDate: null,
        duration: null
    }
}

function getStartDate(card: Card, startColumn: string): moment.Moment {
    return card.actions
        .filter(x => x.endColumn.id === startColumn)
        .map(x => x.date)
        .sort( (x, y) => x.diff(y))
        .shift() || null;
}