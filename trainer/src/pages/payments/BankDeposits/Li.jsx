import React from "react";

const Li = ({ item }) => {
  return (
    <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
      <div className="d-flex flex-column">
        <h6 className="mb-3 text-sm">
          KSH. <strong style={{ color: "green" }}>{item.amount}</strong>
        </h6>
        <span className="mb-2 text-xs">
          Customer Name:{" "}
          <span className="text-dark font-weight-bold ms-sm-2">
            <a href="#" style={{ textDecoration: "underline" }}>
              {item.client_id}
            </a>
          </span>
        </span>
        <span className="mb-2 text-xs">
          Email Address:{" "}
          <span className="text-dark ms-sm-2 font-weight-bold">
            {item.client_id}
          </span>
        </span>

        <span className="text-xs">
          Transaction Number:{" "}
          <span className="text-dark ms-sm-2 font-weight-bold">
            {item.payment_order_id}
          </span>
        </span>
      </div>
      <div className="ms-auto text-end">
        <a
          className="btn btn-link text-danger text-gradient px-3 mb-0"
          href="javascript:;"
        >
          <i className="far fa-trash-alt me-2" />
          Delete
        </a>
        <a className="btn btn-link text-dark px-3 mb-0" href="javascript:;">
          <i className="fas fa-pencil-alt text-dark me-2" aria-hidden="true" />
          Edit
        </a>
      </div>
    </li>
  );
};

export default Li;
