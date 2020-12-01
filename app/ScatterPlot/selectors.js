import { createSelector } from "reselect";
import { filterActionByDate } from "../cardFilters";

const getActions = state => state.filter.actions;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

const actionToChartData = (action) => {
    return {
        id: action.id,
        name: action.name,
        url: `https://trello.com/c/${action.id}`,
        x: action.completionDate.format("YYYY-MM-DD"),
        y: parseFloat(action.duration.asDays(), 1).toPrecision(1)
    };
};

export const getPlotData = createSelector(
    [getActions, getStartDate, getEndDate],
    (actions, startDate, endDate) => {
        return [{
            id: "Cards Completed",
            data: actions
                .filter(action => filterActionByDate(action, startDate, endDate))
                .map(actionToChartData)
        }];
    }
);