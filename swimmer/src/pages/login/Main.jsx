import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Main = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    fullNames: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };
  const { login } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputs.username.length === 0) {
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
        navigate("/schedules");
      } else if (res.response.status == 404) {
        toast.error(res.response.data);
      } else {
        toast.error(res.response.data);
      }
    }
  };

  const read = async (event) => {
    event.preventDefault();

    const res = await axios
      .post("http://localhost:5000/api/auth/saveAsRead", inputs)
      .then((response) => {
        console.log(response);
        toast.success("Saved!");
      })
      .catch((error) => console.log(error));
  };
  return (
    <main className="main-content  mt-0">
      <section>
        <div className="page-header min-vh-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-6">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">
                      PSAK | Welcome
                    </h3>
                    <p className="mb-0">
                      Enter your username and password to sign in
                    </p>
                  </div>
                  <div className="card-body">
                    <form role="form">
                      <label>Username</label>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="username"
                          aria-label="Email"
                          aria-describedby="email-addon"
                          name="username"
                          onChange={handleChange}
                          value={inputs.username}
                          autocomplete="off"
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
                        <a href="forgot-password">Forgot Password</a>
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
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-4 text-sm mx-auto">
                      Don't have an account?{" "}
                      <a
                        href="register"
                        className="text-info text-gradient font-weight-bold"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
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
