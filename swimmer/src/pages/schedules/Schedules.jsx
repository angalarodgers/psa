import React from "react";
import DailyCalenar from "../../components/daily-calendar/DailyCalenar";
import AllEvents from "./AllEvents";
import Daily from "./Daily";
import "./Schedules.scss";

const Schedules = () => {
  return (
    <>
      <div className="nav-wrapper position-relative end-0">
        <div>
          <ul className="nav nav-pills nav-fill p-1" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link sc active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <i className="ni ni-calendar-grid-58 text-sm me-2" /> Today
                Schedules
              </a>
            </li>

            <li className="nav-item" role="presentation">
              <button
                className="nav-link sc"
                id="pills-annual-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-annual"
                type="button"
                role="tab"
                aria-controls="pills-annual"
                aria-selected="false"
              >
                <i className="ni ni-calendar-grid-58 text-sm me-2" /> All
                Classes
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              {/* <DailyCalenar /> */}
              <Daily />
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              2
            </div>
            <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              3
            </div>
            <div
              className="tab-pane fade"
              id="pills-annual"
              role="tabpanel"
              aria-labelledby="pills-annual-tab"
            >
              <AllEvents />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedules;
