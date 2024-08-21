import React from "react";
import styled from "styled-components";
import Label from "@component/label/Label";
import { useForm } from "react-hook-form";
import Input from "../component/input/Input";
const SignUpPageStyle = styled.div`
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
  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }
  /* .label {
    color: ${(props) => props.theme.grayDark};
    font-weight: 600;
    cursor: pointer;
  } */
  /* .input {
    width: 100%;
    padding: 20px;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    outline: none;
  }
  .input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  .input::-webkit-input-placeholder {
    color: #84878b;
  }
  .input::-moz-input-placeholder {
    color: #84878b;
  } */
`;

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({});
  const handleSignUp = (values) => {
    console.log(values);
  };
  return (
    <SignUpPageStyle>
      <div className="container">
        <img srcSet="/logo.png 2x" alt="vt-blog" className="logo" />
        <h1 className="heading">VT Blogging</h1>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="field">
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              // id="fullname"
              type="text"
              name="fullname"
              // className="input"
              placeholder="Enter your fullname"
              control={control}
            />
          </div>
        </form>
      </div>
    </SignUpPageStyle>
  );
};

export default SignUpPage;
