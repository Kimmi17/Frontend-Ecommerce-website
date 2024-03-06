// store.ts

import { combineSlices, configureStore } from "@reduxjs/toolkit";

import productSlice from "./slices/productSlice";

export const rootReducer = combineSlices(productSlice);
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
