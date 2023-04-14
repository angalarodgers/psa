import React from "react";
import { makeRequest } from "../../axios";
import toast, { Toaster } from "react-hot-toast";

const Members = ({ swimmer }) => {
  const handleEdit = async (e, swimmerInfo) => {};
  const handleDelete = async (e, swimmerId) => {
    try {
      const response = await makeRequest.delete(
        "/users/deleteUser/" + swimmerId
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex px-2 py-1" key={swimmer.id}>
      <div>
        <img
          src="../assets/img/200.png"
          className="avatar avatar-sm me-3"
          alt="user1"
        />
      </div>
      <div className="d-flex flex-column justify-content-center">
        <h6 className="mb-0 text-sm">
          userame: <strong>{swimmer.username}</strong>
        </h6>
        <p className="text-xs text-secondary mb-0">
          Swimmer ID:{" "}
          <span>
            <strong>{swimmer.id}</strong>
          </span>{" "}
          &nbsp; Age:
          <span>
            <strong>{swimmer.userAge}</strong>
          </span>
        </p>
        <p>
          <a href="/edit-swimmer" className="badge bg-gradient-info mx-2">
            Edit
          </a>
          <button
            className="badge bg-gradient-danger"
            onClick={(e) => handleDelete(e, swimmer.id)}
          >
            Delete
          </button>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Members;
