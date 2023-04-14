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

const MainResetPassword = () => {
  const [searchParam] = useSearchParams();
  const email_ = searchParam.get("email");

  const [inputs, setInputs] = useState({
    email: email_,
    password: "",
    password1: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };
  const navigate = useNavigate();
  const changePassword = async (e) => {
    e.preventDefault();
    if (inputs.password.length === 0) {
      toast.error("Password is required is required!");
    } else if (inputs.password !== inputs.password1) {
      toast.error("Passwords do not match!");
    } else {
      const res = await makeRequest.post("/auth/changePassword", inputs);

      if (res.status === 200) {
        toast.success("Password Changed Successfully!");
        await sleep(3000);
        navigate("/");
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
                      Admin | New Password
                    </h3>
                    <p className="mb-0">Enter New Password</p>
                  </div>
                  <div className="card-body">
                    <form role="form">
                      <label>New Password</label>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="New Password"
                          aria-label="Email"
                          aria-describedby="email-addon"
                          name="password"
                          onChange={handleChange}
                          value={inputs.password}
                          autocomplete="off"
                        />
                      </div>
                      <label>Confirm Password</label>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          aria-label="Password"
                          aria-describedby="password-addon"
                          name="password1"
                          onChange={handleChange}
                          value={inputs.password1}
                          autocomplete="off"
                        />
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          className="btn bg-gradient-info w-100 mt-4 mb-0"
                          onClick={changePassword}
                        >
                          Save
                        </button>
                      </div>
                    </form>
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

export default MainResetPassword;
