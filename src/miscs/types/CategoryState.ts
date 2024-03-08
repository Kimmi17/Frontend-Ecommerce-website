import { Category, Product } from "./types";

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  products: Product[];
}

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  products: [],
};
