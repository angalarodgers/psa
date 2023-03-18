import React from "react";
import LoginNavbar from "../../constants/Login-navbar/LoginNavbar";
import LoginFooter from "../../constants/LoginFooter.jsx/LoginFooter";
import MainOTP from "./MainOTP";

const Otp = () => {
  return (
    <>
      <LoginNavbar />
      <MainOTP />
      <LoginFooter />
    </>
  );
};

export default Otp;
