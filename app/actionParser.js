import { groupBy, first, last } from 'lodash';
import moment from 'moment';

export function createActionParser(startId, endId) {

    return (actions) => {

        function filterAndSortActions(actions) {
            return actions
                .filter(x => x.data.listAfter.id === startId || x.data.listAfter.id === endId)
                .sort( (x, y) => new Date(x.date) - new Date(y.date) );
        }

        function isEmpty(actions) {
            return actions.length == 0;
        }

        function isComplete(actions) {
            return !isEmpty(actions) && actions.length % 2 == 0;
        }

        function getDuration(id, actions) {
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
                        moment(last(sortedActions).date) - moment(first(sortedActions).date)
                    ) : 
                    null 
            };
        }
        
        const groups = groupBy(actions, x => x.data.card.id );

        return Object.entries(groups)
            .map( ([id, actions]) => getDuration(id, actions))
            .filter(x => x !== null);
    };

}
