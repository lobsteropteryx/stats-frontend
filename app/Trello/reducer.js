import {
    SET_TRELLO_TOKEN,
    GET_BOARDS,
    FETCH_BOARDS,
    SET_BOARD,
    GET_COLUMNS,
    FETCH_COLUMNS,
    SET_START_COLUMN,
    SET_END_COLUMN,
    GET_CARDS,
    FETCH_CARDS,
    GET_ACTIONS,
    FETCH_ACTIONS,
    SET_START_DATE,
    SET_END_DATE
} from './actions';

const defaultState = {
    apiKey: 'e052546597a829919aae4fbd2a6e4095',
    boards: [],
    board: null,
    columns: []
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
        case SET_BOARD:
            return Object.assign({}, state, {
                selectedBoard: action.board,
                startColumn: null,
                endColumn: null
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
        case SET_START_COLUMN:
            return Object.assign({}, state, {
                startColumn: action.column
            });
        case SET_END_COLUMN:
            return Object.assign({}, state, {
                endColumn: action.column
            });
        case GET_CARDS:
            return Object.assign({}, state, {
                isFetching: false,
                cards: action.cards
            });
        case FETCH_CARDS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case GET_ACTIONS:
            return Object.assign({}, state, {
                isFetching: false,
                actions: action.actions
            });
        case FETCH_ACTIONS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case SET_START_DATE:
            return Object.assign({}, state, {
                startDate: action.date
            });
        case SET_END_DATE:
            return Object.assign({}, state, {
                endDate: action.date
            });
        default:
            return state
    }
}