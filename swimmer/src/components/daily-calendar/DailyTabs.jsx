import React from "react";
import DailyCalenar from "./DailyCalenar";
import DailyEvents from "./DailyEvents";

const DailyTabs = () => {
  return (
    <div className="row" style={{ width: "100%" }}>
      <div className="col-sm-12">
        <div>
          <ul
            className="nav nav-pills nav-fill p-1"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-dhome-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-dhome"
                type="button"
                role="tab"
                aria-controls="pills-dhome"
                aria-selected="true"
              >
                Today Classes
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-dprofile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-dprofile"
                type="button"
                role="tab"
                aria-controls="pills-dprofile"
                aria-selected="false"
              >
                Calender
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-dcontact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-dcontact"
                type="button"
                role="tab"
                aria-controls="pills-dcontact"
                aria-selected="false"
              >
                Today's Diary
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-dhome"
              role="tabpanel"
              aria-labelledby="pills-dhome-tab"
            >
              <div className="row">
                <div className="col-sm-12">
                  <DailyEvents />
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-dprofile"
              role="tabpanel"
              aria-labelledby="pills-dprofile-tab"
            >
              <DailyCalenar />
            </div>
            <div
              className="tab-pane fade"
              id="pills-dcontact"
              role="tabpanel"
              aria-labelledby="pills-dcontact-tab"
            >
              None
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTabs;
