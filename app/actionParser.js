import { groupBy, first, last } from 'lodash';

export function createActionParser(startId, endId) {

    return (actions) => {

        function filterActions(actions) {
            return actions
                .filter(x => x.listAfter.id === startId || x.listAfter.id === endId)
        }

        function getDuration(id, actions) {
            const filteredActions = filterActions(actions);
            return filteredActions.length > 1 ? 
                { 
                    id: id, 
                    duration: new Date(last(filteredActions).date) - new Date(first(filteredActions).date) 
                } :
                null;
        }
        
        const groups = groupBy(actions, x => x.card.id );

        return Object.entries(groups)
            .map( ([id, actions]) => getDuration(id, actions))
            .filter(x => x !== null);
    };

}
