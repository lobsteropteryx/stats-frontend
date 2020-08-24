import { createSelector } from "reselect";

const getActions = state => state.filter.actions;

export const getHistogramData = createSelector(
    [getActions],
    (actions) => {
        const durations = actions.map(x => { 
            return Math.ceil(x.duration.asDays()); 
         });
    
        const histogram = durations.reduce((bins, x) => {
            bins[x] ? bins[x]++ : bins[x] = 1;
            return bins;
        }, {});
    
        return Object.entries(histogram).map( ( [key, val] ) => { 
            return {id: key, value: val};
        });
    }
);