import { groupBy, first } from 'lodash';
import moment from 'moment';
import { Action } from "./types";
import { Card, Status } from "../card";

export function parseActions(actions: Action[]) {
    const groups = groupBy(actions, x => x.data.card.id );
    return Object.values(groups).map(parseActionsForCard);
}

function parseActionsForCard(actions: Action[]): Card {
    return {
        id: first(actions).data.card.id,
        name: first(actions).data.card.name,
        actions: actions.map(mapActionToStatus)
    }
}

function mapActionToStatus(action: Action): Status {
    return {
        startColumn: action.data.listBefore,
        endColumn: action.data.listAfter,
        date: moment(action.date)
    }
}
