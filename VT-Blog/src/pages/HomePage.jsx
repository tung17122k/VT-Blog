import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import styled from "styled-components";
import HeaderMenu from "../component/layout/HeaderMenu";

const HomePageStyles = styled.div``;

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <HomePageStyles>
      <HeaderMenu></HeaderMenu>
    </HomePageStyles>
  );
};

export default HomePage;
