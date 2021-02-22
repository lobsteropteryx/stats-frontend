import { createSlice } from '@reduxjs/toolkit';
import { first, last } from 'lodash';
import { parseTrelloCards } from '../../Trello/parser';
import { setCards, setColumns, setStartColumn, setEndColumn } from '../Local/localFilterSlice';
import { getCsvData } from './csvExporter';

const filterSlice = createSlice({
  name: 'queryFilter',
  initialState: {
    apiKey: 'e052546597a829919aae4fbd2a6e4095',
    boards: [],
    selectedBoard: {},
    exportEnabled: false,
    csvData: {}
  },
  reducers: {
    fetchPending: state => {
        state.isFetching = true;
    },
    fetchComplete: state => {
        state.isFetching = false;
    },
    enableExport: state => {
        state.exportEnabled = true;
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
        state.exportEnabled = false;
    },
    setCsvData: (state, action) => {
        state.csvData = action.payload;
    }
  }
});

export const { 
    fetchPending,
    fetchComplete,
    enableExport,
    setTrelloToken,
    setBoards,
    selectBoard,
    setCsvData
} = filterSlice.actions;

export const fetchBoards = (apiClient) => async (dispatch) => {
    dispatch(fetchPending());
    dispatch(setBoards(await apiClient.getBoards()));
    dispatch(fetchComplete());
}

export const fetchColumnsForBoard = (apiClient, boardId) => async (dispatch) => {
    dispatch(fetchPending());
    const columns = await apiClient.getListsForBoard(boardId);
    dispatch(setColumns(columns));
    dispatch(setStartColumn(first(columns)));
    dispatch(setEndColumn(last(columns)));
    dispatch(fetchComplete());
}

export const fetchCardsForBoard = (apiClient, board) => async (dispatch) => {
    dispatch(fetchPending());
    const actions = await apiClient.getCardsForBoard(board.id);
    const cards = parseTrelloCards(actions);
    dispatch(setCards(cards));
    const csvData = await getCsvData(cards, board.name);
    dispatch(setCsvData(csvData));
    dispatch(fetchComplete());
    dispatch(enableExport());
}

export default filterSlice.reducer;