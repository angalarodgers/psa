import React, { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../axios";
import DailyEvents from "../../components/daily-calendar/DailyEvents";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import "./child.css";

const getUsers = async (email) => {
  const response = await makeRequest.get("/users/getMyChildren/" + email);
  return response.data;
};

const getEvents = async () => {
  const response = await makeRequest.get("/events/getEvents");
  return response.data;
};

const Dashboard = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      window.location.href = "/";
    }
  }, [currentUser]);
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
        return res.data;
      })
  );

  const { data: children, isLoading: Loading } = useQuery(
    ["getMyChildren", currentUser.email],
    () => getUsers(currentUser.email),
    {
      refetchInterval: 1000,
    }
  );

  const { data: allEvents, isLoading: messagesLoading } = useQuery(
    "getEvents",
    getEvents,
    {
      refetchInterval: 1000,
    }
  );

  const today = new Date().toISOString().slice(0, 10); // Get today's date in the format "2023-02-27"
  const todaysEvents = events?.filter((event) => event.date === today) || [];
  // Filter the events to only include those with today's date

  const total = pays.reduce((acc, item) => acc + item.amount, 0);
  const handleClick = (child) => {
    const nextUser = {
      createdAt: "",
      email: "",
      id: null,
      members: null,
      otp: "",
      registeredAs: "",
      userAge: "",
      username: "",
    };
    nextUser.createdAt = child.createdAt;
    nextUser.id = child.id;
    nextUser.email = child.email;
    nextUser.members = child.members;
    nextUser.otp = child.otp;
    nextUser.registeredAs = child.registeredAs;
    nextUser.userAge = child.userAge;
    nextUser.username = child.username;
    setCurrentUser(nextUser);
  };

  const combined =
    children?.map((user) => {
      const eventsCount =
        allEvents?.filter((event) => event.student_name === user.username)
          ?.length || 0;
      return { ...user, count: eventsCount };
    }) || [];

  return (
    <>
      <div className="row">
        <div className="col-xl-4 col-sm-6 mb-4">
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
        <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
          <a href="#">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Swimmers
                      </p>
                      <h5 className="font-weight-bolder mb-0">
                        {children && children.length}
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
        <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
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
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                <DailyEvents ents={todaysEvents} l={l} er={er} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="card-body px-0 pb-2">
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12">
                <p className="p-1">
                  {combined && combined.length >= 2 ? <>Change User</> : <></>}
                </p>
                <div className="card mb-1">
                  <div className="card-header pb-0"></div>
                  <div className="card-body px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              User
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Age Group
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Status
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Classes
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Loading ? (
                            <ClipLoader />
                          ) : (
                            <>
                              {!combined ? (
                                <ClipLoader />
                              ) : (
                                <>
                                  {combined.map((child) => (
                                    <tr
                                      key={child.id}
                                      id="child"
                                      onClick={(e) => handleClick(child)}
                                    >
                                      <td>
                                        <div className="d-flex px-2 py-1">
                                          <div>
                                            <img
                                              src={`../assets/img/${child.img}`}
                                              className="avatar avatar-sm me-3"
                                              alt="user1"
                                            />
                                          </div>
                                          <div className="d-flex flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">
                                              {child.username}
                                            </h6>
                                            <p className="text-xs text-secondary mb-0">
                                              {child.email}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <p className="text-xs font-weight-bold mb-0">
                                          {child.userAge}
                                        </p>
                                      </td>
                                      <td className="align-middle text-center text-sm">
                                        {child.id == currentUser.id ? (
                                          <span className="badge badge-sm bg-gradient-success">
                                            Active
                                          </span>
                                        ) : (
                                          <span className="badge badge-sm bg-gradient-secondary">
                                            Active
                                          </span>
                                        )}
                                      </td>
                                      <td className="align-middle text-center">
                                        <span className="text-secondary text-xs font-weight-bold">
                                          {child.count}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
