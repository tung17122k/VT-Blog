import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
import IconEye from "../icon/IconEye";

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    outline: none;
  }
  input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
  .icon-eye {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({
  name,

  hasIcon = false,
  type = "text",
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <InputStyles hasIcon={hasIcon}>
      <input type={type} {...field} {...props} id={name} />
      {hasIcon ? <IconEye className="icon-eye"></IconEye> : null}
    </InputStyles>
  );
};

export default Input;
