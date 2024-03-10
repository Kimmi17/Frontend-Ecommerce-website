import { createSelector, createSlice } from "@reduxjs/toolkit";
import { FilterState, initialState } from "../../miscs/types/FilterState";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload.filters;
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const Filters = (state: RootState) => state.filters.filters;

export const getFiltersState = createSelector(
  (state: RootState) => state,
  ({ filters }) => filters
);

export default filterSlice;
