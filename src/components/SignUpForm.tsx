import React, { useState, ChangeEvent, FormEvent } from "react";

const SignupForm: React.FC<{
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowSignup }) => {
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          avatar,
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating user");
      }

      const data = await response.json();
      console.log("User created:", data);

      setShowSignup(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="first name"
              className="block text-gray-700 font-semibold"
            >
              First name
            </label>
            <input
              type="text"
              id="first name"
              name=" first name"
              value={firstname}
              onChange={handleFirstNameChange}
              className="mt-1 px-4 py-2 block w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="first name"
              className="block text-gray-700 font-semibold"
            >
              Last name
            </label>
            <input
              type="text"
              id="last name"
              name=" lasr name"
              value={lastname}
              onChange={handleLastNameChange}
              className="mt-1 px-4 py-2 block w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 px-4 py-2 block w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 px-4 py-2 block w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-gray-700 font-semibold"
            >
              Avatar URL
            </label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={avatar}
              onChange={handleAvatarChange}
              className="mt-1 px-4 py-2 block w-full border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            className="text-blue-500"
            onClick={() => setShowSignup(false)}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
