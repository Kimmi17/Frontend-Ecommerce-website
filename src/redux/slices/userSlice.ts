import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginFormValues, RegisterFormValues } from "../../miscs/types/types";
import { UserData, initialState } from "../../miscs/types/UserState";
import { toast } from "../../components/ui/use-toast";

const url = "http://localhost:8080/api/v1/users";

type AuthResponse = {
  userData: UserData;
  token: string;
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }: LoginFormValues) => {
    try {
      const authResponse = await axios.post<AuthResponse>(`${url}/login`, {
        email,
        password,
      });
      let user = null;
      console.log(authResponse);
      if (authResponse) {
        user = authResponse.data.userData;
        localStorage.setItem("accessToken", authResponse.data.token);
      }
      toast({
        title: "Login successful",
        description: `Welcome back, ${email}`,
        duration: 2000,
      });
      return user;
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  }
);

export const getUserByToken = createAsyncThunk("getUserByToken", async () => {
  let accessToken = localStorage.getItem("accessToken");
  try {
    if (accessToken) {
      const userDataResponse = await axios.get<any>(
        "http://localhost:8080/api/v1/users/getUserByToken",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return userDataResponse.data;
    }

    return initialState;
  } catch (error) {
    throw new Error("Invalid email or password");
  }
});

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  let accessToken = localStorage.getItem("accessToken");
  try {
    const userListResponse = await axios.get<any>(
      "http://localhost:8080/api/v1/users",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return userListResponse.data;
  } catch (error) {
    throw new Error("Invalid email or password");
  }
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ email, password }: RegisterFormValues) => {
    try {
      const response = await axios.post<AuthResponse>(`${url}/register`, {
        email,
        password,
      });
      return response.data.token;
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
      localStorage.removeItem("accessToken");
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
        localStorage.removeItem("accessToken");
        state.error = (action.payload as Error)?.message || "Token expired";
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as Error)?.message || "Token expired";
      });
  },
});

export const userReducer = userSlice.actions;

export default userSlice;
