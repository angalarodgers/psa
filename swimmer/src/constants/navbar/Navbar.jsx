import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const res = await makeRequest.post("/auth/logout");
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify({}));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      id="navbarBlur"
      navbar-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <h6 className="font-weight-bolder mb-0">Customer</h6>
        </nav>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <a
                href="profile"
                className="nav-link text-body font-weight-bold px-0"
              >
                <i className="fa fa-user me-sm-1" />
                <span className="d-sm-inline d-none">
                  {currentUser.username}
                </span>
              </a>
            </li>

            <li className="nav-item px-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-body p-0">
                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer" />
              </a>
            </li>
            <li className="nav-item dropdown  pe-2 d-flex align-items-center">
              <a
                href="#"
                className="nav-link text-body p-0"
                id="iconNavbarSidenav dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line" />
                  <i className="sidenav-toggler-line" />
                  <i className="sidenav-toggler-line" />
                </div>
              </a>
              <ul
                className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                aria-labelledby="dropdownMenuButton"
              >
                <li className="mb-2">
                  <a
                    className="dropdown-item border-radius-md"
                    href="/dashboard"
                  >
                    <div className="d-flex py-1">
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">
                            {" "}
                            <i className="fa fa-home"></i> &nbsp; Overview
                          </span>
                        </h6>
                      </div>
                    </div>
                  </a>
                </li>

                <li className="mb-2">
                  <a
                    className="dropdown-item border-radius-md"
                    href="/calendar"
                  >
                    <div className="d-flex py-1">
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">
                            {" "}
                            <i className="fa fa-calendar"></i> &nbsp; Calendar
                          </span>
                        </h6>
                      </div>
                    </div>
                  </a>
                </li>

                <li className="mb-2">
                  <a
                    className="dropdown-item border-radius-md"
                    href="/schedules"
                  >
                    <div className="d-flex py-1">
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">
                            {" "}
                            <i className="fa fa-list"></i> &nbsp; Schedules
                          </span>
                        </h6>
                      </div>
                    </div>
                  </a>
                </li>

                <li className="mb-2">
                  <a
                    className="dropdown-item border-radius-md"
                    href="/payments"
                  >
                    <div className="d-flex py-1">
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">
                            {" "}
                            <i className="fa fa-money"></i> &nbsp; Payments
                          </span>
                        </h6>
                      </div>
                    </div>
                  </a>
                </li>

                <li className="mb-2">
                  <a
                    className="dropdown-item border-radius-md"
                    href=""
                    onClick={handleLogOut}
                  >
                    <div className="d-flex py-1">
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <hr className="horizontal dark mt-0" />
                          <span className="font-weight-bold">
                            {" "}
                            <i className="fa fa-sign-out"></i> &nbsp; Sign-out
                          </span>
                        </h6>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
