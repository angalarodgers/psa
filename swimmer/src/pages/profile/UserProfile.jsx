import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import SwimmingQuote from "./SwimmingQuote";

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <div className="container-fluid">
        <div className="card card-body blur shadow-blur mx-4 overflow-hidden">
          <div className="row gx-4">
            <div className="col-auto">
              <div className="avatar avatar-xl position-relative">
                <img
                  src={`assets/images/${currentUser.img}`}
                  alt="profile_image"
                  className="w-100 border-radius-lg shadow-sm"
                />
              </div>
            </div>

            <div className="col-auto my-auto">
              <div className="h-100">
                <h5 className="mb-1">{currentUser.username}</h5>
                <p className="mb-0 font-weight-bold text-sm">
                  {" "}
                  /{currentUser.userType} /
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
              <div className="nav-wrapper position-relative end-0">
                <ul
                  className="nav nav-pills nav-fill p-1 bg-transparent"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link mb-0 px-0 py-1 "
                      data-bs-toggle="tab"
                      href="javascript:;"
                      role="tab"
                      aria-selected="false"
                    >
                      <svg
                        className="text-dark"
                        width="16px"
                        height="16px"
                        viewBox="0 0 40 44"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <title>document</title>
                        <g
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            transform="translate(-1870.000000, -591.000000)"
                            fill="#FFFFFF"
                            fillRule="nonzero"
                          >
                            <g transform="translate(1716.000000, 291.000000)">
                              <g transform="translate(154.000000, 300.000000)">
                                <path
                                  className="color-background"
                                  d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                                  opacity="0.603585379"
                                />
                                <path
                                  className="color-background"
                                  d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span className="ms-1">Messages</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12 col-xl-12">
            <div className="card h-100">
              <div className="card-header pb-0 p-3">
                <div className="row">
                  <div className="col-md-8 d-flex align-items-center">
                    <h6 className="mb-0">Profile Information</h6>
                  </div>
                  <div className="col-md-4 text-end">
                    <a
                      href="./edit-profile"
                      className="btn btn-outline-secondary"
                    >
                      <i
                        className="fas fa-user-edit text-secondary text-sm"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit Profile"
                      />{" "}
                      <small className="ms-1">Edit Profile</small>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                <p className="text-sm">
                  <SwimmingQuote />
                </p>
                <hr className="horizontal gray-light my-4" />
                <ul className="list-group">
                  <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                    <strong className="text-dark">Full Name:</strong> &nbsp;
                    {currentUser.username}
                  </li>
                  <li className="list-group-item border-0 ps-0 text-sm">
                    <strong className="text-dark">User Type:</strong> &nbsp;
                    {currentUser.userType}
                  </li>
                  <li className="list-group-item border-0 ps-0 text-sm">
                    <strong className="text-dark">Email:</strong> &nbsp;
                    {currentUser.email}
                  </li>
                  <li className="list-group-item border-0 ps-0 text-sm">
                    <strong className="text-dark">Admin Since:</strong> &nbsp;
                    {currentUser.createdAt}
                  </li>
                  <li className="list-group-item border-0 ps-0 pb-0">
                    <strong className="text-dark text-sm">Social:</strong>{" "}
                    &nbsp;
                    <a
                      className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0"
                      href="javascript:;"
                    >
                      <i className="fab fa-facebook fa-lg" />
                    </a>
                    <a
                      className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0"
                      href="javascript:;"
                    >
                      <i className="fab fa-twitter fa-lg" />
                    </a>
                    <a
                      className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0"
                      href="javascript:;"
                    >
                      <i className="fab fa-instagram fa-lg" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
