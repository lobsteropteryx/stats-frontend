import { groupBy, first, last } from 'lodash';
import moment from 'moment';
import Action from './action';
import { Action as TrelloAction } from './Trello/types';

export function createActionParser(startId: string, endId: string) {

    return (actions: TrelloAction[]) => {

        function filterAndSortActions(actions: TrelloAction[]) {
            return actions
                .filter(x => x.data.listAfter.id === startId || x.data.listAfter.id === endId)
                .sort( (x, y) => new Date(x.date).getTime() - new Date(y.date).getTime() );
        }

        function isEmpty(actions: TrelloAction[]) {
            return actions.length == 0;
        }

        function isComplete(actions: TrelloAction[]) {
            return !isEmpty(actions) && actions.length % 2 == 0;
        }

        function getDuration(id: string, actions: TrelloAction[]): Action {
            const sortedActions = filterAndSortActions(actions);
            const complete = isComplete(sortedActions);

            return isEmpty(sortedActions) ? null : { 
                id: id,
                name: first(sortedActions).data.card.name,
                isComplete: complete,
                startDate: moment(first(sortedActions).date),
                completionDate: complete ? moment(last(sortedActions).date) : null,
                duration: complete ? 
                    moment.duration(
                        moment(last(sortedActions).date).diff(moment(first(sortedActions).date) )
                    ) : 
                    null 
            };
        }
        
        const groups = groupBy(actions, x => x.data.card.id );

        return Object.entries(groups)
            .map( ([id, actions]) => getDuration(id, actions as TrelloAction[]))
            .filter(x => x !== null);
    };

}
