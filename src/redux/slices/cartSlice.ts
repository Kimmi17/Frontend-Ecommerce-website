import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../miscs/types/types";
import { initialState } from "../../miscs/types/CartState";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductsToCart: (state, action: PayloadAction<Product>) => {
      const isProductExisted = state.products.some(
        (p) => p.id === action.payload.id
      );
      if (isProductExisted) {
        state.products = state.products.map((p) => {
          if (p.id === action.payload.id) {
            return {
              ...p,
              quantity: p.quantity + 1,
            };
          }
          return p;
        });
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeProductsToCart: (state, action: PayloadAction<number>) => {
      const updateProducts = state.products.map((p) => {
        if (p.id === action.payload) {
          return {
            ...p,
            quantity: p.quantity - 1,
          };
        }
        return p;
      });
      state.products = updateProducts.filter((p) => p.quantity > 0);
    },
    deleteProductsToCart: (state, action: PayloadAction<number>) => {
      const removeProductId = action.payload;
      state.products = state.products.filter((p) => p.id !== removeProductId);
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const selectCartProducts = (state: RootState) => state.cart.products;

export default cartSlice;
