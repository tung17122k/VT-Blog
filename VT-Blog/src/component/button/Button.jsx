/* eslint-disable no-extra-boolean-cast */
import React from "react";
import styled, { css } from "styled-components";
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

  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
    `};

  ${(props) =>
    props.kind === "primary" &&
    css`
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.secondary},
        ${(props) => props.theme.primary}
      );
      color: white;
    `};

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
  kind = "primary",
  ...props
}) => {
  const { to } = props;
  const child = !!isLoading ? <Loading></Loading> : children; // convert boolean
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} className="inline-block">
        <ButtonStyles type={type} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
