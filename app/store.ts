import { configureStore } from "@reduxjs/toolkit";
import queryFilterSlice from "./Filter/Query/queryFilterSlice";
import localFilterSlice from "./Filter/Local/localFilterSlice";
import settingsSlice from "./Settings/settingsSlice";
import dateSlice from "./Filter/Local/Date/dateSlice";

export const store = configureStore({
    reducer: {
        queryFilter: queryFilterSlice,
        localFilter: localFilterSlice,
        settings: settingsSlice,
        date: dateSlice
    }
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']