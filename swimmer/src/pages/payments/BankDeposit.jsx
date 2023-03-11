import React from "react";
import BankDepositsList from "./BankDeposits/BankDepositsList";

const BankDeposit = () => {
  return (
    <div className="row" style={{ width: "80%" }}>
      <div className="col-md-12">
        <div
          className="modal fade bd-example-modal-lg"
          id="modal-default"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modal-default"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal- modal-dialog-centered modal-xl"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  Payments Made
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
                  <div className="col-md-12 mt-4">
                    <div className="row">
                      <div className="col-sm-4">
                        <label
                          htmlFor="example-date-input"
                          className="form-control-label"
                        >
                          Select Client
                        </label>
                        <select className="form-control ">
                          <option>Customer (Swimmer)</option>
                        </select>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label
                            htmlFor="example-date-input"
                            className="form-control-label"
                          >
                            Select Date
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            defaultValue="2018-11-23"
                            id="example-date-input"
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <label
                          htmlFor="example-date-input"
                          className="form-control-label"
                        >
                          Select Transaction Type
                        </label>
                        <select className="form-control ">
                          <option>All Payment Methods</option>
                          <option value="PayPal">PayPal</option>
                          <option value="Cash">Cash</option>
                          <option value="Mpesa">Mpesa</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div className="row">
                      <div className="col-sm-7">
                        <BankDepositsList />
                      </div>
                      <div className="col-sm-5"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn bg-gradient-primary">
                  Save changes
                </button>
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
    </div>
  );
};

export default BankDeposit;
