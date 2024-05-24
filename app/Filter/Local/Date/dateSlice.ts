import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DateState {
  startDate:string,
  endDate:string
};

const initialState:DateState = {
  startDate: null,
  endDate: null
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setStartDate: (state:DateState, action:PayloadAction<String>) => {
        state.startDate = action.payload as string;
    },
    setEndDate: (state:DateState, action:PayloadAction<String>) => {
        state.endDate = action.payload as string;
    }
  }
});

export const { 
    setStartDate,
    setEndDate 
} = dateSlice.actions;

export default dateSlice.reducer;