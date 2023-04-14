import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { makeRequest } from "../../axios";

const AddUsers = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    user: "",
    password: "",
    userAge: "none",
    registeredAs: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (inputs.email.length === 0) {
        toast.error("Email Field cannot be empty!");
      } else if (inputs.username.length === 0) {
        toast.error("Username Is requires!");
      } else if (inputs.user.length === 0) {
        toast.error("User Is requires!");
      } else if (inputs.userAge.length === 0) {
        toast.error("User Age Is requires!");
      } else {
        try {
          const res = await makeRequest.post("/users/addUser", inputs);
          console.log(res);
          if (res.status === 200) {
            toast.success("Registered Successfully!");

            inputs.email = "";
            inputs.username = "";
            setInputs(inputs);
          }
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.sqlMessage);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-4">
      <div
        className="modal fade"
        id="modal-form"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modal-form"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="card card-plain">
                <div className="card-header pb-0 text-left">
                  <h3 className="font-weight-bolder text-info text-gradient">
                    Add Users
                  </h3>
                </div>
                <div className="card-body">
                  <form role="form text-left">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">
                        User Type
                      </label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        name="user"
                        onChange={handleChange}
                        value={inputs.user}
                      >
                        <option value="">--Please choose an option--</option>
                        <option value={"customer"}>Customer</option>
                        <option value={"trainer"}>Trainer</option>
                        <option value={"admin"}>Admin</option>
                      </select>
                    </div>
                    <div className="form-group">
                      {inputs.user === "customer" && (
                        <div>
                          <label htmlFor="userAge">User age:</label>
                          <select
                            className="form-control"
                            id="userAge"
                            name="userAge"
                            value={inputs.userAge}
                            onChange={handleChange}
                          >
                            <option value="">
                              --Please choose an option--
                            </option>
                            <option value="adult">Adult</option>
                            <option value="child">Child</option>
                          </select>
                        </div>
                      )}
                    </div>

                    <label>Email</label>
                    <div className="input-group mb-3">
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
                    <label>Username</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Password"
                        aria-describedby="password-addon"
                        name="username"
                        onChange={handleChange}
                        value={inputs.username}
                      />
                    </div>
                    {inputs.user == "customer" && (
                      <>
                        <label>Register As :</label>
                        <div className="input-group mb-3">
                          <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            name="registeredAs"
                            onChange={handleChange}
                            value={inputs.registeredAs}
                          >
                            <option value="">
                              --Please choose an option--
                            </option>
                            <option value={"individual"}>Individual</option>
                            <option value={"group"}>Group</option>
                            <option value={"none"}>Change Later</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0"
                        onClick={handleClick}
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddUsers;
