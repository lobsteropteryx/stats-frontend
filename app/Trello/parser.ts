import moment from 'moment';
import { Card as TrelloCard, Action as TrelloAction } from "./types";
import { Card, Action } from "../card";

export function parseTrelloCards(trelloCards: TrelloCard[]) {
    return trelloCards.map(parseTrelloCard);
}

function parseTrelloCard(trelloCard: TrelloCard): Card {
    return {
        id: trelloCard.id,
        name: trelloCard.name,
        actions: trelloCard.actions.map(parseTrelloAction)
    }
}

function parseTrelloAction(trelloAction: TrelloAction): Action {
    return {
        startColumn: {
            id: trelloAction.data.listBefore.id,
            name: trelloAction.data.listBefore.name
        },
        endColumn: {
            id: trelloAction.data.listAfter.id,
            name: trelloAction.data.listAfter.name
        },
        date: moment(trelloAction.date)
    }
}
