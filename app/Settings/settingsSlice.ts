import { createSlice } from '@reduxjs/toolkit';

export const SCATTER = "scatter";
export const HISTOGRAM = "histogram";

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
      displayMode: { label: "Scatter Plot", value: SCATTER}
    },
    reducers: {
      setDisplayMode: (state, action) => {
          state.displayMode = action.payload;
      }
    }
});

export const { 
    setDisplayMode,
} = settingsSlice.actions;

export default settingsSlice.reducer;