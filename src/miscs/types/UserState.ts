// import { Product } from "./types";

export type UserData = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  banStatus: boolean;
  orders: any;
};

export interface UserState {
  currentUser: UserData | null;
  users: any[];
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  currentUser: null,
  users: [],
  token: null,
  isLoading: false,
  error: null,
};
