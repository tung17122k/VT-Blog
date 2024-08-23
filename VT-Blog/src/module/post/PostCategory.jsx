import React from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;
  background-color: #f3f3f3;

  a {
    display: block;
  }
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
const PostCategory = ({
  type = "primary",
  children,
  className = "",
  to = "/",
}) => {
  return (
    <PostCategoryStyles type={type} className={className}>
      <NavLink to={to}>{children}</NavLink>
    </PostCategoryStyles>
  );
};

export default PostCategory;
