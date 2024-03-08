// store.ts

import { combineSlices, configureStore } from "@reduxjs/toolkit";

import productSlice from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";

export const rootReducer = combineSlices(
  productSlice,
  categorySlice,
  userSlice,
  cartSlice
);
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
