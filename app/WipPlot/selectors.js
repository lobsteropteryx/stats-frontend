import { createSelector } from "reselect";
import { groupBy } from 'lodash';

const getActions = state => state.filter.actions;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

const monthName = item => item.startDate.format('MMMM');

const bucketActionsByDuration = (actions, startDate, endDate) => {
    return Object.entries(groupBy(actions, monthName))
        .map( item => {
            return {
                x: item[0],
                y: item[1].length
            };
        });
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