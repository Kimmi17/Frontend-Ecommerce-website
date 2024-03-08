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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
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
          <label className="block text-gray-700 font-semibold">ID</label>
          <p>{user.id}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Role</label>
          <p>{user.role}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Creation Date
          </label>
          <p>{new Date(user.creationAt).toLocaleString()}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Updated Date
          </label>
          <p>{new Date(user.updatedAt).toLocaleString()}</p>
        </div>
        <button onClick={handleClick}>Log out</button>
      </div>
    </div>
  );
};

export default UserInfo;
