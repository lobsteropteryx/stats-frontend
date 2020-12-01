import { groupBy, first } from 'lodash';
import moment from 'moment';
import { Action } from "./types";
import { Card } from "../card";

export class ActionParser {
    
    constructor() {

    }

    parseActions(actions: Action[]) {
        const groups = groupBy(actions, x => x.data.card.id );
        return Object.values(groups).map(this._parseActionsForCard);
    }

    _parseActionsForCard(actions: Action[]): Card {
        return {
            id: first(actions).data.card.id,
            name: first(actions).data.card.name,
            actions: actions.map(x => {
                return {
                    startColumn: x.data.listBefore,
                    endColumn: x.data.listAfter,
                    date: moment(x.date)
                }
            })
        }
    }
}