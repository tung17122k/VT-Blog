import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const PostImageStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;

const PostImage = ({ className, url, alt, to = null }) => {
  if (to)
    return (
      <NavLink to={to}>
        <PostImageStyles
          className={className}
          style={{
            display: "block",
          }}
        >
          <img src={url} alt={alt} loading="lazy" />
        </PostImageStyles>
      </NavLink>
    );
  return (
    <PostImageStyles className={className}>
      <img src={url} alt={alt} loading="lazy" />
    </PostImageStyles>
  );
};

export default PostImage;
