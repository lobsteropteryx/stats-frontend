import { createSlice } from '@reduxjs/toolkit';
import Trello from "trello";
import * as api from '../Trello/api';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    apiKey: 'e052546597a829919aae4fbd2a6e4095',
    boards: [],
    board: null,
    columns: []
  },
  reducers: {
    fetchPending: state => {
        state.isFetching = true;
    },
    fetchComplete: state => {
        state.isFetching = false;
    },
    setTrelloToken: (state, action) => {
        state.token = action.payload;
    },
    setBoards: (state, action) => {
        state.boards = action.payload;
    },
    selectBoard: (state, action) => {
        state.selectedBoard = action.payload;
        state.startColumn = null;
        state.endColumn = null;
    },
    setColumns: (state, action) => {
        state.columns = action.payload;
    },
    setStartColumn: (state, action) => {
        state.startColumn = action.payload;
    },
    setEndColumn: (state, action) => {
        state.endColumn = action.payload;
    },
    setCards: (state, action) => {
        state.cards = action.payload;
    },
    setActions: (state, action) => {
        state.actions = action.payload;
    },
    setStartDate: (state, action) => {
        state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
        state.endDate = action.payload;
    }
  }
});

export const { 
    fetchPending,
    fetchComplete,
    setTrelloToken,
    setBoards,
    selectBoard,
    setColumns,
    setStartColumn,
    setEndColumn,
    setCards,
    setActions,
    setStartDate,
    setEndDate 
} = filterSlice.actions;

const getTrelloClient = filter => {
    return new Trello(filter.apiKey, filter.token);
}

export const fetchBoards = () => async (dispatch, getState) => {
    const client = getTrelloClient(getState().filter);
    dispatch(fetchPending());
    dispatch(setBoards(await api.fetchBoards(client)));
    dispatch(fetchComplete());
}

export const fetchColumnsForBoard = (boardId) => async (dispatch, getState) => {
    const client = getTrelloClient(getState().filter);
    dispatch(fetchPending());
    dispatch(setColumns(await api.fetchColumnsForBoard(client, boardId)));
    dispatch(fetchComplete());
}

export const fetchActionsForBoard = (boardId) => async (dispatch, getState) => {
    const client = getTrelloClient(getState().filter);
    dispatch(fetchPending());
    dispatch(setActions(await api.fetchActionsForBoard(client, boardId)));
    dispatch(fetchComplete());
}

export const fetchCardsForBoard = (boardId) => async (dispatch, getState) => {
    const client = getTrelloClient(getState().filter);
    dispatch(fetchPending());
    dispatch(setCards(await api.fetchCardsForBoard(client, boardId)));
    dispatch(fetchComplete());
}

export default filterSlice.reducer;