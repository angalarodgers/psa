import React from "react";
import AddEventTabs from "./AddEventTabs";

const AddEvent = () => {
  return (
    <div className="col-md-4">
      {/* Button trigger modal */}

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModalMessage"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalMessageTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Event
              </h5>
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
              <AddEventTabs />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn bg-gradient-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn bg-gradient-primary">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
