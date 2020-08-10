import { groupBy, first, last } from 'lodash';
import moment from 'moment';

export function createActionParser(startId, endId) {

    return (actions) => {

        function filterActions(actions) {
            return actions
                .filter(x => x.data.listAfter.id === startId || x.data.listAfter.id === endId)
                .sort(x => x.data.listAfter.id === startId ? -1 : 1)
        }

        function isComplete(actions) {
            return actions.length > 0 && actions.length % 2 == 0;
        }

        function getDuration(id, actions) {
            const filteredActions = filterActions(actions);

            return (isComplete(filteredActions)) ? { 
                id: id,
                completionDate: moment(last(filteredActions).date),
                duration: moment.duration(moment(last(filteredActions).date) - moment(first(filteredActions).date)) 
            } : null;
        }
        
        const groups = groupBy(actions, x => x.data.card.id );

        return Object.entries(groups)
            .map( ([id, actions]) => getDuration(id, actions))
            .filter(x => x !== null);
    };

}
