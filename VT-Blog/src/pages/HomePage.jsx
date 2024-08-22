import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default HomePage;
