import React from "react";
import TimePassed from "../../constants/TimePassed";

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
        <div className="modal-dialog modal-  modal-" role="document">
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
                <div className="col-12 col-xl-12">
                  <div className="card h-100">
                    <div className="card-header pb-0 p-3">
                      <div className="row">
                        <div className="col-md-8 d-flex">
                          <h6 className="mb-0">User Information</h6>
                        </div>
                        <div className="col-md-4 text-end">
                          <a href="javascript:;">
                            <i
                              className="fas fa-user-edit text-secondary text-sm"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit Profile"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-1">
                      {/* <p className="text-sm">
                        Hi, I’m Alec Thompson, Decisions: If you can’t decide,
                        the answer is no. If two equally difficult paths, choose
                        the one more painful in the short term (pain avoidance
                        is creating an illusion of equality).
                      </p> */}
                      <hr className="horizontal gray-light my-4" />
                      <ul className="list-group">
                        <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                          <strong className="text-dark">Full Name:</strong>{" "}
                          &nbsp; {swimmer.username}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">User Type:</strong>{" "}
                          &nbsp;
                          {swimmer.userType}
                        </li>

                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Age Group:</strong>{" "}
                          &nbsp; {swimmer.userAge}
                        </li>
                        <li className="list-group-item border-0 ps-0 pb-0">
                          <strong className="text-dark text-sm">
                            Member For:
                          </strong>{" "}
                          &nbsp; <TimePassed date={swimmer.createdAt} />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12 pt-2">
                  <div className="card h-100">
                    <div className="card-body">
                      <strong>Messages</strong>
                      <p>No New Messages to view</p>
                    </div>
                  </div>
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
