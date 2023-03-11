import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import toast, { Toaster } from "react-hot-toast";
import { makeRequest } from "../../axios";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MainOTP = () => {
  const [searchParam] = useSearchParams();
  const email_ = searchParam.get("email");
  const [inputs, setInputs] = useState({
    otp: "",
    email: email_,
  });

  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/reset-password");
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const ConfirmOTP = async (e) => {
    e.preventDefault();
    if (inputs.otp.length === 0) {
      toast.error("OTP is required!");
    } else if (inputs.otp.length > 6) {
      toast.error("OTP cannot be greater than 6 digits!");
    } else {
      const res = await makeRequest.post("/auth/confirmOTP", inputs);

      if (res.status === 200) {
        toast.success("Correct!");
        await sleep(3000);
        navigate({
          pathname: "/reset-password",
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
                      Admin | <small>OTP</small>
                    </h3>
                    <p className="mb-0">Enter OTP sent to your email</p>
                  </div>
                  <div className="card-body">
                    <form role="form">
                      <label>Enter 6-digit OTP</label>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="0 0 0 0 0 0"
                          aria-label="Email"
                          aria-describedby="email-addon"
                          name="otp"
                          onChange={handleChange}
                          value={inputs.otp}
                        />
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          className="btn bg-gradient-info w-100 mt-4 mb-0"
                          onClick={ConfirmOTP}
                        >
                          Submit
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

export default MainOTP;
