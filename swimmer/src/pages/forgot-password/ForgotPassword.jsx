import React from "react";
import LoginNavbar from "../../constants/Login-navbar/LoginNavbar";
import LoginFooter from "../../constants/LoginFooter.jsx/LoginFooter";
import MainForgotPassword from "./MainForgotPassword";

const ForgotPassword = () => {
  return (
    <>
      <LoginNavbar />
      <MainForgotPassword />
      <LoginFooter />
    </>
  );
};

export default ForgotPassword;
