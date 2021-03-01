import moment from 'moment';
import { 
    Card as TrelloCard, 
    Action as TrelloAction,
    CreateAction as TrelloCreateAction,
    UpdateAction as TrelloUpdateAction,
    CloseAction as TrelloCloseAction,
    Label as TrelloLabel,
    ActionType as TrelloActionType
} from "./types";
import { Card, Action, Label, ActionType } from "../card";

export function parseTrelloCards(trelloCards: TrelloCard[]) {
    return trelloCards.map(parseTrelloCard);
}

function parseTrelloCard(trelloCard: TrelloCard): Card {
    return {
        id: trelloCard.id,
        name: trelloCard.name,
        labels: trelloCard.labels.map(parseTrelloLabel),
        actions: trelloCard.actions.map(parseTrelloAction)
    }
}

function parseTrelloLabel(trelloLabel: TrelloLabel): Label {
    return trelloLabel;
}

function parseTrelloAction(trelloAction: TrelloAction): Action {
    if (trelloAction.type === TrelloActionType.UpdateCard) {
        return trelloAction.data.card.closed ? 
            parseCloseCardAction(trelloAction as TrelloCloseAction) :
            parseUpdateCardAction(trelloAction as TrelloUpdateAction);
    } else {
        return parseCreateCardAction(trelloAction as TrelloCreateAction);
    }
}

function parseUpdateCardAction(trelloAction: TrelloUpdateAction): Action {
    return {
        type: ActionType.CardMoved,
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

function parseCloseCardAction(trelloAction: TrelloCloseAction): Action {
    return {
        type: ActionType.CardClosed,
        startColumn: {
            id: null,
            name: null
        },
        endColumn: {
            id: trelloAction.data.list.id,
            name: trelloAction.data.list.name
        },
        date: moment(trelloAction.date)
    }
}

function parseCreateCardAction(trelloAction: TrelloCreateAction): Action {
    return {
        type: ActionType.CardCreated,
        startColumn: {
            id: null,
            name: null
        },
        endColumn: {
            id: trelloAction.data.list.id,
            name: trelloAction.data.list.name
        },
        date: moment(trelloAction.date)
    }
}
