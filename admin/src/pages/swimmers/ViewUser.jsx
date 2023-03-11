import React from "react";

const ViewUser = ({ swimmer }) => {
  return (
    <div className="col-md-4">
      <div
        className="modal fade"
        id={`modal-default${swimmer.id}`}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modal-default"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal- modal-dialog-centered modal-"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-default">
                {swimmer.username}
              </h6>
              <button
                type="button"
                className="btn-close text-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-12 text-left">
                  <strong className="text-left">Details</strong>
                  <p>User ID: {swimmer.id}</p>
                  <p className="text-left">
                    Email:{" "}
                    <a href={`mailto:${swimmer.email}`}>{swimmer.email}</a>
                  </p>
                  <p className="text-left">Username: {swimmer.username}</p>
                  <p className="text-left">Member Since: {swimmer.createdAt}</p>
                </div>
                <div className="col-sm-6">
                  <strong>Messages</strong>
                  <p>No New Messages to view</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-link  ml-auto"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
