import { createSelector } from "reselect";
import { filterActionByDate } from "../cardFilters";

const getActions = state => state.filter.actions;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

export const getHistogramData = createSelector(
    [getActions, getStartDate, getEndDate],
    (actions, startDate, endDate) => {
        const durations = actions
            .filter(action => filterActionByDate(action, startDate, endDate))
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