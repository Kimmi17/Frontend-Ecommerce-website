import React, { useState, ChangeEvent, FormEvent } from "react";
import SignupForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const AuthModal: React.FC = () => {
  const [showSignup, setShowSignup] = useState<boolean>(false);

  return (
    <>
      {showSignup ? (
        <SignupForm setShowSignup={setShowSignup} />
      ) : (
        <LoginForm setShowSignup={setShowSignup} />
      )}
    </>
  );
};

export default AuthModal;
