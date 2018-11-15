import { SET_TRELLO_TOKEN } from './actions';

const defaultState = {
    apiKey: 'e052546597a829919aae4fbd2a6e4095'
};

export function trelloAuth(state = defaultState, action) {
    switch (action.type) {
        case SET_TRELLO_TOKEN:
            return Object.assign({}, state, {
                token: action.token
            });
        default:
            return state
    }
}