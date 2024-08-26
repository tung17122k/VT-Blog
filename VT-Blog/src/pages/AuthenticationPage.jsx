import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <div className="text-center">
          <NavLink to="/">
            <img srcSet="/logo.png 2x" alt="vt-blog" className="logo" />
          </NavLink>
        </div>
        <h1 className="heading">VT Blogging</h1>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
