import { groupBy, first, last } from 'lodash';

export default class ActionParser {
    contructor(startId, endId) {
        this.startId = startId;
        this.endId = endId;
    }

    parse(actions) {

        function getDuration(actions) {
            return new Date(last(actions).date) - new Date(first(actions).date);
        }
        
        const groups = groupBy(actions, x => x.card.id );
        
        return Object.entries(groups).map(
            ([id, actions]) => ({ id: id, duration: getDuration(actions) })
        );
    }

}
