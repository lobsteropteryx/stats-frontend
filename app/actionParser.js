import { groupBy, first, last } from 'lodash';

export function createActionParser(startId, endId) {

    return (actions) => {

        function filterActions(actions) {
            return actions
                .filter(x => x.data.listAfter.id === startId || x.data.listAfter.id === endId)
                .sort(x => x.data.listAfter.id === startId ? -1 : 1)
        }

        function getDuration(id, actions) {
            const filteredActions = filterActions(actions);

            return (filteredActions.length > 0 && filteredActions.length % 2 == 0) ? { 
                id: id,
                completionDate: new Date(last(filteredActions).date),
                duration: new Date(last(filteredActions).date) - new Date(first(filteredActions).date) 
            } : null;
        }
        
        const groups = groupBy(actions, x => x.data.card.id );

        return Object.entries(groups)
            .map( ([id, actions]) => getDuration(id, actions))
            .filter(x => x !== null);
    };

}
