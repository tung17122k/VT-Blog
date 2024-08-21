import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Label from "@component/label/Label";
import { useForm } from "react-hook-form";
import Input from "@component/input/Input";
import IconEye from "@component/icon/IconEye";
import Field from "@component/field/Field";
import { IconEyeClose } from "@component/icon";
import Button from "@component/button/Button";
import Loading from "@component/loading/Loading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  .errors {
    color: red;
  }
  /* .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  } */
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
const schema = yup
  .object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 character or greater")
      .required("Password is required"),
  })
  .required();
const SignUpPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = (values) => {
    console.log(values);

    if (!isValid) return;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  };
  // console.log(errors);

  useEffect(() => {
    // const arrErrors = errors;
    toast.error(errors?.fullname?.message, { pauseOnHover: false });
    toast.error(errors?.email?.message, { pauseOnHover: false });
    toast.error(errors?.password?.message, { pauseOnHover: false });
    // console.log("🚀 ~ useEffect ~ arrErrors:", arrErrors);
  }, [errors]);

  return (
    <SignUpPageStyle>
      <div className="container">
        <img srcSet="/logo.png 2x" alt="vt-blog" className="logo" />
        <h1 className="heading">VT Blogging</h1>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              // id="fullname"
              type="text"
              name="fullname"
              // className="input"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
            {errors?.fullname?.message && (
              <p className="errors">{errors.fullname.message}</p>
            )}
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your Email"
              control={control}
            ></Input>
            {errors?.email?.message && (
              <p className="errors">{errors.email.message}</p>
            )}
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type={togglePassword === false ? "password" : "text"}
              name="password"
              placeholder="Enter your password"
              control={control}
            >
              {!togglePassword ? (
                <IconEye
                  className="icon-eye"
                  onClick={() => {
                    setTogglePassword(!togglePassword);
                  }}
                ></IconEye>
              ) : (
                <IconEyeClose
                  className="icon-eye"
                  onClick={() => {
                    setTogglePassword(!togglePassword);
                  }}
                ></IconEyeClose>
              )}
            </Input>
            {errors?.password?.message && (
              <p className="errors">{errors.password.message}</p>
            )}
          </Field>
          <Button
            type="submit"
            style={{ maxWidth: 300, margin: "0 auto" }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </SignUpPageStyle>
  );
};

export default SignUpPage;
