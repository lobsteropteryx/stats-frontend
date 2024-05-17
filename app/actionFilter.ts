import { Action, Column } from './card';

export function wasMovedBack(action: Action, columns: Column[]): boolean {
    const startIndex = columns.findIndex(x => x.id === action.startColumn.id);
    const endIndex = columns.findIndex(x => x.id === action.endColumn.id);
    return startIndex > endIndex;
}