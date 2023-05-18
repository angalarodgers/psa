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
            <h6 className="mb-0 text-sm">
              {event.id} / {event.title}
            </h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex  py-1">
          <div className="d-flex flex-column justify-content-center">
            <h6 className="mb-0 text-sm">{event.trainer}</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="avatar-group">
          <span className="mb-0 text-sm">{event.student_name}</span>
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
