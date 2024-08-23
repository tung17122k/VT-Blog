import React from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
const PostTitleStyles = styled.h3`
  font-weight: bold;
  line-height: 1.5;
  a {
    display: block;
  }

  color: inherit;
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      font-size: 22px;
    `}
`;
const PostTitle = ({ children, className, size = "normal", to = "/" }) => {
  return (
    <PostTitleStyles size={size} className={className}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyles>
  );
};

export default PostTitle;
