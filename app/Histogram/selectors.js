import { createSelector } from "reselect";
import { cardToWorkItem, filterCardByLabel, filterWorkItemByDate } from "stats-models";

const getCards = state => state.localFilter.cards;
const getColumns = state => state.localFilter.columns;
const getSelectedLabels = state => state.localFilter.selectedLabels;
const getStartColumn = state => state.localFilter.startColumn.id;
const getEndColumn = state => state.localFilter.endColumn.id;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

export const getHistogramData = createSelector(
    [getCards, getColumns, getSelectedLabels, getStartColumn, getEndColumn, getStartDate, getEndDate],
    (cards, columns, selectedLabels, startColumn, endColumn, startDate, endDate) => {
        const durations = cards
            .filter(card => filterCardByLabel(card, selectedLabels))
            .map(card => cardToWorkItem(card, columns, startColumn, endColumn))
            .filter(action => filterWorkItemByDate(action, startDate, endDate))
            .map(action => Math.ceil(action.duration));
    
        const histogram = durations.reduce((bins, x) => {
            bins[x] ? bins[x]++ : bins[x] = 1;
            return bins;
        }, {});
    
        return Object.entries(histogram).map( ( [key, val] ) => { 
            return {id: key, value: val};
        });
    }
);