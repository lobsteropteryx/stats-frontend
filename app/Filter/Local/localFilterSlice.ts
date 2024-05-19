import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Card, Label, Column } from 'stats-models';

interface LocalFilterState {
  cards:Card[],
  columns:Column[],
  startColumn:Column,
  endColumn:Column,
  labels:Label[],
  selectedLabels:Label[]
};

const initialState:LocalFilterState = {
  cards: [],
  columns: [],
  startColumn: { id: null, name: null },
  endColumn: { id: null, name: null },
  labels: [],
  selectedLabels: [] 
}

const filterSlice = createSlice({
  name: 'localFilter',
  initialState,
  reducers: {
    setCards: (state:LocalFilterState, action:PayloadAction<Card[]>) => {
        state.cards = action.payload;
    },
    setColumns: (state:LocalFilterState, action:PayloadAction<Column[]>) => {
        state.columns = action.payload;
    },
    setStartColumn: (state:LocalFilterState, action:PayloadAction<Column>) => {
        state.startColumn = action.payload;
    },
    setEndColumn: (state:LocalFilterState, action:PayloadAction<Column>) => {
        state.endColumn = action.payload;
    },
    setLabels: (state:LocalFilterState, action:PayloadAction<Label[]>) => {
      state.labels = action.payload;
    },
    selectLabels: (state:LocalFilterState, action:PayloadAction<Label[]>) => {
      state.selectedLabels = action.payload;
    }
  }
});

export const { 
    setCards,
    setColumns,
    setStartColumn,
    setEndColumn,
    setLabels,
    selectLabels
} = filterSlice.actions;

export default filterSlice.reducer;