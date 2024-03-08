import { Product } from "./types";

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  editProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  editProduct: null,
  loading: false,
  error: null,
};
