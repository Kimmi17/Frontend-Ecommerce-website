import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Product, initialState } from "../../miscs/types";

const PRODUCT_API_URL = "https://api.escuelajs.co/api/v1/products";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const response = await axios.get<Product[]>(PRODUCT_API_URL);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching products");
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
      });
  },
});

export const productReducer = productSlice.reducer;

export default productSlice;
