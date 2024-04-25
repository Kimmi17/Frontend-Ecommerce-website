import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Product, ProductResponse } from "../../miscs/types/types";
import { initialState } from "../../miscs/types/ProductState";
import store from "../store";

const url = "http://localhost:8080/api/v1/products";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    const filters = store.getState().filters.filters;
    let filterParams = ``;

    if (filters.categoryId !== null) {
      filterParams += `?categoryId=${filters.categoryId}`;
    } else {
      filterParams += `?offset=${filters.offset}&limit=${filters.limit}`;
    }

    try {
      const response = await axios.get<ProductResponse>(url + filterParams);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }
);

export const fetchAllProductsForAdmin = createAsyncThunk(
  "fetchAllProductsForAdmin",
  async () => {
    try {
      const response = await axios.get<Product[]>(url);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }
);

export const deleteProductById = createAsyncThunk(
  "deleteProductById",
  async (id: string) => {
    try {
      const response = await axios.delete<Product[]>(`${url}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error deleting product with id: " + id);
    }
  }
);

export const searchProductsByTitle = createAsyncThunk(
  "searchProductsByTitle",
  async (keyword: string) => {
    try {
      const response = await axios.get<Product[]>(`${url}/?title=${keyword}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }
);

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
  reducers: {
    updateEditProduct: (state, action) => {
      state.editProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching products";
      })
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
      })
      .addCase(searchProductsByTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsByTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.productsForAdmin = action.payload;
      })
      .addCase(searchProductsByTitle.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error searching product by title";
      })
      .addCase(fetchAllProductsForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductsForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.productsForAdmin = action.payload;
      })
      .addCase(fetchAllProductsForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error fetching products for admin";
      });
  },
});

export const productReducer = productSlice.reducer;

export default productSlice;
