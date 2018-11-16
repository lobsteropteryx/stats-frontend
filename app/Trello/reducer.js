import {
    SET_TRELLO_TOKEN,
    GET_BOARDS,
    FETCH_BOARDS,
    SELECT_BOARD,
    GET_COLUMNS,
    FETCH_COLUMNS
} from './actions';

const defaultState = {
    apiKey: 'e052546597a829919aae4fbd2a6e4095',
    boards: []
};

export function trello(state = defaultState, action) {
    switch (action.type) {
        case SET_TRELLO_TOKEN:
            return Object.assign({}, state, {
                token: action.token
            });
        case GET_BOARDS:
            return Object.assign({}, state, {
                isFetching: false,
                boards: action.boards
            });
        case FETCH_BOARDS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case SELECT_BOARD:
            return Object.assign({}, state, {
               selectedBoard: action.board
            });
        case GET_COLUMNS:
            return Object.assign({}, state, {
                isFetching: false,
                columns: action.columns
            });
        case FETCH_COLUMNS:
            return Object.assign({}, state, {
                isFetching: true
            });
        default:
            return state
    }
}