import { Category, Product, ProductResponse } from "./types";

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  products: ProductResponse;
}

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  products: {
    totalProduct: 0,
    products: [],
  },
};
