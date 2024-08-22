import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: block;
    margin-bottom: 40px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 40px;
  }
`;
const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to="/" className="logo">
        <img srcSet="/logo.png 2x" alt="VT blog" />
      </NavLink>
      <h1 className="heading">Oops! Page Not Found</h1>
      <NavLink
        to="/"
        className="inline-block px-4 py-2 text-white rounded bg-primary"
      >
        Back to Home
      </NavLink>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
