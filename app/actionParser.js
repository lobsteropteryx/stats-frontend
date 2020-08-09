import { groupBy, first, last } from 'lodash';

export function createActionParser(startId, endId) {

    return (actions) => {

        function filterActions(actions) {
            return actions
                .filter(x => x.listAfter.id === startId || x.listAfter.id === endId)
                .sort(x => x.listAfter.id === startId ? -1 : 1)
        }

        function getDuration(id, actions) {
            const filteredActions = filterActions(actions);
            const duration = filteredActions.length % 2 == 0 ?
                new Date(last(filteredActions).date) - new Date(first(filteredActions).date) :
                null;

            return  { id, duration };
        }
        
        const groups = groupBy(actions, x => x.card.id );

        return Object.entries(groups)
            .map( ([id, actions]) => getDuration(id, actions))
            .filter(x => x !== null);
    };

}
