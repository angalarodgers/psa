import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import toast, { Toaster } from "react-hot-toast";

const Main = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };
  const { login } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputs.email.length === 0) {
      toast.error("Email is required!", {
        icon: " 🙂 ",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else if (inputs.password.length === 0) {
      toast.error("Password is required!");
    } else {
      const res = await login(inputs);

      if (res.status === 200) {
        toast.success("Logged In Successfully!");
        navigate("/dashboard");
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
                      Trainer | Welcome
                    </h3>
                    <p className="mb-0">
                      Enter your email and password to sign in
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
                        />
                      </div>
                      <label>Password</label>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="password-addon"
                          name="password"
                          onChange={handleChange}
                          value={inputs.password}
                        />
                      </div>
                      <div className="form-check form-switch">
                        <a href="forgot-password">Reset Password</a>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn bg-gradient-info w-100 mt-4 mb-0"
                          onClick={handleLogin}
                        >
                          Sign in
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

export default Main;
