import { createSlice } from '@reduxjs/toolkit';
import { first, last } from 'lodash';
import { actionsToCards } from '../../Trello/actionParser';
import { setCards, setColumns, setStartColumn, setEndColumn } from '../Local/localFilterSlice';

const filterSlice = createSlice({
  name: 'queryFilter',
  initialState: {
    apiKey: 'e052546597a829919aae4fbd2a6e4095',
    boards: [],
    selectedBoard: {},
    exportEnabled: false
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
        state.startColumn = { id: null, name: null };
        state.endColumn = { id: null, name: null };
    }
  }
});

export const { 
    fetchPending,
    fetchComplete,
    setTrelloToken,
    setBoards,
    selectBoard
} = filterSlice.actions;

export const fetchBoards = (apiClient) => async (dispatch) => {
    dispatch(fetchPending());
    dispatch(setBoards(await apiClient.getBoards()));
    dispatch(fetchComplete());
}

export const fetchColumnsForBoard = (apiClient, boardId) => async (dispatch) => {
    dispatch(fetchPending());
    const columns = await apiClient.getColumnsForBoard(boardId);
    dispatch(setColumns(columns));
    dispatch(setStartColumn(first(columns)));
    dispatch(setEndColumn(last(columns)));
    dispatch(fetchComplete());
}

export const fetchActionsForBoard = (apiClient, boardId) => async (dispatch) => {
    dispatch(fetchPending());
    const actions = await apiClient.getActionsForBoard(boardId);
    const cards = actionsToCards(actions);
    dispatch(setCards(cards));
    dispatch(fetchComplete());
}

export default filterSlice.reducer;