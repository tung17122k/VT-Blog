import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import styled from "styled-components";
// import HeaderMenu from "../component/layout/HeaderMenu";
import HomeBanner from "../module/home/HomeBanner";
import Layout from "../component/layout/Layout";

const HomePageStyles = styled.div``;

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
