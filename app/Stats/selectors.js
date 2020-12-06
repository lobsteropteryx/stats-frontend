import { createSelector } from "reselect";
import percentile from 'percentile';
import { filterWorkItemByDate } from "../dateFilters";

const getCards = state => state.filter.cards;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

export const getPercentiles = createSelector(
    [getCards, getStartDate, getEndDate],
    (actions, startDate, endDate) => {
        const durations = actions
            .filter(action => filterWorkItemByDate(action, startDate, endDate))
            .map(action => action.duration.asDays());
        return {
            n: durations.length,
            fifty: Math.ceil(percentile(50, durations)) || 0,
            seventyFive: Math.ceil(percentile(75, durations)) || 0,
            eightyFive: Math.ceil(percentile(85, durations)) || 0,
            ninetyFive: Math.ceil(percentile(95, durations)) || 0
        }
    }
);