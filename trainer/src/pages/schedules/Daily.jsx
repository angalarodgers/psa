import React from "react";
import DailyTabs from "../../components/daily-calendar/DailyTabs";
import AddEvent from "./AddEvent";

const Daily = () => {
  return (
    <div className="col-md-12 mb-lg-0 mb-4">
      <div className="card mt-4">
        <div className="card-header pb-0 p-3">
          <div className="row">
            <div className="col-6 d-flex align-items-center">
              <h6 className="mb-0">Daily Classes</h6>
            </div>
            <div className="col-6 text-end">
              <a
                type="button"
                className="btn bg-gradient-success btn-block mb-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalMessage"
              >
                <i className="fas fa-plus" />
                &nbsp;&nbsp;Add New Event
              </a>
            </div>
          </div>
        </div>
        <div className="card-body p-3">
          <div className="row">
            <div className="col-md-12 mb-md-0 mb-4">
              <div className="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                <DailyTabs />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddEvent />
    </div>
  );
};

export default Daily;
