import React from "react";
import AddPayment from "./AddPayment";
import BankDeposit from "./BankDeposit";
import BankDepositsList from "./BankDeposits/BankDepositsList";

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
                  <div className="col-3 text-end"></div>
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
                  <div className="col-md-12 mb-md-0 mb-4">
                    <div className="card card-body border card-plain border-radius-lg d-flex align-items-center">
                      <BankDepositsList />
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
