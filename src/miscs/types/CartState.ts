import { Product } from "./types";

export interface CartState {
  products: (Product & {
    quantity: number;
  })[];
}

export const initialState: CartState = {
  products: [],
};
