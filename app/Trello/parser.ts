import moment from 'moment';
import { 
    Card as TrelloCard, 
    Action as TrelloAction,
    UpdateAction as TrelloUpdateAction,
    Label as TrelloLabel,
    ActionType
} from "./types";
import { Card, Action, Label } from "../card";

export function parseTrelloCards(trelloCards: TrelloCard[]) {
    return trelloCards.map(parseTrelloCard);
}

function parseTrelloCard(trelloCard: TrelloCard): Card {
    return {
        id: trelloCard.id,
        name: trelloCard.name,
        labels: trelloCard.labels.map(parseTrelloLabel),
        actions: trelloCard.actions.filter(filterUpdateActions).map(parseTrelloAction)
    }
}

function parseTrelloLabel(trelloLabel: TrelloLabel): Label {
    return trelloLabel;
}

function filterUpdateActions(trelloAction: TrelloAction): boolean {
    return trelloAction.type === ActionType.UpdateCard;
}

function parseTrelloAction(trelloAction: TrelloUpdateAction): Action {
    return {
        type: trelloAction.type,
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
