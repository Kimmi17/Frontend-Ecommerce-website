import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../../miscs/types/CartState";
import type { PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "../store";
import axios from "axios";
import { Product } from "../../miscs/types/types";

const url = "http://localhost:8080/api/v1/products";

export const fetchProductsByIds = createAsyncThunk(
  "fetchProductByIds",
  async () => {
    const products = store.getState().cart.products;
    try {
      const response = await Promise.all(
        products.map((p) => axios.get<Product>(`${url}/${p.id}`))
      );
      return response.map((x) => {
        const productX = products.find((p) => p.id === x.data._id);
        if (productX) {
          return { ...x.data, quantity: productX.quantity };
        } else {
          throw new Error("Error fetching product by ID");
        }
      });
    } catch (error) {
      throw new Error("Error fetching product by ID");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductsToCart: (state, action: PayloadAction<string>) => {
      const isProductExisted = state.products.some(
        (p) => p.id === action.payload
      );
      if (isProductExisted) {
        state.productData = state.productData.map((p) => {
          if (p._id === action.payload) {
            return {
              ...p,
              quantity: p.quantity + 1,
            };
          }
          return p;
        });
      } else {
        state.products.push({ id: action.payload, quantity: 1 });
      }
    },
    removeProductsToCart: (state, action: PayloadAction<string>) => {
      const updateProducts = state.productData.map((p) => {
        if (p._id === action.payload) {
          return {
            ...p,
            quantity: p.quantity - 1,
          };
        }
        return p;
      });
      state.productData = updateProducts.filter((p) => p.quantity > 0);
    },
    deleteProductsToCart: (state, action: PayloadAction<string>) => {
      const removeProductId = action.payload;
      state.productData = state.productData.filter(
        (p) => p._id !== removeProductId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
      })
      .addCase(fetchProductsByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching product by ID";
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const { addProductsToCart, removeProductsToCart, deleteProductsToCart } =
  cartSlice.actions;

export const selectCartProducts = (state: RootState) => state.cart.products;

export default cartSlice;
