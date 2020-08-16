import { createSlice } from '@reduxjs/toolkit';
import Trello from "trello";
import ApiClient from '../Trello/ApiClient';
import { createActionParser } from "../actionParser";

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    apiKey: 'e052546597a829919aae4fbd2a6e4095',
    boards: [],
    selectedBoard: {},
    startColumn: {},
    endColumn: {},
    columns: [],
    actions: []
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
        state.startColumn = {};
        state.endColumn = {};
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
    setActions,
    setStartDate,
    setEndDate 
} = filterSlice.actions;

const buildApiClient = (filter) => {
    return new ApiClient(filter.apiKey, filter.token);
}

export const fetchBoards = () => async (dispatch, getState) => {
    const client = buildApiClient(getState().filter);
    dispatch(fetchPending());
    dispatch(setBoards(await client.getBoards()));
    dispatch(fetchComplete());
}

export const fetchColumnsForBoard = (boardId) => async (dispatch, getState) => {
    const client = buildApiClient(getState().filter);
    dispatch(fetchPending());
    dispatch(setColumns(await client.getColumnsForBoard(boardId)));
    dispatch(fetchComplete());
}

export const fetchActionsForBoard = (boardId, startColumn, endColumn) => async (dispatch, getState) => {
    const client = buildApiClient(getState().filter);
    dispatch(fetchPending());
    const parse = createActionParser(startColumn, endColumn);
    const actions = await client.getActionsForBoard(boardId);
    const parsedActions = parse(actions);
    dispatch(setActions(parsedActions));
    dispatch(fetchComplete());
}

export default filterSlice.reducer;