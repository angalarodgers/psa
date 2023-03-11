import React from "react";
import LoginNavbar from "../../constants/Login-navbar/LoginNavbar";
import LoginFooter from "../../constants/LoginFooter.jsx/LoginFooter";
import Container from "./Container";
import Main from "./Main";

const Login = () => {
  return (
    <>
      <LoginNavbar />
      <Main />
      <LoginFooter />
    </>
  );
};

export default Login;
