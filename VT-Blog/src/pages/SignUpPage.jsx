import React, { useEffect, useState } from "react";
import Label from "@component/label/Label";
import { useForm } from "react-hook-form";
import Input from "@component/input/Input";
import Field from "@component/field/Field";
import Button from "../component/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { collection, setDoc, doc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "../component/input/InputPasswordToggle";
import slugify from "slugify";

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
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const handleSignUp = async (values) => {
    console.log(values);

    if (!isValid) return;

    //createUserWithEmailAndPassword

    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, { displayName: values.fullname });
    const colRef = collection(db, "users");

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
    });

    // await addDoc(colRef, {
    //   fullname: values.fullname,
    //   email: values.email,
    //   password: values.password,
    // });
    toast.success("Create user successfully", { pauseOnHover: false });
    navigate("/");
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 3000);
    // });
  };
  // console.log(errors);

  useEffect(() => {
    // const arrErrors = errors;
    toast.error(errors?.fullname?.message, { pauseOnHover: false });
    toast.error(errors?.email?.message, { pauseOnHover: false });
    toast.error(errors?.password?.message, { pauseOnHover: false });
    // console.log("🚀 ~ useEffect ~ arrErrors:", arrErrors);
  }, [errors]);

  useEffect(() => {
    document.title = "Register Page";
  }, []);
  return (
    <AuthenticationPage>
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
            <p className="text-red-500">{errors.fullname.message}</p>
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
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
          {errors?.password?.message && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </Field>
        <div className="mb-[20px]">
          You already have an account?
          <NavLink
            to={"/sign-in"}
            className="inline-block ml-1 font-medium underline text-violet-700"
          >
            Login
          </NavLink>
        </div>
        <Button
          type="submit"
          style={{ maxWidth: "300px", margin: "0 auto", width: "100%" }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
