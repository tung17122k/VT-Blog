import React from "react";
import styled, { css } from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.gray6b};

  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 100rem;
    background-color: currentColor;
  }
  ${(props) =>
    props.color === "white" &&
    css`
      color: white;
    `};
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }
`;

const PostMeta = ({
  date = "Aug 24",
  author = "Tung Nguyen",
  className,
  color,
}) => {
  return (
    <PostMetaStyles className={className} color={color}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <span className="post-author">{author}</span>
    </PostMetaStyles>
  );
};

export default PostMeta;
