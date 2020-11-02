import { createSelector } from "reselect";

const getActions = state => state.filter.actions;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

const bucketActionsByDuration = (actions, startDate, endDate) => {
    return [];
};

export const getPlotData = createSelector(
    [getActions, getStartDate, getEndDate],
    (actions, startDate, endDate) => {
        return [{
            id: "WIP",
            data: bucketActionsByDuration(actions, startDate, endDate)
        }];
    }
);