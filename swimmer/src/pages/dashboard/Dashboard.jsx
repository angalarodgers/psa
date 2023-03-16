import React, { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../axios";
import DailyEvents from "../../components/daily-calendar/DailyEvents";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "react-query";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [pays, setPays] = useState([]);
  const [events, setEvents] = useState([]);
  const { acisLoading, acerror, acdata } = useQuery("GetClientPays", () =>
    makeRequest.get("/pay/getCustomerPays/" + currentUser.id).then((res) => {
      setPays(res.data);

      return res.data;
    })
  );

  const { l, er, ecdata } = useQuery("GetClientEvents", () =>
    makeRequest
      .get("/events/getThisCustomerEvents/" + currentUser.id)
      .then((res) => {
        setEvents(res.data);
        console.log(res.data);
        return res.data;
      })
  );

  const today = new Date().toISOString().slice(0, 10); // Get today's date in the format "2023-02-27"
  const todaysEvents = events.filter((event) => event.date === today); // Filter the events to only include those with today's date

  const total = pays.reduce((acc, item) => acc + item.amount, 0);
  return (
    <>
      <div className="row">
        <div className="col-xl-6 col-sm-6">
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
                        {todaysEvents.length}
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
        <div className="col-xl-6 col-sm-6 mb-xl-0 mb-4">
          <a href="#">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Balance
                      </p>
                      <h5 className="font-weight-bolder mb-0">
                        KSH.{total}
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
                    <span className="font-weight-bold ms-1">0 done</span> this
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
                <DailyEvents ents={todaysEvents} l={l} er={er} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
