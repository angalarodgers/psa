import React from "react";

const DailyEventTR2 = ({ event }) => {
  return (
    <>
      {event.passed == 1 && (
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
                  {event.title} / <strong>{event.student_name}</strong>
                </h6>
              </div>
            </div>
          </td>

          <td className="align-middle text-center text-sm">
            <span className="text-xs font-weight-bold">
              {" "}
              {"Today"} / <strong>{event.startTime}</strong> to {event.endTime}
            </span>
          </td>
          <td>
            <span style={{ color: "darkyellow" }}>Class has ended</span>
          </td>
        </tr>
      )}
    </>
  );
};

export default DailyEventTR2;
