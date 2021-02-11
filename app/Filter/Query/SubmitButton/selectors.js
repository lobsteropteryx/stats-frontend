import { createSelector } from "reselect";

const getCards = state => state.localFilter.cards;
const getBoardName = state => state.queryFilter.selectedBoard.name;

export const getExportParameters = createSelector(
    [getCards, getBoardName],
    (cards, boardName) => {
        const content = JSON.stringify(cards);
        const blob = new Blob([content]);
        return {
            content: content,
            url: URL.createObjectURL(blob),
            filename: `${boardName}-${new Date().toISOString().slice(0, 10)}`  
        }
    }
);