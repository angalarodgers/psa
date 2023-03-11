import React from "react";
import LoginNavbar from "../../constants/Login-navbar/LoginNavbar";
import LoginFooter from "../../constants/LoginFooter.jsx/LoginFooter";
import MainResetPassword from "./MainResetPassword";

const ResetPassword = () => {
  return (
    <>
      <LoginNavbar />
      <MainResetPassword />
      <LoginFooter />
    </>
  );
};

export default ResetPassword;
