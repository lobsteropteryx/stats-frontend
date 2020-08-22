import { createSelector } from "reselect";
import percentile from 'percentile';

const getActions = state => state.filter.actions;

export const getPercentiles = createSelector(
    [getActions],
    (actions) => {
        const durations = actions.map(x => x.duration.asDays());
        return {
            n: durations.length,
            fifty: Math.round(percentile(50, durations)),
            seventyFive: Math.round(percentile(75, durations)),
            eightyFive: Math.round(percentile(85, durations)),
            ninetyFive: Math.round(percentile(95, durations))
        }
    }
);