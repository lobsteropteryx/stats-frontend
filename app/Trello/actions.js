import Trello from "trello";

export const SET_TRELLO_TOKEN = "SET_TRELLO_TOKEN";
export function setTrelloToken(token) {
    return { type: SET_TRELLO_TOKEN, token}
}

export const INITIALIZE_DATA = "INITIALIZE_DATA";
export function initializeData(token) {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(setTrelloToken(token));
        return dispatch(fetchBoards(state.trello.apiKey, token));
    }
}

export const GET_BOARDS = "GET_BOARDS";
export function getBoards(boards) {
    return {type: GET_BOARDS, boards}
}

export const SELECT_BOARD = "SELECT_BOARD";
export function selectBoard(board) {
    return {type: SELECT_BOARD, board}
}

export const FETCH_BOARDS = "FETCH_BOARDS";
export function fetchBoards(apiKey, token) {
    return (dispatch) => {
        const trello = new Trello(apiKey, token);

        return trello.getBoards('me')
            .then(boards => dispatch(getBoards(boards)));
    }
}