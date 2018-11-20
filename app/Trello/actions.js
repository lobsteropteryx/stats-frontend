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

export const SET_BOARD = "SET_BOARD";
export function setBoard(board) {
    return {type: SET_BOARD, board}
}

export const SELECT_BOARD = "SELECT_BOARD";
export function selectBoard(board) {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(setBoard(board));
        return dispatch(fetchColumns(state.trello.apiKey, state.trello.token, board.value))
            .then(dispatch(fetchCards(state.trello.apiKey, state.trello.token, board.value)))
    }
}

export const FETCH_BOARDS = "FETCH_BOARDS";
export function fetchBoards(apiKey, token) {
    return (dispatch) => {
        const trello = new Trello(apiKey, token);

        return trello.makeRequest('get', '/1/members/me/boards', {filter: 'open'})
            .then(boards => dispatch(getBoards(boards)));
    }
}

export const GET_COLUMNS = "GET_COLUMNS";
export function getColumns(columns) {
    return {type: GET_COLUMNS, columns}
}

export const FETCH_COLUMNS = "FETCH_COLUMNS";
export function fetchColumns(apiKey, token, boardId) {
    return (dispatch) => {
        const trello = new Trello(apiKey, token);

        return trello.getListsOnBoard(boardId)
            .then(columns => dispatch(getColumns(columns)));
    }
}

export const SET_START_COLUMN = "SET_START_COLUMN";
export function setStartColumn(column) {
    return {type: SET_START_COLUMN, column}
}

export const SET_END_COLUMN = "SET_ENDING_COLUMN";
export function setEndColumn(column) {
    return {type: SET_END_COLUMN, column}
}

export const SET_START_DATE = "SET_START_DATE";
export function setStartDate(date) {
    return {type: SET_START_DATE, date}
}

export const SET_END_DATE = "SET_END_DATE";
export function setEndDate(date) {
    return {type: SET_END_DATE, date}
}

export const GET_CARDS = "GET_CARDS";
export function getCards(cards) {
    return {type: GET_CARDS, cards}
}

export const FETCH_CARDS = "FETCH_CARDS";
export function fetchCards(apiKey, token, boardId) {
    return (dispatch) => {
        const trello = new Trello(apiKey, token);

        return trello.makeRequest('get', `/1/boards/${boardId}/cards`, {filter: 'open'})
            .then(cards => dispatch(getCards(cards)));
    }
}

export const GET_ACTIONS = "GET_ACTIONS";
export function getActions(actions) {
    return {type: GET_ACTIONS, actions}
}

export const FETCH_ACTIONS = "FETCH_ACTIONS";
export function fetchActions(apiKey, token, boardId) {
    return (dispatch) => {
        const trello = new Trello(apiKey, token);

        return trello.makeRequest('get', `/1/boards/${boardId}/actions`, {filter: 'open'})
            .then(actions => dispatch(getActions(actions)));
    }
}