import React, { useState, useContext } from "react";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import toast, { Toaster } from "react-hot-toast";
import { makeRequest } from "../../axios";
import Terms from "../register/Terms";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MainForgotPassword = () => {
  const [inputs, setInputs] = useState({
    email: "",
    hasRead: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/otp");
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const { login } = useContext(AuthContext);
  const sendOtp = async (e) => {
    e.preventDefault();
    if (inputs.email.length === 0) {
      toast.error("Email is required!");
    } else {
      const res = await makeRequest.post("/auth/sendOtp", inputs);

      if (res.status === 200) {
        toast.success("OTP sent Successfully!");
        await sleep(3000);

        navigate({
          pathname: "/otp",
          search: createSearchParams({
            email: inputs.email,
          }).toString(),
        });
      } else if (res.response.status == 404) {
        toast.error(res.response.data);
      } else {
        toast.error(res.response.data);
      }
    }
  };
  const handleShow = () => {
    setShowModal(true);
    console.log(showModal);
  };
  return (
    <main className="main-content  mt-0">
      <section>
        <div className="page-header min-vh-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">
                      Admin | <small>Password Reset</small>
                    </h3>
                    <p className="mb-0">
                      Enter your email to reset your password
                    </p>
                  </div>
                  <div className="card-body">
                    <form role="form">
                      <label>Email</label>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          aria-label="Email"
                          aria-describedby="email-addon"
                          name="email"
                          onChange={handleChange}
                          value={inputs.email}
                          onClick={handleShow}
                        />
                      </div>
                      {showModal && <Terms />}
                      <div className="form-check form-check-info text-left">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue
                          id="flexCheckDefault"
                          name="hasRead"
                          onChange={(e) => {
                            setInputs((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.checked,
                            }));
                            console.log(inputs);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          I agree the{" "}
                          <a
                            href="/psak-terms-of-service"
                            className="text-dark font-weight-bolder"
                            target="_blank"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          className="btn bg-gradient-info w-100 mt-4 mb-0"
                          onClick={sendOtp}
                        >
                          Send OTP
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-4 text-sm mx-auto">
                      Don't have an account?{" "}
                      <a
                        href="/register"
                        className="text-info text-gradient font-weight-bold"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                  <div
                    className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                    style={{
                      backgroundImage: 'url("../assets/img/swim.jpg")',
                      backgroundColor: "#21d4fd",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default MainForgotPassword;
