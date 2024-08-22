/* eslint-disable no-extra-boolean-cast */
import React from "react";
import styled from "styled-components";
import { Loading } from "../loading";
import PropTypes, { string } from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 20px;
  line-height: 1;
  height: ${(props) => props.height || "66px"};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.secondary},
    ${(props) => props.theme.primary}
  );
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

/**
 *@param {*} onClick Handler onClick
 *@requires
 *@param {string} type Type of "button" || "submit"
 */
const Button = ({
  type = "button",
  onClick = () => {},
  isLoading,
  children,
  ...props
}) => {
  const { to } = props;
  const child = !!isLoading ? <Loading></Loading> : children; // convert boolean
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyles type={type} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
