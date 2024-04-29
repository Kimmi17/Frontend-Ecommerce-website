import React from "react";
import AuthModal from "../components/AuthModal";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import UserInfo from "../components/UserInfo";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  if (user) {
    return <Navigate to="/" replace />;
  }
  return <AuthModal />;
};

export default LoginPage;
