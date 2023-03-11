import React from "react";
import DailyTabs from "../../components/daily-calendar/DailyTabs";
import AddEvent from "./AddEvent";

const Daily = () => {
  return (
    <div className="col-md-12 mb-lg-0 mb-4">
      <div className="card mt-4">
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
