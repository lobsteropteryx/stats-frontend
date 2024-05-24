import { configureStore } from "@reduxjs/toolkit";
import queryFilterSlice from "../app/Filter/Query/queryFilterSlice";
import localFilterSlice from "../app/Filter/Local/localFilterSlice";
import settingsSlice from "../app/Settings/settingsSlice";
import dateSlice from "../app/Filter/Local/Date/dateSlice";

export function createTestStore() {
    const store = configureStore({
        reducer: {
            queryFilter: queryFilterSlice,
            localFilter: localFilterSlice,
            settings: settingsSlice,
            date: dateSlice
        }
    });
    return store;
  }