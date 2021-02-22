import { createSelector } from "reselect";
import percentile from 'percentile';
import { cardToWorkItem } from "../workItem";
import { filterWorkItemByDate } from "../filters";

const getCards = state => state.localFilter.cards;
const getStartColumn = state => state.localFilter.startColumn.id;
const getEndColumn = state => state.localFilter.endColumn.id;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

export const getPercentiles = createSelector(
    [getCards, getStartColumn, getEndColumn, getStartDate, getEndDate],
    (cards, startColumn, endColumn, startDate, endDate) => {
        const durations = cards
            .map(card => cardToWorkItem(card, startColumn, endColumn))
            .filter(card => filterWorkItemByDate(card, startDate, endDate))
            .map(card => card.duration.asDays());
        
        return {
            n: durations.length,
            fifty: Math.ceil(percentile(50, durations)) || 0,
            seventyFive: Math.ceil(percentile(75, durations)) || 0,
            eightyFive: Math.ceil(percentile(85, durations)) || 0,
            ninetyFive: Math.ceil(percentile(95, durations)) || 0
        }
    }
);