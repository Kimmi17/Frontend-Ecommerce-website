import React, { useState, ChangeEvent, FormEvent } from "react";

const SignupForm: React.FC<{
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowSignup }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [isShopOwner, setIsShopOwner] = useState<boolean>(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsShopOwner(e.target.checked);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar,
          role: isShopOwner ? "admin" : "customer",
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating user");
      }

      const data = await response.json();
      console.log("User created:", data);

      // Assuming successful signup, you can redirect to login or any other action
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
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
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
          <div className="mb-4">
            <label htmlFor="isShopOwner" className="flex items-center">
              <input
                type="checkbox"
                id="isShopOwner"
                name="isShopOwner"
                checked={isShopOwner}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span className="text-gray-700">I am a shop owner</span>
            </label>
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
