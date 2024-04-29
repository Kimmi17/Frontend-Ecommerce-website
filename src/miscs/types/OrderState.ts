import { Order } from "./types";

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};
