import { createSelector } from "reselect";
import percentile from 'percentile';
import { cardToWorkItem, filterWorkItemByDate, filterCardByLabel } from "stats-models";

const getCards = state => state.localFilter.cards;
const getColumns = state => state.localFilter.columns;
const getSelectedLabels = state => state.localFilter.selectedLabels;
const getStartColumn = state => state.localFilter.startColumn.id;
const getEndColumn = state => state.localFilter.endColumn.id;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

export const getPercentiles = createSelector(
    [getCards, getColumns, getSelectedLabels, getStartColumn, getEndColumn, getStartDate, getEndDate],
    (cards, columns, selectedLabels, startColumn, endColumn, startDate, endDate) => {
        const durations = cards
            .filter(card => filterCardByLabel(card, selectedLabels))
            .map(card => cardToWorkItem(card, columns, startColumn, endColumn))
            .filter(card => filterWorkItemByDate(card, startDate, endDate))
            .map(card => card.duration);
        
        return {
            n: durations.length,
            fifty: Math.ceil(percentile(50, durations) as number) || 0,
            seventyFive: Math.ceil(percentile(75, durations) as number) || 0,
            eightyFive: Math.ceil(percentile(85, durations) as number) || 0,
            ninetyFive: Math.ceil(percentile(95, durations) as number) || 0
        }
    }
);