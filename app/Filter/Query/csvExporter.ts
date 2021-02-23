import jsonexport from "jsonexport";
import { Card } from "../../card";

export async function getCsvData(cards, boardName) {
    const content = await convertToCsv(cards.map(transformDates));
    const blob = new Blob([content]);
    return {
        content: content,
        url: URL.createObjectURL(blob),
        filename: `${boardName}-${new Date(Date.now()).toISOString().slice(0, 10)}.csv`  
    }
};

function transformDates(card): Card {
    return {
        id: card.id,
        name: card.name,
        labels: card.labels,
        actions: card.actions.map(action => {
            return {
                startColumn: action.startColumn,
                endColumn: action.endColumn,
                date: action.date.toDate()
            }
        })
    }
}

async function convertToCsv(cards) {
    return await jsonexport(cards);
}