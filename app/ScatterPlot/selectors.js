import { createSelector } from "reselect";

const getActions = state => state.filter.actions;

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
    [getActions],
    (actions) => {
        return [{
            id: "Cards Completed",
            data: actions.map(actionToChartData)
        }];
    }
);