import { differenceInDays } from 'date-fns';
import { wasMovedBack } from './actionFilter';
import { Card, Column } from './card';

export interface WorkItem {
    id: string,
    name: string,
    isComplete: boolean,
    startDate: string,
    completionDate: string,
    duration: number
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
        startDate: startDate ? startDate.toISOString() : null,
        completionDate: endDate && isComplete ? endDate.toISOString() : null,
        duration: isComplete ? differenceInDays(endDate, startDate) : null 
    }
}

function getDate(card: Card, column: string): Date {
    return card.actions
    .filter(x => x.endColumn.id === column)
    .map(x => new Date(x.date))
    .sort( (x, y) => differenceInDays(x, y))
    .shift() || null; 
}