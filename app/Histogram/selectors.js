import { createSelector } from "reselect";
import { cardToWorkItem } from "../workItem";
import { filterCardByLabel, filterWorkItemByDate } from "../filters";

const getCards = state => state.localFilter.cards;
const getSelectedLabels = state => state.localFilter.selectedLabels;
const getStartColumn = state => state.localFilter.startColumn.id;
const getEndColumn = state => state.localFilter.endColumn.id;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

export const getHistogramData = createSelector(
    [getCards, getSelectedLabels, getStartColumn, getEndColumn, getStartDate, getEndDate],
    (cards, selectedLabels, startColumn, endColumn, startDate, endDate) => {
        const durations = cards
            .filter(card => filterCardByLabel(card, selectedLabels))
            .map(card => cardToWorkItem(card, startColumn, endColumn))
            .filter(action => filterWorkItemByDate(action, startDate, endDate))
            .map(action => Math.ceil(action.duration.asDays()));
    
        const histogram = durations.reduce((bins, x) => {
            bins[x] ? bins[x]++ : bins[x] = 1;
            return bins;
        }, {});
    
        return Object.entries(histogram).map( ( [key, val] ) => { 
            return {id: key, value: val};
        });
    }
);