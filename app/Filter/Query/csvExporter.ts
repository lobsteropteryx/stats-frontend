import jsonexport from "jsonexport/dist";
import { Card } from "../../card";

export async function getCsvData(cards: Card[], boardName: string) {
    const content = await convertToCsv(cards
        .map(transformDates)
        .sort( (a, b) => { return a.id < b.id ? -1 : 1; })
    );
    const blob = new Blob([content]);
    return {
        content: content,
        url: URL.createObjectURL(blob),
        filename: `${boardName}-${new Date(Date.now()).toISOString().slice(0, 10)}.csv`  
    }
};

function transformDates(card: Card) {
    return {
        id: card.id,
        name: card.name,
        actions: card.actions
            .map(action => {
                return {
                    type: action.type,
                    startColumn: action.startColumn,
                    endColumn: action.endColumn,
                    date: action.date
                }
            })
            .sort( (a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime(); })
    }
}

async function convertToCsv(cards) {
    return await jsonexport(cards, {fillGaps: true});
}