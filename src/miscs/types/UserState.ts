import { Product } from "./types";

export interface User {
  id: number;
  name: string;
  email: string;
  cart: Product[];
}

export interface UserState {
  currentUser: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  currentUser: null,
  token: null,
  isLoading: false,
  error: null,
};
