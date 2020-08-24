import { createSelector } from "reselect";
import percentile from 'percentile';

const getActions = state => state.filter.actions;

export const getPercentiles = createSelector(
    [getActions],
    (actions) => {
        const durations = actions.map(x => x.duration.asDays());
        return {
            n: durations.length,
            fifty: Math.ceil(percentile(50, durations)) || 0,
            seventyFive: Math.ceil(percentile(75, durations)) || 0,
            eightyFive: Math.ceil(percentile(85, durations)) || 0,
            ninetyFive: Math.ceil(percentile(95, durations)) || 0
        }
    }
);