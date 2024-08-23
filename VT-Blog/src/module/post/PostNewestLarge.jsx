import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";

const PostNewestLargeStyles = styled.div`
  .post-image {
    display: block;
    margin-bottom: 25px;
    height: 433px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
  }
  .post-category {
    margin-bottom: 10px;
  }
  .post-info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 600;
    margin-left: auto;
    color: #6b6b6b;
  }
  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 100rem;
    background-color: #6b6b6b;
  }
  .post-title {
    /* font-weight: bold;
    line-height: 1.5;
    display: block;
    font-size: 22px; */
    margin-bottom: 10px;
  }
`;

const PostNewestLarge = () => {
  return (
    <PostNewestLargeStyles>
      <div className="post-image">
        <img
          src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <PostCategory className="post-category">Kiến thức</PostCategory>
      <PostTitle className="post-title" size="medium">
        Setup khu vực làm việc
      </PostTitle>
      <div className="post-info">
        <span className="post-date">24 Aug</span>
        <span className="post-dot"></span>
        <span className="post-author">Tung Nguyen</span>
      </div>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
