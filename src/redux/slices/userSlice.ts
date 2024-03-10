import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginFormValues, RegisterFormValues } from "../../miscs/types/types";
import { User, initialState } from "../../miscs/types/UserState";
import { toast } from "../../components/ui/use-toast";

const apiUrl = "https://api.escuelajs.co/api/v1/auth";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }: LoginFormValues) => {
    try {
      const tokenResponse = await axios.post<AuthResponse>(`${apiUrl}/login`, {
        email,
        password,
      });
      let user = null;
      if (tokenResponse) {
        const userResponse = await axios.get<User>(`${apiUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        });
        user = userResponse.data;
        localStorage.setItem("accessToken", tokenResponse.data.access_token);
        localStorage.setItem("refreshToken", tokenResponse.data.refresh_token);
      }
      toast({
        title: "Login successful",
        description: `Welcome back, ${user?.email}`,
        duration: 2000,
      });
      return user;
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  }
);

export const getUserByToken = createAsyncThunk("getUserByToken", async () => {
  let accessToken = localStorage.getItem("refreshToken");
  let refreshToken = localStorage.getItem("refreshToken");
  try {
    if (refreshToken) {
      const tokenResponse = await axios.post<AuthResponse>(
        `${apiUrl}/refresh-token`,
        {
          refreshToken,
        }
      );
      accessToken = tokenResponse.data.access_token;
      refreshToken = tokenResponse.data.refresh_token;
    }
    let user = null;
    if (accessToken && refreshToken) {
      const userResponse = await axios.get<User>(`${apiUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      user = userResponse.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user?.email}`,
      });
    }
    return user;
  } catch (error) {
    throw new Error("Invalid email or password");
  }
});

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
        state.currentUser = action.payload;
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
      })
      .addCase(getUserByToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserByToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserByToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as Error)?.message || "Error registering user";
      });
  },
});

export const userReducer = userSlice.actions;

export default userSlice;
