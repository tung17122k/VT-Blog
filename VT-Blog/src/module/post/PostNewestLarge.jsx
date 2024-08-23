import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";

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
  .post-content {
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
      <PostMeta></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
