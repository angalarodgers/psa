import React from "react";
import { makeRequest } from "../../axios";
import ViewUser from "./ViewUser";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast, { Toaster } from "react-hot-toast";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

const Swimmer = ({ swimmer }) => {
  const navigate = useNavigate();
  function confirmAlert(options) {
    const { title, message, buttons } = options;
    const confirmed = window.confirm(`${title}\n\n${message}`);
    if (confirmed && buttons && buttons[0] && buttons[0].onClick) {
      buttons[0].onClick();
    } else if (buttons && buttons[1] && buttons[1].onClick) {
      buttons[1].onClick();
    }
  }

  const handleDelete = (e, eventId) => {
    console.log(eventId);
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this User?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            makeRequest
              .delete(`/users/deleteUser/${eventId}`)
              .then(() => {
                toast.success("User deleted successfully.", {
                  appearance: "success",
                  autoDismiss: true,
                });
                window.location.reload();
              })
              .catch((error) => {
                toast.error("Failed to delete User. Please try again later.", {
                  appearance: "error",
                  autoDismiss: true,
                });
                console.error(error);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const edit = (e, swimmerId) => {
    navigate({
      pathname: "/edit-swimmer",
      search: createSearchParams({
        swimmerId: swimmerId,
      }).toString(),
    });
  };

  const addMembers = (e, swimmerId) => {
    navigate({
      pathname: "/add-members",
      search: createSearchParams({
        swimmerId: swimmerId,
      }).toString(),
    });
  };
  return (
    <div className="col-md-4 mb-2">
      {swimmer.registeredAs == "individual" ||
      swimmer.registered == "member" ? (
        <div className="card card-profile card-plain">
          <div className="card-header pb-0">
            <div className="row">
              <div className="col-lg-10 col-7">
                <h6>
                  {" "}
                  <small>Username:</small> <strong>{swimmer.username}</strong>
                </h6>
                <p className="text-sm mb-0">
                  <small>Swimmer Email</small>

                  <p className="mb-1 d-md-none d-block text-sm font-weight-bold text-darker">
                    {swimmer.username}
                  </p>
                  <p className="mb-0 text-xs  text-warning text-gradient  mb-4">
                    <a href={`mailto:${swimmer.email}`}>{swimmer.email}</a>
                  </p>

                  <ViewUser swimmer={swimmer} key={swimmer.id} />
                </p>
                <p>Individual {swimmer.userType}</p>
              </div>
              <div className="col-lg-2 col-5  text-end">
                <div className="dropdown float-lg-end pe-4">
                  <a
                    className="cursor-pointer"
                    id="dropdownTable"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-v text-secondary" />
                  </a>
                  <ul
                    className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                    aria-labelledby="dropdownTable"
                  >
                    <li>
                      <a
                        className="dropdown-item border-radius-md"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target={`#modal-default${swimmer.id}`}
                      >
                        View More Details
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item border-radius-md"
                        onClick={(e) => edit(e, swimmer.id)}
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item border-radius-md"
                        href="#"
                        onClick={(e) => handleDelete(e, swimmer.id)}
                      >
                        <span style={{ color: "red" }}>Delete</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card card-profile card-plain ">
          <div
            className="card-header pb-0"
            style={{ backgroundColor: "#D0F1DE " }}
          >
            <div className="row">
              <div className="col-lg-10 col-7">
                <div className="row">
                  <div className="col-sm-12">
                    <h6>
                      {" "}
                      <small>Username:</small>{" "}
                      <strong>{swimmer.username}</strong>
                    </h6>
                    <p className="text-sm mb-0">
                      <small>Swimmer Email</small>

                      <p className="mb-1 d-md-none d-block text-sm font-weight-bold text-darker">
                        {swimmer.username}
                      </p>
                      <p className="mb-0 text-xs  text-warning text-gradient  mb-4">
                        <a href={`mailto:${swimmer.email}`}>{swimmer.email}</a>
                      </p>

                      <ViewUser swimmer={swimmer} key={swimmer.id} />
                    </p>
                    <p>Group {swimmer.userType}</p>
                  </div>
                  <div className="col-sm-12">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={(e) => addMembers(e, swimmer.id)}
                    >
                      Add Members
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-5  text-end">
                <div className="dropdown float-lg-end pe-4">
                  <a
                    className="cursor-pointer"
                    id="dropdownTable"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-v text-secondary" />
                  </a>
                  <ul
                    className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                    aria-labelledby="dropdownTable"
                  >
                    <li>
                      <a
                        className="dropdown-item border-radius-md"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target={`#modal-default${swimmer.id}`}
                      >
                        View More Details
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item border-radius-md"
                        onClick={(e) => edit(e, swimmer.id)}
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item border-radius-md"
                        href="#"
                        onClick={(e) => handleDelete(e, swimmer.id)}
                      >
                        <span style={{ color: "red" }}>Delete</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Swimmer;
