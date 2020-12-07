import { createSelector } from "reselect";
import { cardToWorkItem } from "../workItem";
import { filterWorkItemByDate } from "../dateFilters";

const getCards = state => state.localFilter.cards;
const getStartColumn = state => state.localFilter.startColumn.id;
const getEndColumn = state => state.localFilter.endColumn.id;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

const workItemToChartData = (workItem) => {
    return {
        id: workItem.id,
        name: workItem.name,
        url: `https://trello.com/c/${workItem.id}`,
        x: workItem.completionDate.format("YYYY-MM-DD"),
        y: parseFloat(workItem.duration.asDays(), 1).toPrecision(1)
    };
};

export const getPlotData = createSelector(
    [getCards, getStartColumn, getEndColumn, getStartDate, getEndDate],
    (cards, startColumn, endColumn, startDate, endDate) => {
        return [{
            id: "Cards Completed",
            data: cards
                .map(card => cardToWorkItem(card, startColumn, endColumn))
                .filter(workItem => filterWorkItemByDate(workItem, startDate, endDate))
                .map(workItemToChartData)
        }];
    }
);