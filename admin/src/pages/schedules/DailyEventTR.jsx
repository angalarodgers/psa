import React, { useState } from "react";

const DailyEventTR = ({ event }) => {
  const [percentage, setPercentage] = useState(0);
  return (
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
            <h6 className="mb-0 text-sm">{event.id}</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2 py-1">
          <div className="d-flex flex-column justify-content-center">
            <h6 className="mb-0 text-sm">{event.title}</h6>
          </div>
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
    </tr>
  );
};

export default DailyEventTR;
