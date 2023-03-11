import React from "react";

const AddEventTabs = () => {
  return (
    <>
      <div>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-addhome-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-addhome"
              type="button"
              role="tab"
              aria-controls="pills-addhome"
              aria-selected="true"
            >
              Add Class
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-addprofile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-addprofile"
              type="button"
              role="tab"
              aria-controls="pills-addprofile"
              aria-selected="false"
            >
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link mb-3"
              id="pills-addcontact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-addcontact"
              type="button"
              role="tab"
              aria-controls="pills-addcontact"
              aria-selected="false"
            >
              Contact
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-addhome"
            role="tabpanel"
            aria-labelledby="pills-addhome-tab"
          >
            1
          </div>
          <div
            className="tab-pane fade"
            id="pills-addprofile"
            role="tabpanel"
            aria-labelledby="pills-addprofile-tab"
          >
            2
          </div>
          <div
            className="tab-pane fade"
            id="pills-addcontact"
            role="tabpanel"
            aria-labelledby="pills-addcontact-tab"
          >
            3
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEventTabs;
