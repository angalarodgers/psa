import React, { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { makeRequest } from "../../axios";

const Class = ({ event }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();
  const edit = async (e, id) => {
    e.preventDefault();
    if (id === null) {
      toast.error("Error!");
    } else {
      navigate({
        pathname: "/edit-class",
        search: createSearchParams({
          id: id,
        }).toString(),
      });
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      setIsDeleting(true);
      try {
        await makeRequest.delete(`/events/deleteEvent/${event.id}`);
      } catch (error) {
        toast.error("Failed to delete event. Please try again later.");
      }
      setIsDeleting(false);
    }
  };
  return (
    <div className="col-md-12 mb-lg-0 mb-4">
      <div className="card mt-4">
        <div className="card-header pb-0 p-3">
          <div className="row">
            <div className="col-6 d-flex align-items-center">
              <h6 className="mb-0">
                #{event.id} / Student : {event.student_name}
              </h6>
            </div>
            <div className="col-6 text-end">
              <a
                className="btn btn-outline-info mb-0 mx-1"
                onClick={(e) => edit(e, event.id)}
              >
                <i className="fas fa-edit" />
                &nbsp;Edit
              </a>
              <a
                className="btn btn-outline-danger mb-0"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <i className="fas fa-trash" />
                &nbsp;Delete
              </a>
            </div>
          </div>
        </div>
        <div className="card-body p-3">
          <div className="row">
            <div className="col-md-6 mb-md-0 mb-4">
              <div className="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                <img
                  className="w-10 me-3 mb-0"
                  src="../assets/img/200.png"
                  alt="logo"
                />
                <p className="mb-0">
                  <small> {event.ageGroup}</small>
                  &nbsp;&nbsp;&nbsp;<small>{event.title}.</small>
                  &nbsp;&nbsp;&nbsp;
                  <small>
                    <span style={{ color: "orange" }}>
                      Coach : {event.trainer}
                    </span>
                  </small>{" "}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                <p className="mb-0">
                  <small>Date : {event.date},</small>
                  &nbsp;&nbsp;&nbsp;
                  <small>
                    Start :{" "}
                    <small style={{ color: "green" }}>{event.startTime},</small>
                  </small>
                  &nbsp;&nbsp;&nbsp;
                  <small>
                    End :{" "}
                    <small style={{ color: "maroon" }}>{event.endTime}</small>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class;
