import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UserInfo from "../components/UserInfo";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return <UserInfo user={currentUser} />;
};

export default Profile;
