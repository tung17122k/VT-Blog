import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import styled from "styled-components";
// import HeaderMenu from "../component/layout/HeaderMenu";
import HomeBanner from "../module/home/HomeBanner";
import Layout from "../component/layout/Layout";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewest from "../module/home/HomeNewest";

const HomePageStyles = styled.div``;

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
