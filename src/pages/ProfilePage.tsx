import React from "react";
import AuthModal from "../components/AuthModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UserInfo from "../components/UserInfo";

const Profile = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <div>
      {!currentUser && <AuthModal />}
      {currentUser && <UserInfo user={currentUser} />}
    </div>
  );
};

export default Profile;
