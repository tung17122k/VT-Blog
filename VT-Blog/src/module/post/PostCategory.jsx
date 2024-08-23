import React from "react";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  background-color: #f3f3f3;
  /* max-width: 100px; */
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: #f3f3f3;
    `}
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `}
`;
const PostCategory = ({ type = "primary", children, className = "" }) => {
  return (
    <PostCategoryStyles type={type} className={className}>
      {children}
    </PostCategoryStyles>
  );
};

export default PostCategory;
