import React from "react";
import AddPayment from "./AddPayment";
import BankDeposit from "./BankDeposit";

const Container = () => {
  return (
    <>
      <div className="col-lg-12">
        <div className="row">
          <div className="col-xl-12"></div>
          <div className="col-md-12 mb-lg-0 mb-4">
            <div className="card mt-4">
              <div className="card-header pb-0 p-3">
                <div className="row">
                  <div className="col-6 d-flex align-items-center">
                    <h6 className="mb-0">Payment Method</h6>
                  </div>
                  <div className="col-3 text-end">
                    <a
                      className="btn bg-gradient-primary mb-0"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-default"
                    >
                      <i className="fas fa-plus" />
                      &nbsp;&nbsp;View Payments
                    </a>
                  </div>
                  <div className="col-3 text-end">
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
        <BankDeposit />
      </div>
    </>
  );
};

export default Container;
