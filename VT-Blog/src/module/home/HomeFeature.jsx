import React from "react";
import styled from "styled-components";
import Heading from "../../component/layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  return (
    <HomeFeatureStyles>
      <div className="container">
        <Heading>Bài Viết Nổi Bật</Heading>
        <div className="grid-layout">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
