import React, { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import EventPercentage from "./EventPercentage";

const DailyEventsTR2 = ({ event }) => {
  const [percentage, setPercentage] = useState(0);

  const date = new Date(event.date); // Parse the event date string into a Date object
  const targetTime = event.endTime; // Get the event end time

  const isTimePassed = () => {
    const now = new Date();
    const [targetHour, targetMinute, targetSecond] = targetTime.split(":");
    const targetDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      targetHour,
      targetMinute,
      targetSecond
    );
    console.log(now);
    console.log(targetDate);
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
                <h6 className="mb-0 text-sm">
                  {" "}
                  {event.title} / {event.student_name} @ {event.startTime}
                </h6>
              </div>
            </div>
          </td>
          <td className="align-middle text-center text-sm">
            <div className="avatar-group mt-2">
              <span>{event.trainer}</span>
            </div>
          </td>

          <td className="align-middle text-center text-sm">
            <span>{event.ageGroup}</span>
          </td>
          <td className="align-middle text-center text-sm">
            <span className="text-xs font-weight-bold">
              {" "}
              {event.date} / {event.startTime} to {event.endTime}
            </span>
          </td>
          <td className="align-middle text-center text-sm">
            <div className="progress-wrapper mx-auto">
              <div className="progress-info">
                <div className="progress-percentage">
                  <span className="text-xs font-weight-bold">
                    100%
                    {/* <TimeDifferencePercentage start={event.s} end={event.e} /> */}
                  </span>
                </div>
              </div>
              <div className="progress">
                <div
                  className={`progress-bar bg-gradient-info w-${100}`}
                  role="progressbar"
                  aria-valuenow={100}
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
        <span>{}</span>
      )}
    </>
  );
};

export default DailyEventsTR2;
