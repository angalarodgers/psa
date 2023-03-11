import React from "react";
import AddPaymentTabs from "./AddPaymentTabs";

const AddPayment = () => {
  return (
    <div className="col-md-4">
      <button
        type="button"
        className="btn btn-block btn-default mb-3"
        data-bs-toggle="modal"
        data-bs-target="#modal-form"
      >
        Form
      </button>
      <div
        className="modal fade"
        id="modal-form"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modal-form"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="card card-plain">
                <div className="card-header pb-0 text-left">
                  <h3 className="font-weight-bolder text-info text-gradient">
                    Add/Make Payment
                  </h3>
                  <p className="mb-0">Add Customer Pay/Make payment</p>
                </div>
                <div className="card-body">
                  <AddPaymentTabs />
                </div>
                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <div
                      id="creditCardType"
                      className="d-flex justify-content-center tx-28 tx-gray-500 mg-t-10"
                    >
                      <div className="amex lh-1 m-1">
                        <i className="fa fa-cc-amex" />
                      </div>
                      <div className="visa lh-1 mg-l-5 m-1">
                        <i className="fa fa-cc-visa" />
                      </div>
                      <div className="mastercard lh-1 mg-l-5 m-1">
                        <i className="fa fa-cc-mastercard" />
                      </div>
                      <div className="jcb lh-1 mg-l-5 m-1">
                        <i className="fa fa-cc-jcb" />
                      </div>
                      <div className="discover lh-1 mg-l-5 m-1">
                        <i className="fa fa-cc-discover" />
                      </div>
                      <div className="diners lh-1 mg-l-5 m-1">
                        <i className="fa fa-cc-diners-club" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
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
  );
};

export default AddPayment;
