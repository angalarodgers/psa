import React from "react";
import ViewUser from "./ViewUser";

const Swimmer = ({ swimmer }) => {
  return (
    <div className="col-md-4">
      <div className="card card-profile card-plain">
        <div className="card-body text-center bg-white shadow border-radius-lg p-3">
          <a href="javascript:;">
            <img
              className="w-100 border-radius-md"
              src="./assets/img/user.jpg"
            />
          </a>
          <small>Swimmer</small>
          <h5 className="mt-3 mb-1 d-md-block d-none">{swimmer.username}</h5>
          <p className="mb-1 d-md-none d-block text-sm font-weight-bold text-darker">
            {swimmer.username}
          </p>
          <p className="mb-0 text-xs  text-warning text-gradient text-uppercase">
            <a href={`mailto:${swimmer.email}`}>{swimmer.email}</a>
          </p>
          <button
            className="btn btn-icon btn-3 btn-xs btn-outline-primary mt-1"
            type="button"
            data-bs-toggle="modal"
            data-bs-target={`#modal-default${swimmer.id}`}
          >
            <span className="btn-inner--icon">
              <i className="ni ni-chat-round" />
            </span>
            <span className="btn-inner--text"> View</span>
          </button>
          <ViewUser swimmer={swimmer} key={swimmer.id} />
        </div>
      </div>
    </div>
  );
};

export default Swimmer;
