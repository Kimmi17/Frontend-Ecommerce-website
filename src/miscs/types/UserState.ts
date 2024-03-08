// import { Product } from "./types";

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
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
