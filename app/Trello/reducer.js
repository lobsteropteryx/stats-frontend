import { GET_BOARDS, FETCH_BOARDS, SELECT_BOARD } from './actions';

const defaultState = {
    boards: []
};

export function trelloData(state = defaultState, action) {
    switch (action.type) {
        case GET_BOARDS:
            return Object.assign({}, state, {
                isFetching: false,
                boards: action.boards
            });
        case FETCH_BOARDS:
            return Object.assign({}, state, {
                isFetching: true
            });
        default:
            return state
    }
}