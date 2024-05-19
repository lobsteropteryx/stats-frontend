import { 
    Card as TrelloCard, 
    Action as TrelloAction,
    CreateAction as TrelloCreateAction,
    UpdateAction as TrelloUpdateAction,
    CloseAction as TrelloCloseAction,
    Label as TrelloLabel,
    ActionType as TrelloActionType
} from "./types";
import { Card, Action, Label, ActionType } from "stats-models";

export function parseTrelloCards(trelloCards: TrelloCard[]) {
    return trelloCards.map(parseTrelloCard);
}

function parseTrelloCard(trelloCard: TrelloCard): Card {
    try 
    {
        return {
            id: trelloCard.id,
            name: trelloCard.name,
            labels: trelloCard.labels.map(parseTrelloLabel),
            actions: trelloCard.actions.map(parseTrelloAction)
        }
    }
    catch (error)
    {
        console.error(trelloCard);
        throw(`Error parsing card ${trelloCard.id}`);
    }
}

function parseTrelloLabel(trelloLabel: TrelloLabel): Label {
    return trelloLabel;
}

function parseTrelloAction(trelloAction: TrelloAction): Action {
    if (trelloAction.type === TrelloActionType.UpdateCard) {
        if (isCloseCardAction(trelloAction as TrelloCloseAction)) {
            return parseCloseCardAction(trelloAction as TrelloCloseAction);
        } else if (isCloseOnAnotherBoardCardAction(trelloAction as TrelloCloseAction)) {
            return parseCloseOnAnotherBoardCardAction(trelloAction as TrelloCloseAction); 
        } else if (isReopenCardAction(trelloAction as TrelloCloseAction)) {
            return parseReopenCardAction(trelloAction as TrelloCloseAction); 
        } else if (isReopenOnAnotherBoardCardAction(trelloAction as TrelloCloseAction)) {
            return parseReopenOnAnotherBoardCardAction(trelloAction as TrelloCloseAction); 
        } else if (isUpdateCardAction(trelloAction as TrelloUpdateAction)) {
            return parseUpdateCardAction(trelloAction as TrelloUpdateAction);
        } else {
            throw(`Error parsing action: ${trelloAction}`);
        }
    } else {
        return parseCreateCardAction(trelloAction as TrelloCreateAction);
    }
}

function isCloseCardAction(action: TrelloCloseAction): boolean {
   return (action.data.card.closed && action.data.card !== undefined);
}

function isReopenCardAction(action: TrelloCloseAction): boolean {
    return !action.data.card.closed && action.data.card.closed !== undefined && 
        action.data.old.closed !== undefined && action.data.old.closed;
 }

 function isUpdateCardAction(action: TrelloUpdateAction): boolean {
     return action.data.listAfter !== undefined && action.data.listBefore !== undefined;
 }
 
 function isReopenOnAnotherBoardCardAction(action: TrelloCloseAction): boolean {
    return action.data.card.closed === undefined && 
        action.data.old.closed !== undefined && !action.data.old.closed;
 }

 function isCloseOnAnotherBoardCardAction(action: TrelloCloseAction): boolean {
    return action.data.card.closed === undefined && 
        action.data.old.closed !== undefined && action.data.old.closed;
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
        date: trelloAction.date
    }
}

function parseCloseOnAnotherBoardCardAction(trelloAction: TrelloCloseAction): Action {
    return {
        type: ActionType.CardClosedOnAnotherBoard,
        startColumn: {
            id: null,
            name: null
        },
        endColumn: {
            id: trelloAction.data.list.id,
            name: trelloAction.data.list.name
        },
        date: trelloAction.date
    }
}

function parseReopenCardAction(trelloAction: TrelloCloseAction): Action {
    return {
        type: ActionType.CardReopened,
        startColumn: {
            id: null,
            name: null
        },
        endColumn: {
            id: trelloAction.data.list.id,
            name: trelloAction.data.list.name
        },
        date: trelloAction.date
    }
}

function parseReopenOnAnotherBoardCardAction(trelloAction: TrelloCloseAction): Action {
    return {
        type: ActionType.CardReopenedOnAnotherBoard,
        startColumn: {
            id: null,
            name: null
        },
        endColumn: {
            id: trelloAction.data.list.id,
            name: trelloAction.data.list.name
        },
        date: trelloAction.date
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
        date: trelloAction.date
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
        date: trelloAction.date
    }
}
