import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import Field from "../component/field/Field";
import Label from "../component/label/Label";
import Input from "../component/input/Input";
import IconEyeClose from "../component/icon/IconEyeClose";
import IconEye from "../component/icon/IconEye";
import Button from "../component/button/Button";
import * as yup from "yup";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/firebaseConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 character or greater")
      .required("Password is required"),
  })
  .required();

const SignInPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { userInfo } = useAuth();

  //   console.log("🚀 ~ SignInPage ~ userInfo:", userInfo);

  const navigate = useNavigate();
  useEffect(() => {
    // redirect
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    else navigate("/sign-in");
  }, []);
  const handleSignin = async (values) => {
    console.log(values);
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  useEffect(() => {
    // const arrErrors = errors;
    toast.error(errors?.fullname?.message, { pauseOnHover: false });
    toast.error(errors?.email?.message, { pauseOnHover: false });
    toast.error(errors?.password?.message, { pauseOnHover: false });
    // console.log("🚀 ~ useEffect ~ arrErrors:", arrErrors);
  }, [errors]);
  return (
    <div>
      <AuthenticationPage>
        <form onSubmit={handleSubmit(handleSignin)}>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your Email"
              control={control}
            ></Input>
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
          </Field>
          <div className="mb-[20px]">
            you do not have an account yet?
            <NavLink
              to={"/sign-up"}
              className="inline-block ml-1 font-medium underline text-violet-700"
            >
              Register now
            </NavLink>
          </div>
          <Button
            type="submit"
            style={{ maxWidth: "300px", margin: "0 auto", width: "100%" }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </form>
      </AuthenticationPage>
    </div>
  );
};

export default SignInPage;
