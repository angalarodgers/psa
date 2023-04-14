import React, { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast, { Toaster } from "react-hot-toast";
import EventPercentage from "../../components/daily-calendar/EventPercentage";
import "./stl.css";
import { makeRequest } from "../../axios";
import EditClass from "./EditClass";

const DailyEventTR = ({ event }) => {
  const [percentage, setPercentage] = useState(0);

  const targetTime = event.endTime; // Set the target time

  const isTimePassed = () => {
    const now = new Date();
    const [targetHour, targetMinute, targetSecond] = targetTime.split(":");
    const targetDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      targetHour,
      targetMinute,
      targetSecond
    );
    return now > targetDate;
  };
  const navigate = useNavigate();
  const assignStudent = (e, eventId) => {
    e.preventDefault();
    // navigate({
    //   pathname: "/assign-class",
    //   search: createSearchParams({
    //     id: eventId,
    //   }).toString(),
    // });
  };

  const viewMembers = (e, eventID) => {
    e.preventDefault();
    try {
      navigate({
        pathname: "/event-members",
        search: createSearchParams({
          event_id: eventID,
        }).toString(),
      });
    } catch (error) {}
  };

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
      message: "Are you sure you want to delete this event?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            makeRequest
              .delete(`/events/deleteEvent/${eventId}`)
              .then(() => {
                toast.success("Event deleted successfully.", {
                  appearance: "success",
                  autoDismiss: true,
                });
                window.location.reload();
              })
              .catch((error) => {
                toast.error("Failed to delete event. Please try again later.", {
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
    <>
      <tr style={{ fontSize: "12px" }}>
        <td>
          <div className="d-flex px-2 py-1">
            <div>
              <img
                src="../assets/img//200.png"
                className="avatar avatar-sm me-3"
                alt="xd"
              />
            </div>
            <div
              className="d-flex flex-column justify-content-center"
              style={{ fontSize: "12px" }}
            >
              <a href="#" onClick={(e) => viewMembers(e, event.id)}>
                <p className="mb-0 text-sm" style={{ fontSize: "11px" }}>
                  <small>ID: {event.id}</small> &nbsp;
                  {event.title} / <strong>{event.student_name}</strong>
                </p>
              </a>
            </div>
          </div>
        </td>
        <td className="">
          <div className="avatar-group mt-2">{event.trainer}</div>
        </td>

        <td>
          <span>{event.ageGroup}</span>
        </td>
        <td className="align-middle text-center text-sm">
          <span className="text-xs font-weight-bold">
            {" "}
            {event.date} / {event.startTime}{" "}
          </span>
        </td>

        <td>
          <button
            type="button"
            className="btn btn-outline-info mx-2"
            data-bs-toggle="modal"
            data-bs-target={`#exampleModal${event.id}`}
            onClick={(e) => assignStudent(e, event.id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => handleDelete(e, event.id)}
          >
            Delete
          </button>
          <EditClass key={event.id} event={event} />
        </td>

        <Toaster />
      </tr>
    </>
  );
};

export default DailyEventTR;
