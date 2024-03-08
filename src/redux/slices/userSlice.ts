import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginFormValues, RegisterFormValues } from "../../miscs/types/types";
import { initialState } from "../../miscs/types/UserState";

const apiUrl = "https://api.escuelajs.co/api/v1/auth";

interface AuthResponse {
  access_token: string;
}

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }: LoginFormValues) => {
    try {
      const response = await axios.post<AuthResponse>(`${apiUrl}/login`, {
        email,
        password,
      });
      return response.data.access_token;
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ email, password }: RegisterFormValues) => {
    try {
      const response = await axios.post<AuthResponse>(`${apiUrl}/register`, {
        email,
        password,
      });
      return response.data.access_token;
    } catch (error) {
      throw new Error("Error registering user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as Error)?.message || "Error logging in";
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as Error)?.message || "Error registering user";
      });
  },
});

export const userReducer = userSlice.actions;

export default userSlice;
