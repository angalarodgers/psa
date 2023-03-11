import React, { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import EventPercentage from "./EventPercentage";
import GetTime from "./GetTime";
import TimeDifferencePercentage from "./TimeDifferencePercentage";

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
      {isTimePassed() ? (
        <tr style={{ backgroundColor: "lightgray" }}>
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
                <h6 className="mb-0 text-sm">{event.title}</h6>
              </div>
            </div>
          </td>
          <td className="align-middle text-center text-sm">
            <div className="avatar-group mt-2">
              <a
                href="eventmembers"
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
            <div className="avatar-group mt-2">
              <a
                href="javascript:;"
                className="avatar avatar-xs rounded-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Ryan Tompson"
              >
                <img src="../assets/img/team-1.jpg" alt="team1" />
              </a>
              <a
                href="javascript:;"
                className="avatar avatar-xs rounded-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Romina Hadid"
              >
                <img src="../assets/img/team-2.jpg" alt="team2" />
              </a>
              <a
                href="javascript:;"
                className="avatar avatar-xs rounded-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Alexander Smith"
              >
                <img src="../assets/img/team-3.jpg" alt="team3" />
              </a>
              <a
                href="javascript:;"
                className="avatar avatar-xs rounded-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Jessica Doe"
              >
                <img src="../assets/img/team-4.jpg" alt="team4" />
              </a>
            </div>
          </td>
          <td className="align-middle text-center text-sm">
            <span className="text-xs font-weight-bold">
              {" "}
              {event.date} / {event.startTime}{" "}
            </span>
          </td>
          <td className="align-middle text-center text-sm">
            <div className="progress-wrapper mx-auto">
              <div className="progress-info">
                <div className="progress-percentage">
                  <span className="text-xs font-weight-bold">
                    <EventPercentage
                      tm={event.time}
                      setPercentage={setPercentage}
                    />
                    {/* <TimeDifferencePercentage start={event.s} end={event.e} /> */}
                  </span>
                </div>
              </div>
              <div className="progress">
                <div
                  className={`progress-bar bg-gradient-info w-${percentage}`}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </td>
          <td>
            <span>Class is over</span>
          </td>
        </tr>
      ) : (
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
            <div
              className="avatar-group mt-2"
              onClick={(e) => viewMembers(e, event.id)}
            >
              <a
                href="javascript:;"
                className="avatar avatar-xs rounded-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Ryan Tompson"
              >
                <img src="../assets/img/team-1.jpg" alt="team1" />
              </a>
              <a
                href="javascript:;"
                className="avatar avatar-xs rounded-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Romina Hadid"
              >
                <img src="../assets/img/team-2.jpg" alt="team2" />
              </a>
              <a
                href="javascript:;"
                className="avatar avatar-xs rounded-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Alexander Smith"
              >
                <img src="../assets/img/team-3.jpg" alt="team3" />
              </a>
              <a
                href="javascript:;"
                className="avatar avatar-xs rounded-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Jessica Doe"
              >
                <img src="../assets/img/team-4.jpg" alt="team4" />
              </a>
            </div>
          </td>
          <td className="align-middle text-center text-sm">
            <span className="text-xs font-weight-bold">
              {" "}
              {event.date} / {event.startTime}{" "}
            </span>
          </td>
          <td className="align-middle text-center text-sm">
            <div className="progress-wrapper mx-auto">
              <div className="progress-info">
                <div className="progress-percentage">
                  <span className="text-xs font-weight-bold">
                    <EventPercentage
                      tm={event.time}
                      setPercentage={setPercentage}
                    />
                    {/* <TimeDifferencePercentage start={event.s} end={event.e} /> */}
                  </span>
                </div>
              </div>
              <div className="progress">
                <div
                  className={`progress-bar bg-gradient-info w-${percentage}`}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
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
      )}
    </>
  );
};

export default DailyEventTR;
