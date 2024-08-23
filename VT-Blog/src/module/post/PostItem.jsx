import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";

const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post-image {
    height: 202px;
    width: 100%;
    display: block;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
  }
  .post-category {
    /* display: inline-block;
    padding: 8px;
    border-radius: 8px;
    color: #6b6b6b;
    font-size: 14px;
    font-weight: 600;
    background-color: #f3edff; */
    margin-bottom: 10px;
  }
  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* width: 100%; */
    gap: 12px;
    font-size: 14px;
    font-weight: 600;
    color: #6b6b6b;
    margin-top: auto;
  }
  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 100rem;
  }
  .post-title {
    font-weight: bold;
    line-height: 1.5;
    display: block;
    font-size: 18px;
    margin-bottom: 8px;
  }
`;
const PostItem = () => {
  return (
    <PostItemStyles>
      <div className="post-image">
        <img
          src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <PostCategory className="post-category">Kiến thức</PostCategory>
      <h3 className="post-title">Setup khu vực làm việc</h3>
      <div className="post-info">
        <span className="post-date">24 Aug</span>
        <span className="post-dot"></span>
        <span className="post-author">Tung Nguyen</span>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
