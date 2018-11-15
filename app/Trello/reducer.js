import { GET_BOARDS, SELECT_BOARD } from './actions';

const defaultState = {
    boards: []
};

export function trelloData(state = defaultState, action) {
    switch (action.type) {
        case GET_BOARDS:
            return Object.assign({}, state, {
                boards: action.boards
            });
        default:
            return state
    }
}