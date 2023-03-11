import React, { useState } from "react";
import Client from "./Client";
import Li from "./Li";

const BankDepositsList = ({ filteredData, setThisClient, setThisItem }) => {
  const getClient = (e, item_id, item) => {
    setThisClient(item_id);
    setThisItem(item);
  };
  return (
    <div className="card">
      <div className="card-body pt-4 p-3">
        <ul className="list-group">
          {filteredData.map((item, index) => (
            <li
              key={index}
              className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"
            >
              <div
                className="d-flex flex-column"
                style={{ cursor: "pointer" }}
                onClick={(e) => getClient(e, item.client_id, item)}
              >
                <h6 className="mb-3 text-sm">
                  KSH. <strong style={{ color: "green" }}>{item.amount}</strong>
                </h6>
                <span className="mb-2 text-xs">
                  Customer Name:{" "}
                  <span className="text-dark font-weight-bold ms-sm-2">
                    <a
                      href="#"
                      style={{ textDecoration: "underline" }}
                      onClick={(e) => getClient(e, item.client_id, item)}
                    >
                      <Client client_id={item.client_id} key={item.id} />
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
              <div
                className="ms-auto text-end"
                style={{ cursor: "pointer" }}
                onClick={(e) => getClient(e, item.client_id, item)}
              >
                <a
                  className="btn btn-link text-danger text-gradient px-3 mb-0"
                  href="javascript:;"
                >
                  <i className="far fa-trash-alt me-2" />
                  Delete
                </a>
                <a
                  className="btn btn-link text-dark px-3 mb-0"
                  href="javascript:;"
                >
                  <i
                    className="fas fa-pencil-alt text-dark me-2"
                    aria-hidden="true"
                  />
                  Edit
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BankDepositsList;
