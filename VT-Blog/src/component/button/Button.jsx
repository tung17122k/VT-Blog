/* eslint-disable no-extra-boolean-cast */
import React from "react";
import styled from "styled-components";
import { Loading } from "../loading";

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
  width: 100%;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Button = ({
  type = "button",
  onClick = () => {},
  isLoading,
  children,
  ...props
}) => {
  const child = !!isLoading ? <Loading></Loading> : children; // convert boolean
  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;
