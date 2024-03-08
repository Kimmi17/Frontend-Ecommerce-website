import configureMockStore from "redux-mock-store";

import axios from "axios";
import { LoginFormValues, RegisterFormValues } from "../miscs/types/types";
import { loginUser, registerUser } from "../redux/slices/userSlice";

// Mocking axios
jest.mock("axios");

const mockStore = configureMockStore([]);

// Mock response data
const mockAuthResponse = { access_token: "mock-access-token" };
const mockUser = { id: "mock-id", email: "test@example.com" };

describe("userSlice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("loginUser", () => {
    it("should successfully log in user", async () => {
      const store = mockStore({});
      const mockLoginFormValues: LoginFormValues = {
        email: "test@example.com",
        password: "password",
      };

      // Mock axios post
      (
        axios.post as jest.MockedFunction<typeof axios.post>
      ).mockResolvedValueOnce({ data: mockAuthResponse });
      (
        axios.get as jest.MockedFunction<typeof axios.get>
      ).mockResolvedValueOnce({ data: mockUser });

      await store.dispatch(loginUser(mockLoginFormValues) as any);

      const expectedActions = [
        { type: loginUser.pending.type },
        {
          type: loginUser.fulfilled.type,
          payload: { token: mockAuthResponse.access_token, user: mockUser },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("should handle login failure", async () => {
      const store = mockStore({});
      const mockLoginFormValues: LoginFormValues = {
        email: "test@example.com",
        password: "password",
      };

      // Mock axios post
      (
        axios.post as jest.MockedFunction<typeof axios.post>
      ).mockRejectedValueOnce(new Error("Invalid email or password"));

      await store.dispatch(loginUser(mockLoginFormValues) as any);

      const expectedActions = [
        { type: loginUser.pending.type },
        { type: loginUser.rejected.type, error: "Invalid email or password" },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe("registerUser", () => {
    it("should successfully register user", async () => {
      const store = mockStore({});
      const mockRegisterFormValues: RegisterFormValues = {
        email: "test@example.com",
        password: "password",
        name: "",
        confirmPassword: "",
      };

      // Mock axios post
      (
        axios.post as jest.MockedFunction<typeof axios.post>
      ).mockResolvedValueOnce({ data: mockAuthResponse });

      await store.dispatch(registerUser(mockRegisterFormValues) as any);

      const expectedActions = [
        { type: registerUser.pending.type },
        {
          type: registerUser.fulfilled.type,
          payload: mockAuthResponse.access_token,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("should handle registration failure", async () => {
      const store = mockStore({});
      const mockRegisterFormValues: RegisterFormValues = {
        email: "test@example.com",
        password: "password",
        name: "",
        confirmPassword: "",
      };

      // Mock axios post
      (
        axios.post as jest.MockedFunction<typeof axios.post>
      ).mockRejectedValueOnce(new Error("Error registering user"));

      await store.dispatch(registerUser(mockRegisterFormValues) as any);

      const expectedActions = [
        { type: registerUser.pending.type },
        { type: registerUser.rejected.type, error: "Error registering user" },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
