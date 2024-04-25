// categorySlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Product, ProductResponse } from "../../miscs/types/types";
import { initialState } from "../../miscs/types/CategoryState";

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  try {
    const response = await axios.get<Category[]>(
      "http://localhost:8080/api/v1/categories"
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching categories");
  }
});

// Async thunk to fetch products for a specific category
export const fetchProductsByCategory = createAsyncThunk(
  "fetchProductsByCategory",
  async (categoryId: string) => {
    try {
      const response = await axios.get<ProductResponse>(
        `http://localhost:8080/api/v1/products/category/${categoryId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error fetching products for category");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching categories";
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error fetching products for category";
      });
  },
});

export const categoryReducer = categorySlice.reducer;

export default categorySlice;
