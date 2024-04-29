import { Product, ProductResponse } from "./types";

export interface ProductState {
  products: ProductResponse;
  productsForAdmin: ProductResponse;
  selectedProduct: Product | null;
  editProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: {
    totalProduct: 0,
    products: [],
  },
  productsForAdmin: {
    totalProduct: 0,
    products: [],
  },
  selectedProduct: null,
  editProduct: null,
  loading: false,
  error: null,
};
