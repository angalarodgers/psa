import React, { useState } from "react";
import { makeRequest } from "../../axios";
import ViewUser from "./ViewUser";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";

const Swimmer = ({ swimmer }) => {
  const [trainer_events, setTrainerEvents] = useState([]);
  const { isLoading, error, data } = useQuery(
    `ordersAll${swimmer.username}`,
    () =>
      makeRequest.get("/events/getEvents").then((res) => {
        setTrainerEvents(res.data);
        console.log(res.data);
        return res.data;
      })
  );

  const filtered = trainer_events.filter(
    (event) => event.trainer === swimmer.username
  );

  const filtered_today = trainer_events.filter((event) => {
    return (
      (!swimmer.username || event.trainer === swimmer.username) &&
      event.date === new Date().toISOString().split("T")[0]
    );
  });

  const today = new Date().toISOString().slice(0, 10);
  const futureEvents = trainer_events.filter((event) => {
    if (event.trainer !== swimmer.username) {
      return false;
    }
    if (event.date > today) {
      return true;
    } else if (
      event.date === today &&
      event.endTime >
        new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" })
    ) {
      return true;
    }
    return false;
  });

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
  return (
    <div className="col-md-4 mb-2">
      <div className="card card-profile card-plain">
        <div className="card-header pb-0">
          <div className="row">
            <div className="col-lg-10 col-7">
              <h6>
                {" "}
                <small>Username:</small> <strong>{swimmer.username}</strong>
              </h6>
              <p className="text-sm mb-0">
                <small>Trainer Email</small>

                <p className="mb-1 d-md-none d-block text-sm font-weight-bold text-darker">
                  {swimmer.username}
                </p>
                <p className="mb-0 text-xs  text-dark   mb-4">
                  <a href={`mailto:${swimmer.email}`}>{swimmer.email}</a>
                </p>
                <p className="mb-0 text-xs text-darker  mb-4">
                  <span style={{ color: "green" }}>
                    Todays Classes Assigned:{" "}
                    <strong className="text-sm font-weight-bold">
                      {filtered_today.length}
                    </strong>
                  </span>
                </p>
                <p className="mb-0 text-xs text-darker  mb-4">
                  <span>
                    Future Classes Assigned:{" "}
                    <strong className="text-sm font-weight-bold">
                      {futureEvents.length}
                    </strong>
                  </span>
                </p>
                <p className="mb-0 text-xs text-darker  mb-4">
                  <span style={{ color: "orange" }}>
                    Classes Done:{" "}
                    <strong className="text-sm font-weight-bold">
                      {" "}
                      {filtered.length - futureEvents.length}
                    </strong>
                  </span>
                </p>

                <ViewUser swimmer={swimmer} key={swimmer.id} />
              </p>
            </div>
            <div className="col-lg-2 col-5 my-auto text-end">
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
                      href="Edit Details"
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
      <Toaster />
    </div>
  );
};

export default Swimmer;
