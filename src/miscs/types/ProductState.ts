import { Product, ProductResponse } from "./types";

export interface ProductState {
  products: ProductResponse;
  productsForAdmin: Product[];
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
  productsForAdmin: [],
  selectedProduct: null,
  editProduct: null,
  loading: false,
  error: null,
};
