import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { makeRequest } from "../../axios";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Members from "./Members";

const addGroupMember = async (inputs) => {
  const response = await makeRequest.post("/users/addChild", inputs);
  return response.data;
};

const getChildren = async () => {
  const response = await makeRequest.get("/users/getCustomers");
  return response.data;
};

const getCustomers = async () => {
  const response = await makeRequest.get("/users/getCustomers");
  return response.data;
};

const AddGroupMembers = () => {
  const [searchParam] = useSearchParams();
  const swimmerId = searchParam.get("swimmerId");

  if (swimmerId === undefined) {
    window.location.href = "/swimmers";
  }

  const [users, setNewUsers] = useState([]);
  const [childrens, setChildren] = useState([]);
  const [shouldFetchChildren, setShouldFetchChildren] = useState(false);
  const [isMutationDone, setIsMutationDone] = useState(false);
  const [inputs, setInputs] = useState({
    user_id: "",
    username: "",
    userAge: "Child",
    email: "",
    password: "password",
    user: "customer",
  });

  const { isLoading, error, data } = useQuery("myQueryKey", () =>
    makeRequest.get("/users/getCustomers").then((res) => {
      setNewUsers(res.data);
    })
  );

  const { data: children, isLoading: childrenLoading } = useQuery(
    "getChilren",
    getChildren,
    {
      refetchInterval: 1000,
    }
  );

  useEffect(() => {
    if (!shouldFetchChildren) {
      setShouldFetchChildren(true);
    }
  }, []);

  useEffect(() => {
    if (shouldFetchChildren) {
      setShouldFetchChildren(false);
    }
  }, [shouldFetchChildren]);

  const { mutateAsync: saveGroupMemberAsync, isLoading: isTrainerLoading } =
    useMutation(addGroupMember, {
      onSuccess: () => {
        toast.success("Child saved successfully!");
      },
      onError: () => {
        toast.error("Error");
      },
    });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredUsers = users.find((user) => user.id == swimmerId);

  const filteredArray = children
    ? children
        .filter((obj) => obj.email === filteredUsers.email)
        .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    : [];

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (filteredUsers.email.length === 0) {
        toast.error("An error occurred while reading email.");
      } else if (inputs.username.length === 0) {
        toast.error("Username can not be empty.");
      } else {
        inputs.email = filteredUsers.email;
        inputs.user_id = filteredUsers.id;
        await saveGroupMemberAsync(inputs);
        setShouldFetchChildren(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while saving data...");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h6>Add Group Members</h6>
              <p>
                <span>
                  {" "}
                  User Id :<strong> {filteredUsers.id}</strong>
                </span>
                &nbsp;|
                <span>
                  {" "}
                  Email :<strong> {filteredUsers.email}</strong>
                </span>
                &nbsp;|
                <span>
                  {" "}
                  Username :<strong> {filteredUsers.username}</strong>
                </span>
                &nbsp;|
                <span>
                  {" "}
                  Members :<strong> {filteredUsers.members}</strong>
                </span>
              </p>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <h6>Add Member</h6>
                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="username"
                        name="email"
                        value={inputs.email || filteredUsers.email}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="username"
                        name="username"
                        value={inputs.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">
                        User Age
                      </label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        name="userAge"
                        value={inputs.userAge}
                        onChange={handleChange}
                      >
                        <option value="">--Select Anothe Option--</option>
                        <option value="Child">Child</option>
                        <option value="Adult">Adult</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={(e) => handleSave(e)}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-sm-4">
                  <h6>Current Members</h6>
                  {filteredArray.map((swimmer) => (
                    <p>
                      <Members swimmer={swimmer} key={swimmer.id} />
                    </p>
                  ))}
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

export default AddGroupMembers;
