import { createSlice } from "@reduxjs/toolkit";
import { FilterState, initialState } from "../../miscs/types/FilterState";
import type { PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "../store";
import { fetchAllProducts } from "./productSlice";

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload.filters;
      // store.dispatch(fetchAllProducts());
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const Filters = (state: RootState) => state.filters.filters;

export default filterSlice;
