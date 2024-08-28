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
  white-space: nowrap;

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
    @media screen and (max-width: 1023.98px) {
    font-size: 10px;
  }
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
