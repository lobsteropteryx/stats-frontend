import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'localFilter',
  initialState: {
    cards: [],
    columns: [],
    startColumn: { id: null, name: null },
    endColumn: { id: null, name: null },
    labels: []
  },
  reducers: {
    setCards: (state, action) => {
        state.cards = action.payload;
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
    setLabels: (state, action) => {
      state.labels = action.payload;
    }
  }
});

export const { 
    setCards,
    setColumns,
    setStartColumn,
    setEndColumn,
    setLabels
} = filterSlice.actions;

export default filterSlice.reducer;