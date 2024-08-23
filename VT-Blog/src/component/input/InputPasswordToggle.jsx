import React, { Fragment, useState } from "react";
import Input from "../input/Input";
import IconEyeClose from "../icon/IconEyeClose";
import IconEye from "../icon/IconEye";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default InputPasswordToggle;
