import React from "react";

const Container = () => {
  return (
    <div className="container position-sticky z-index-sticky top-0">
      <div className="row">
        <div className="col-12">
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
            <div className="container-fluid pe-0">
              <a
                className="navbar-brand font-weight-bolder ms-lg-0 ms-3 "
                href="../pages/dashboard.html"
              >
                Soft UI Dashboard
              </a>
              <button
                className="navbar-toggler shadow-none ms-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navigation"
                aria-controls="navigation"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon mt-2">
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </span>
              </button>
              <div className="collapse navbar-collapse" id="navigation">
                <ul className="navbar-nav mx-auto ms-xl-auto me-xl-7">
                  <li className="nav-item">
                    <a
                      className="nav-link d-flex align-items-center me-2 active"
                      aria-current="page"
                      href="../pages/dashboard.html"
                    >
                      <i className="fa fa-chart-pie opacity-6 text-dark me-1" />
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link me-2" href="../pages/profile.html">
                      <i className="fa fa-user opacity-6 text-dark me-1" />
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link me-2" href="../pages/sign-up.html">
                      <i className="fas fa-user-circle opacity-6 text-dark me-1" />
                      Sign Up
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link me-2" href="../pages/sign-in.html">
                      <i className="fas fa-key opacity-6 text-dark me-1" />
                      Sign In
                    </a>
                  </li>
                </ul>
                <li className="nav-item d-flex align-items-center">
                  <a
                    className="btn btn-round btn-sm mb-0 btn-outline-primary me-2"
                    target="_blank"
                    href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard"
                  >
                    Online Builder
                  </a>
                </li>
                <ul className="navbar-nav d-lg-block d-none">
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com/product/soft-ui-dashboard"
                      className="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark"
                    >
                      Free download
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* End Navbar */}
        </div>
      </div>
    </div>
  );
};

export default Container;
