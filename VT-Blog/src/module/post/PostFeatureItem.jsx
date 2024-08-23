import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";

const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 272px;
  .post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  .post-overlay {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.6);
    mix-blend-mode: multiply;
    opacity: 0.6;
  }
  .post-content {
    position: absolute;
    inset: 0;
    z-index: 10;
    padding: 20px;
    color: white;
  }
  .post-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  /* .post-category {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 8px;
    color: #6b6b6b;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: #f3f3f3;
    max-width: 100px;
  } */
  .post-info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    margin-left: auto;
  }
  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 100rem;
    background-color: currentColor;
  }
  .post-title {
    font-weight: bold;
    line-height: 1.5;
    display: block;
    font-size: 22px;
    color: white;
  }
`;

const PostFeatureItem = () => {
  return (
    <PostFeatureItemStyles>
      <img
        src="https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="post-image"
      />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory>Kiến thức</PostCategory>
          <div className="post-info">
            <span className="post-time">Aug 24</span>
            <span className="post-dot"></span>
            <span className="post-author">Kun Nguyen</span>
          </div>
        </div>
        <div className="post-title">Setup khu vực làm việc </div>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
