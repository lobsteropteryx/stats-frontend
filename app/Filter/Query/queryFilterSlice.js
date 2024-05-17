import { createSlice } from '@reduxjs/toolkit';
import { first, last } from 'lodash';
import { parseTrelloCards } from '../../Trello/parser';
import { setCards, setColumns, setStartColumn, setEndColumn, setLabels, selectLabels } from '../Local/localFilterSlice';
import { getCsvData } from './csvExporter';

const filterSlice = createSlice({
  name: 'queryFilter',
  initialState: {
    apiKey: '683c53951940857c57dc075ab2b57ad8',
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
    disableExport: state => {
        state.exportEnabled = false;
    },
    setTrelloToken: (state, action) => {
        state.token = action.payload;
    },
    setBoards: (state, action) => {
        state.boards = action.payload;
    },
    selectBoard: (state, action) => {
        state.selectedBoard = action.payload;
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
    disableExport,
    setTrelloToken,
    setBoards,
    selectBoard,
    setCsvData
} = filterSlice.actions;

export const changeSelectedBoard = (board) => (dispatch) => {
    dispatch(selectBoard(board));
    dispatch(setStartColumn({ id: null, name: null }));
    dispatch(setEndColumn({ id: null, name: null }));
    dispatch(setLabels([]));
    dispatch(selectLabels([]));
    dispatch(disableExport());
}

export const fetchBoards = (apiClient) => async (dispatch) => {
    dispatch(fetchPending());
    dispatch(setBoards(await apiClient.getBoards()));
    dispatch(fetchComplete());
}

export const fetchDataForBoard = (apiClient, boardId) => async (dispatch) => {
    dispatch(fetchPending());
    const columns = await apiClient.getListsForBoard(boardId);
    dispatch(setColumns(columns));
    dispatch(setStartColumn(first(columns)));
    dispatch(setEndColumn(last(columns)));
    const labels = await apiClient.getLabelsForBoard(boardId);
    dispatch(setLabels(labels));
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