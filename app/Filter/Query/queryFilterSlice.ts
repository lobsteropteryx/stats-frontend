import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { first, last } from 'lodash';
import { setCards, setColumns, setStartColumn, setEndColumn, setLabels, selectLabels } from '../Local/localFilterSlice';
import { getCsvData } from './csvExporter';
import { Board } from '@lobsteropteryx/stats-models';

interface QueryFilterState {
    baseUrl:string,
    boards:Board[],
    selectedBoard:Board,
    exportEnabled:boolean,
    csvData:Object,
    isFetching:boolean
};

const initialState:QueryFilterState = {
    baseUrl: 'https://api.stats.com',
    boards: [],
    selectedBoard: {id: "", name: ""},
    exportEnabled: false,
    csvData: {},
    isFetching: false
};

const filterSlice = createSlice({
  name: 'queryFilter',
  initialState,
  reducers: {
    fetchPending: (state:QueryFilterState) => {
        state.isFetching = true;
    },
    fetchComplete: (state:QueryFilterState) => {
        state.isFetching = false;
    },
    enableExport: (state:QueryFilterState) => {
        state.exportEnabled = true;
    },
    disableExport: (state:QueryFilterState, action:PayloadAction<void>) => {
        state.exportEnabled = false;
    },
    setBoards: (state:QueryFilterState, action:PayloadAction<Board[]>) => {
        state.boards = action.payload;
    },
    selectBoard: (state:QueryFilterState, action:PayloadAction<Board>) => {
        state.selectedBoard = action.payload;
    },
    setCsvData: (state:QueryFilterState, action:PayloadAction<Object>) => {
        state.csvData = action.payload;
    }
  }
});

export const { 
    fetchPending,
    fetchComplete,
    enableExport,
    disableExport,
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
    const cards = await apiClient.getCardsForBoard(board.id);
    dispatch(setCards(cards));
    const csvData = await getCsvData(cards, board.name);
    dispatch(setCsvData(csvData));
    dispatch(fetchComplete());
    dispatch(enableExport());
}

export default filterSlice.reducer