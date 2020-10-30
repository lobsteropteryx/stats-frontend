import { groupBy, first, last } from 'lodash';
import moment from 'moment';

export function createActionParser(startId, endId) {

    return (actions) => {

        function filterActions(actions) {
            return actions
                .filter(x => x.data.listAfter.id === startId || x.data.listAfter.id === endId)
                .sort(x => x.data.listAfter.id === startId ? -1 : 1)
        }

        function isEmpty(actions) {
            return actions.length == 0;
        }

        function isComplete(actions) {
            return !isEmpty(actions) && actions.length % 2 == 0;
        }

        function getDuration(id, actions) {
            const filteredActions = filterActions(actions);
            const complete = isComplete(filteredActions);

            return isEmpty(filteredActions) ? null : { 
                id: id,
                name: first(filteredActions).data.card.name,
                isComplete: complete,
                completionDate: complete ? moment(last(filteredActions).date) : null,
                duration: complete ? moment.duration(moment(last(filteredActions).date) - moment(first(filteredActions).date)) : null 
            };
        }
        
        const groups = groupBy(actions, x => x.data.card.id );

        return Object.entries(groups)
            .map( ([id, actions]) => getDuration(id, actions))
            .filter(x => x !== null);
    };

}
