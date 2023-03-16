import React, { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import EventPercentage from "../../components/daily-calendar/EventPercentage";

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
    navigate({
      pathname: "/assign-class",
      search: createSearchParams({
        id: eventId,
      }).toString(),
    });
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
  return (
    <>
      <tr>
        <td>
          <div className="d-flex px-2 py-1">
            <div>
              <img
                src="../assets/img//200.png"
                className="avatar avatar-sm me-3"
                alt="xd"
              />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <a href="#" onClick={(e) => viewMembers(e, event.id)}>
                <h6 className="mb-0 text-sm">{event.title}</h6>
              </a>
            </div>
          </div>
        </td>
        <td className="align-middle text-center text-sm">
          <div className="avatar-group mt-2">
            <a
              href="#"
              className="avatar avatar-xs rounded-circle"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Ryan Tompson"
            >
              <img src="../assets/img/team-1.jpg" alt="team1" />
            </a>
          </div>
        </td>
        <td>
          <span>{event.noStudents}</span>
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
            className="btn btn-default"
            onClick={(e) => assignStudent(e, event.id)}
          >
            Assign Students
          </button>
        </td>
      </tr>
    </>
  );
};

export default DailyEventTR;
