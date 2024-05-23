import { format } from "date-fns";
import { createSelector } from "reselect";
import { ChartData, WorkItem, cardToWorkItem, filterWorkItemByDate, filterCardByLabel } from "@lobsteropteryx/stats-models";

const getCards = state => state.localFilter.cards;
const getColumns = state => state.localFilter.columns;
const getSelectedLabels = state => state.localFilter.selectedLabels;
const getStartColumn = state => state.localFilter.startColumn.id;
const getEndColumn = state => state.localFilter.endColumn.id;
const getStartDate = state => state.date.startDate;
const getEndDate = state => state.date.endDate;

const workItemToChartData = (workItem:WorkItem):ChartData => {
    return {
        id: workItem.id,
        name: workItem.name,
        url: `https://trello.com/c/${workItem.id}`,
        x: format(workItem.completionDate, "yyyy-MM-dd"),
        y: workItem.duration
    };
};

export const getPlotData = createSelector(
    [getCards, getColumns, getSelectedLabels, getStartColumn, getEndColumn, getStartDate, getEndDate],
    (cards, columns, selectedLabels, startColumn, endColumn, startDate, endDate) => {
        return [{
            id: "Cards Completed",
            data: cards
                .filter(card => filterCardByLabel(card, selectedLabels))
                .map(card => cardToWorkItem(card, columns, startColumn, endColumn))
                .filter(workItem => filterWorkItemByDate(workItem, startDate, endDate))
                .map(workItemToChartData)
        }];
    }
);