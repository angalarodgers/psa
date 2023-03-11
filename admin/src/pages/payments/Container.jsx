import React from "react";
import AddPayment from "./AddPayment";
import BankDeposit from "./BankDeposit";

const Container = () => {
  return (
    <>
      <div className="col-lg-12">
        <div className="row">
          <div className="col-xl-12">
            <div className="row">
              <div className="col-md-3 mt-md-0 mt-4">
                <div className="card">
                  <div className="card-header mx-4 p-3 text-center">
                    <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                      <i className="fas fa-landmark opacity-10" />
                    </div>
                  </div>
                  <div className="card-body pt-0 p-3 text-center">
                    <h6 className="text-center mb-0">Bank Deposit</h6>
                    <span className="text-xs"></span>
                    <hr className="horizontal dark my-3" />
                    <h5 className="mb-0">+$2000</h5>
                    <hr className="horizontal dark my-3" />
                    <a
                      className="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-default"
                    >
                      Read More
                      <i
                        className="fas fa-arrow-right text-sm ms-1"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-md-0 mt-4">
                <div className="card">
                  <div className="card-header mx-4 p-3 text-center">
                    <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                      <i className="fab fa-paypal opacity-10" />
                    </div>
                  </div>
                  <div className="card-body pt-0 p-3 text-center">
                    <h6 className="text-center mb-0">Paypal</h6>
                    <span className="text-xs"></span>
                    <hr className="horizontal dark my-3" />
                    <h5 className="mb-0">$455.00</h5>
                    <hr className="horizontal dark my-3" />
                    <a
                      className="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-default"
                    >
                      Read More
                      <i
                        className="fas fa-arrow-right text-sm ms-1"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mt-md-0 mt-4">
                <div className="card">
                  <div className="card-header mx-4 p-3 text-center">
                    <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                      <i className="fa fa-money opacity-10" />
                    </div>
                  </div>
                  <div className="card-body pt-0 p-3 text-center">
                    <h6 className="text-center mb-0">Cash</h6>
                    <span className="text-xs"></span>
                    <hr className="horizontal dark my-3" />
                    <h5 className="mb-0">$455.00</h5>
                    <hr className="horizontal dark my-3" />
                    <a
                      className="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-default"
                    >
                      Read More
                      <i
                        className="fas fa-arrow-right text-sm ms-1"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mt-md-0 mt-4">
                <div className="card">
                  <div className="card-header mx-4 p-3 text-center">
                    <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                      <i className="fa fa-money opacity-10" />
                    </div>
                  </div>
                  <div className="card-body pt-0 p-3 text-center">
                    <h6 className="text-center mb-0">M-Pesa</h6>
                    <span className="text-xs"></span>
                    <hr className="horizontal dark my-3" />
                    <h5 className="mb-0">$455.00</h5>
                    <hr className="horizontal dark my-3" />
                    <a
                      className="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-default"
                    >
                      Read More
                      <i
                        className="fas fa-arrow-right text-sm ms-1"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <BankDeposit />
            </div>
          </div>
          <div className="col-md-12 mb-lg-0 mb-4">
            <div className="card mt-4">
              <div className="card-header pb-0 p-3">
                <div className="row">
                  <div className="col-6 d-flex align-items-center">
                    <h6 className="mb-0">Payment Method</h6>
                  </div>
                  <div className="col-6 text-end">
                    <a
                      className="btn bg-gradient-dark mb-0"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-form"
                    >
                      <i className="fas fa-plus" />
                      &nbsp;&nbsp;Add Funds
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-md-6 mb-md-0 mb-4">
                    <div className="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                      <img
                        className="w-10 me-3 mb-0"
                        src="../assets/img/logos/mastercard.png"
                        alt="logo"
                      />
                      <h6 className="mb-0">
                        ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852
                      </h6>
                      <i
                        className="fas fa-pencil-alt ms-auto text-dark cursor-pointer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit Card"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                      <img
                        className="w-10 me-3 mb-0"
                        src="../assets/img/logos/visa.png"
                        alt="logo"
                      />
                      <h6 className="mb-0">
                        ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;5248
                      </h6>
                      <i
                        className="fas fa-pencil-alt ms-auto text-dark cursor-pointer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit Card"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddPayment />
      </div>
    </>
  );
};

export default Container;
