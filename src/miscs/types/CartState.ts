import { Product } from "./types";

export interface CartState {
  products: { id: number; quantity: number }[];
  productData: (Product & {
    quantity: number;
  })[];
  loading: boolean;
  error: string | null;
}

export const initialState: CartState = {
  products: [],
  productData: [],
  loading: false,
  error: null,
};
