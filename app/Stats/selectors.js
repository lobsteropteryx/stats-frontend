import { createSelector } from "reselect";
import percentile from 'percentile';
import { filterActionByDate } from "../filterActionByDate";

const getActions = state => state.filter.actions;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

export const getPercentiles = createSelector(
    [getActions, getStartDate, getEndDate],
    (actions, startDate, endDate) => {
        const durations = actions
            .filter(action => filterActionByDate(action, startDate, endDate))
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