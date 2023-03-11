import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import {
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useQuery } from "react-query";
import BankDepositsList from "./BankDeposits/BankDepositsList";
import Client from "./BankDeposits/Client";

const BankDeposit = () => {
  const [clientId, setClientId] = useState("");
  const [madeAt, setMadeAt] = useState("");
  const [paymentSource, setPaymentSource] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [thisClient, setThisClient] = useState(0);
  const [thisItem, setThisItem] = useState({});
  const [users, setUsers] = useState([]);

  const { isLoading, error, dddata } = useQuery("get", () =>
    makeRequest.get("/pay/getAllpay").then((res) => {
      setData(res.data);
      return res.data;
    })
  );

  const { uisLoading, uerror, udata } = useQuery("getMyUsers", () =>
    makeRequest.get("/users/getCustomers").then((res) => {
      setUsers(res.data);
      return res.data;
    })
  );

  // your data array goes here
  // const ddata = [
  //   { client_id: "1", madeAt: "2022-01-01", payment_source: "credit card" },
  //   { client_id: "1", madeAt: "2022-01-02", payment_source: "paypal" },
  //   { client_id: "2", madeAt: "2022-01-01", payment_source: "credit card" },
  //   { client_id: "2", madeAt: "2022-01-03", payment_source: "cash" },
  //   { client_id: "3", madeAt: "2022-01-02", payment_source: "paypal" },
  // ];

  // filtering function goes here
  const filterData = () => {
    let result = data;

    if (clientId) {
      result = result.filter((item) => item.client_id == clientId);
    }

    if (madeAt) {
      result = result.filter((item) => item.madeAt.startsWith(madeAt));
    }

    if (paymentSource) {
      result = result.filter((item) => item.paymentSource === paymentSource);
    }

    setFilteredData(result);
  };

  // handle user input changes
  const handleClientIdChange = (event) => {
    setClientId(event.target.value);
  };

  const handleDateChange = (event) => {
    setMadeAt(event.target.value);
  };

  const handlePaymentSourceChange = (event) => {
    setPaymentSource(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    filterData();
  };

  useEffect(() => {
    filterData();
  }, []);

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
                <form action="" onSubmit={handleSubmit}>
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
                          <select
                            className="form-control "
                            value={clientId}
                            onChange={handleClientIdChange}
                          >
                            <option value="">All</option>
                            <option value={null} selected disabled>
                              Select Customer
                            </option>
                            {uerror
                              ? "Something Went Wring"
                              : uisLoading
                              ? "Loading"
                              : users.map((customer) => (
                                  <option value={customer.id} key={customer.id}>
                                    {customer.id}, Name: {customer.username},
                                    Email: {customer.email}
                                  </option>
                                ))}
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
                              value={madeAt}
                              onChange={handleDateChange}
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
                          <select
                            className="form-control "
                            value={paymentSource}
                            onChange={handlePaymentSourceChange}
                          >
                            <option value="">All</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="Cash">Cash</option>
                          </select>
                        </div>
                        <div className="col-sm-4">
                          <button className="btn btn-primary" type="submit">
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mt-4">
                      <div className="row">
                        <div
                          className="col-sm-7"
                          style={{ height: "500px", overflow: "scroll" }}
                        >
                          <BankDepositsList
                            filteredData={filteredData}
                            setThisClient={setThisClient}
                            setThisItem={setThisItem}
                          />
                        </div>
                        <div className="col-sm-5">
                          {thisClient ? (
                            <div className="row">
                              <small>
                                Client ID: <Client client_id={thisClient} />
                              </small>

                              <div className="col-sm-12">
                                <div className="card">
                                  <table>
                                    <tr>
                                      <td>Amount: {thisItem.amount}</td>
                                    </tr>
                                    <tr>
                                      <td>Made At: {thisItem.madeAt}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Pay Source : {thisItem.paymentSource}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                          ) : (
                            "No loaded data"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
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
