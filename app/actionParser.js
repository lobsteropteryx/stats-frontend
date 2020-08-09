import { groupBy, first, last } from 'lodash';

export function createActionParser(startId, endId) {

    return (actions) => {

        function getDuration(actions) {
            const actionsInColumns = actions.filter(
                x => (x.listAfter.id === startId || x.listAfter.id === endId)
            );
            return new Date(last(actionsInColumns).date) - new Date(first(actionsInColumns).date);
        }
        
        const groups = groupBy(actions, x => x.card.id );

        return Object.entries(groups)
            .filter( ([id, actions]) => actions.length > 1)
            .map( ([id, actions]) => ({ id: id, duration: getDuration(actions) }) );
    };

}
