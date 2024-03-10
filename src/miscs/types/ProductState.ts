import { Product } from "./types";

export interface ProductState {
  products: Product[];
  productsForAdmin: Product[];
  selectedProduct: Product | null;
  editProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  productsForAdmin: [],
  selectedProduct: null,
  editProduct: null,
  loading: false,
  error: null,
};
