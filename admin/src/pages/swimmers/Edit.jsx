import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { makeRequest } from "../../axios";

import { useQuery } from "react-query";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

const getUsers = async () => {
  const response = await makeRequest.get("/users/getCustomers");
  return response.data;
};

const Edit = () => {
  const [searchParam] = useSearchParams();
  const swimmerId = searchParam.get("swimmerId");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [inputs, setInputs] = useState({
    userId: swimmerId,
    username: "",
    email: "",
    userAge: "",
    registeredAs: "",
  });
  const { data: users, isLoading: messagesLoading } = useQuery(
    "getUsers",
    getUsers,
    {
      refetchInterval: 1000,
    }
  );

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setIsDirty(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
    setIsDirty(true);
  };

  const handleSave = () => {
    if (!isDirty) {
      alert("Please make changes before saving");
      return;
    }

    const updatedFields = Object.keys(editedUser).filter(
      (key) => editedUser[key] !== selectedUser[key]
    );

    if (updatedFields.length === 0) {
      alert("Please make changes before saving");
      return;
    }

    // Create a new object that excludes the createdAt property
    const updatedUser = Object.keys(editedUser)
      .filter((key) => key !== "createdAt")
      .reduce((obj, key) => {
        obj[key] = editedUser[key];
        return obj;
      }, {});

    makeRequest
      .post("/users/editUser", editedUser)
      .then(() => {
        console.log(editedUser);
        setSelectedUser(null);
        setEditedUser(null);
        setIsDirty(false);
        alert("User details saved successfully");
      })
      .catch((error) => {
        console.log(error);
        alert(`Error saving user details: ${error.message}`);
      });
  };

  const handleUserChange = (event) => {
    const selectedUsername = event.target.value;
    // Do something with the selected username, e.g. update state or perform an action
    const selectedUser = users
      ? users.find((user) => user.username === selectedUsername)
      : null;
    setSelectedUser(selectedUser);
    setEditedUser({ ...selectedUser });
    setIsDirty(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3" style={{ display: "none" }}>
          <div
            className="card p-2"
            style={{ height: "80vh", overflow: "scroll" }}
          >
            <h6>User Editor</h6>
            <ul>
              {users &&
                users.map((user) => (
                  <li key={user.id} onClick={() => handleSelectUser(user)}>
                    <button
                      className="btn btn-primary hover"
                      style={{ backgroundColor: "#63b3ed" }}
                    >
                      {user.username} / {user.email}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Select User</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={handleUserChange}
                >
                  <option value={""}>-- Select User--</option>
                  {users &&
                    users.map((user) => (
                      <option key={user.id} value={user.username}>
                        {user.username} /{"    "}
                        <small style={{ color: "pink", fontSize: "8px" }}>
                          {"(" + user.email + ")"}
                        </small>
                        <br />
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="card p-3 ">
            {selectedUser ? (
              <div>
                <h3>Edit User Details</h3>
                <form>
                  <div className="form-group">
                    <label>
                      Username:
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={editedUser.username}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      ID:
                      <input
                        type="text"
                        name="id"
                        className="form-control"
                        value={editedUser.id}
                        onChange={handleChange}
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Email:
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={editedUser.email}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Age Group:
                      <select
                        name="userAge"
                        id="userAge"
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value={editedUser.userAge}>
                          {editedUser.userAge}
                        </option>
                        <option value="">--Select Anothe Option--</option>
                        <option value="Child">Child</option>
                        <option value="Adult">Adult</option>
                      </select>
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Registered As:
                      <select
                        name="registeredAs"
                        id="registeredAs"
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value={editedUser.registeredAs}>
                          {editedUser.registeredAs}
                        </option>
                        <option value="">--Select Anothe Option--</option>
                        <option value="individual">Individual</option>
                        <option value="group">Group</option>
                      </select>
                    </label>
                  </div>
                </form>
                <button className="form-control" onClick={handleSave}>
                  Save
                </button>
              </div>
            ) : (
              <span> {"<-"} Select A user to edit</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
