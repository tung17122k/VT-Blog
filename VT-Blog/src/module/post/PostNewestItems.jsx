import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";

const PostNewestItemsStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
    margin-bottom: 0;
  }
  .post-image {
    display: block;
    flex-shrink: 0;
    width: 180px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
  }
  .post-category {
    margin-bottom: 8px;
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
    font-weight: bold;
    line-height: 1.5;
    display: block;
    font-size: 16px;
    margin-bottom: 8px;
  }
`;
const PostNewestItems = () => {
  return (
    <PostNewestItemsStyles>
      <div className="post-image">
        <img
          src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="post-content">
        <PostCategory className="post-category" type="secondary">
          Kiến thức
        </PostCategory>
        <h3 className="post-title">Setup khu vực làm việc</h3>
        <div className="post-info">
          <span className="post-date">24 Aug</span>
          <span className="post-dot"></span>
          <span className="post-author">Tung Nguyen</span>
        </div>
      </div>
    </PostNewestItemsStyles>
  );
};

export default PostNewestItems;
