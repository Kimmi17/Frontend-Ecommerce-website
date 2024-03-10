import React from "react";
import { User } from "../miscs/types/UserState";
import store from "../redux/store";
import userSlice from "../redux/slices/userSlice";

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const handleClick = () => {
    store.dispatch(userSlice.actions.logoutUser());
  };

  return (
    <div
      className="bg-cover min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/531844/pexels-photo-531844.jpeg')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">User Info</h2>
        <div className="flex items-center mb-4">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">ID:</label>
          <p className="text-gray-800">{user.id}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Role:</label>
          <p className="text-gray-800">{user.role}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Creation Date:
          </label>
          <p className="text-gray-800">
            {new Date(user.creationAt).toLocaleString()}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Updated Date:
          </label>
          <p className="text-gray-800">
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        </div>
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
