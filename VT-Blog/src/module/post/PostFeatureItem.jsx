import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";

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

  .post-title {
    color: white;
  }
`;

const PostFeatureItem = () => {
  return (
    <PostFeatureItemStyles>
      <PostImage
        url="https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="post-image"
      ></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory>Kiến thức</PostCategory>
          <PostMeta></PostMeta>
        </div>
        <PostTitle className="post-title" size="medium">
          Setup khu vực làm việc
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
