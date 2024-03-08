// productSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Product } from "../../miscs/types/types";
import { initialState } from "../../miscs/types/ProductState";

const url = "https://api.escuelajs.co/api/v1/products";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const response = await axios.get<Product[]>(url);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }
);

// New async thunk action creator to fetch a product by its ID
export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async (productId: string) => {
    try {
      const response = await axios.get<Product>(`${url}/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching product by ID");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching product by ID";
      });
  },
});

export const productReducer = productSlice.reducer;

export default productSlice;
