import React, { Children, Fragment } from "react";
import HeaderMenu from "./HeaderMenu";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <HeaderMenu></HeaderMenu>
      {children}
    </Fragment>
  );
};

export default Layout;
