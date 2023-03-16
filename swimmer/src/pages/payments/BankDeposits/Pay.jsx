import React from "react";
import DateConverter from "./DateConverter";

const Pay = ({ pay }) => {
  return (
    <li
      className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"
      style={{ width: "100%" }}
    >
      <div className="d-flex flex-column">
        <h6 className="mb-3 text-sm">
          KSH. <strong style={{ color: "green" }}>{pay.amount}</strong>
        </h6>

        <span className="text-xs">
          Transaction Number:{" "}
          <span className="text-dark ms-sm-2 font-weight-bold">{pay.id}</span>
        </span>
      </div>
      <div className="ms-auto text-end">
        <span className="text-xs">
          Transaction Date:
          <span className="text-dark ms-sm-2 font-weight-bold">
            <DateConverter dateString={pay.madeAt} />
          </span>
        </span>
      </div>
    </li>
  );
};

export default Pay;
