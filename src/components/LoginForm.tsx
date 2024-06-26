import React, { useState, ChangeEvent, FormEvent } from "react";
import store from "../redux/store";
import { loginUser } from "../redux/slices/userSlice";
import { Navigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginForm: React.FC<{
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowSignup }) => {
  const dispatch = store.dispatch;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validation
    const validationErrors: { email?: string; password?: string } = {};

    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      dispatch(loginUser({ email, password }));
      return <Navigate to="/profile" replace />;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div
      className="bg-cover min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/531844/pexels-photo-531844.jpeg')",
      }}
    >
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-gray-700 font-semibold flex items-center"
            >
              <FaEnvelope className="mr-2" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={`mt-1 px-4 py-2 block w-full border rounded-md focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-gray-700 font-semibold flex items-center"
            >
              <FaLock className="mr-2" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className={`mt-1 px-4 py-2 block w-full border rounded-md focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">
          Don't have an account?{" "}
          <button className="text-blue-500" onClick={() => setShowSignup(true)}>
            Signup
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
