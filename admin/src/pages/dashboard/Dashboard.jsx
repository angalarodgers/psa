import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";

import { useQuery } from "react-query";
import DailyEvents from "../../components/daily-calendar/DailyEvents";

const Dashboard = () => {
  const [todayClasses, setTodayClasses] = useState([]);
  const [todayPay, setTodayPay] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [users, setUsers] = useState(0);

  const { tcisLoading, tcerror, tcdata } = useQuery("todayClasses", () =>
    makeRequest.get("/events/getEvents").then((res) => {
      setTodayClasses(res.data);
      return res.data;
    })
  );

  const { tpisLoading, tperror, tpdata } = useQuery("todayPayment", () =>
    makeRequest.get("/pay/getAllPay").then((res) => {
      setTodayPay(res.data);
      return res.data;
    })
  );

  const { acisLoading, acerror, acdata } = useQuery("GetAllClients", () =>
    makeRequest.get("/users/getCustomers").then((res) => {
      setNewUsers(res.data);
      return res.data;
    })
  );

  const totalAmount = todayPay.reduce((acc, curr) => acc + curr.amount, 0);

  const today = new Date().toLocaleDateString(); // get today's date in string format

  const filteredDataTC = todayClasses.filter((obj) => {
    const date = new Date(obj.date).toLocaleDateString(); // convert object's date to string format
    return date === today;
  });
  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-sm-6">
          <a href="#">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Today's Classes
                      </p>
                      <h5 className="font-weight-bolder mb-0">
                        {filteredDataTC.length}
                        <span className="text-success text-sm font-weight-bolder">
                          .
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i
                        className="ni ni-paper-diploma text-lg opacity-10"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <a href="#">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Payments
                      </p>
                      <h5 className="font-weight-bolder mb-0">
                        ${totalAmount}
                        <span className="text-success text-sm font-weight-bolder">
                          .
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i
                        className="ni ni-money-coins text-lg opacity-10"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <a href="#">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Clients
                      </p>
                      <h5 className="font-weight-bolder mb-0">
                        {newUsers.length}
                        <span className="text-success text-sm font-weight-bolder">
                          .
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i
                        className="ni ni-world text-lg opacity-10"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <a href="#">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        All
                      </p>
                      <h5 className="font-weight-bolder mb-0">
                        {todayClasses.length}
                        <span className="text-danger text-sm font-weight-bolder">
                          .
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i
                        className="ni ni-paper-diploma text-lg opacity-10"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-12 mb-lg-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-lg-6">
                  <div className="d-flex flex-column h-100">
                    <p className="mb-1 pt-2 text-bold">How To Swimm...</p>
                    <h5 className="font-weight-bolder">
                      Everything you need to know
                    </h5>
                    <p className="mb-5">
                      Sharing the learn to swim journey, while teaching the
                      families to love and respect the water
                    </p>
                    <a
                      className="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                      href="javascript:;"
                    >
                      Read More
                      <i
                        className="fas fa-arrow-right text-sm ms-1"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                  <div className="bg-gradient-primary border-radius-lg h-100">
                    <img
                      src="../assets/img/shapes/waves-white.svg"
                      className="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                      alt="waves"
                    />
                    <div className="position-relative d-flex align-items-center justify-content-center h-100">
                      <img
                        className="w-100 position-relative z-index-2 pt-4"
                        src="../assets/img/illustrations/rocket-white.png"
                        alt="rocket"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-lg-12 col-md-6 mb-md-0 mb-4">
          <div className="card">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-lg-6 col-7">
                  <h6>Today's Classes</h6>
                  <p className="text-sm mb-0">
                    <i className="fa fa-check text-info" aria-hidden="true" />
                    <span className="font-weight-bold ms-1">30 done</span> this
                    month
                  </p>
                </div>
                <div className="col-lg-6 col-5 my-auto text-end">
                  <div className="dropdown float-lg-end pe-4">
                    <a
                      className="cursor-pointer"
                      id="dropdownTable"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-ellipsis-v text-secondary" />
                    </a>
                    <ul
                      className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                      aria-labelledby="dropdownTable"
                    >
                      <li>
                        <a
                          className="dropdown-item border-radius-md"
                          href="javascript:;"
                        >
                          Action
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item border-radius-md"
                          href="javascript:;"
                        >
                          Another action
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item border-radius-md"
                          href="javascript:;"
                        >
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                <DailyEvents />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
