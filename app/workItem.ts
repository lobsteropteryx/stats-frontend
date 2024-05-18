import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { wasMovedBack } from './actionFilter';
import { Card, Column } from './card';

export interface WorkItem {
    id: string,
    name: string,
    isComplete: boolean,
    startDate: dayjs.Dayjs,
    completionDate: dayjs.Dayjs,
    duration: duration.Duration
}

export function cardToWorkItem(card: Card, columns: Column[], startColumn: string, endColumn: string): WorkItem {

    const startDate = getDate(card, startColumn);
    const endDate = getDate(card, endColumn);
    const isComplete = !card.actions.some(action => wasMovedBack(action, columns)) && 
        startDate !== null && 
        endDate !== null;

    return {
        id: card.id,
        name: card.name,
        isComplete: isComplete,
        startDate: startDate,
        completionDate: isComplete ? endDate : null,
        duration: isComplete ? dayjs.duration(endDate.diff(startDate)) : null
    }
}

function getDate(card: Card, column: string): dayjs.Dayjs {
    return card.actions
    .filter(x => x.endColumn.id === column)
    .map(x => dayjs(x.date))
    .sort( (x, y) => x.diff(y))
    .shift() || null; 
}