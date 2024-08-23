import React from "react";
import styled from "styled-components";
import Heading from "../../component/layout/Heading";
import PostNewestLarge from "../post/PostNewestLarge";
import PostNewestItems from "../post/PostNewestItems";
import PostItem from "../post/PostItem";

const HomeNewestStyles = styled.div`
  margin-top: 50px;
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .side-bar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 12px;
  }
`;

const HomeNewest = () => {
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge></PostNewestLarge>
          <div className="side-bar">
            <PostNewestItems></PostNewestItems>
            <PostNewestItems></PostNewestItems>
            <PostNewestItems></PostNewestItems>
          </div>
        </div>
        <div className="grid-layout grid-layout--primary">
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
