import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import {
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useQuery } from "react-query";
import DailyEventTR from "./DailyEventTR";
import { AuthContext } from "../../context/authContext";
import { ClipLoader } from "react-spinners";

const getMessages = async () => {
  const response = await makeRequest.get("/events/getEvents");
  return response.data;
};

const getUsers = async (email) => {
  const response = await makeRequest.get("/users/getMyChildren/" + email);
  return response.data;
};

const AllEvents = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(currentUser.username);

  const { data: dtAll, isLoading: eventsLoading } = useQuery(
    "events",
    getMessages,
    {
      refetchInterval: 1000,
    }
  );

  const { data: children, isLoading: Loading } = useQuery(
    ["getMyChildren", currentUser.email],
    () => getUsers(currentUser.email),
    {
      refetchInterval: 1000,
    }
  );

  const filteredEvents =
    dtAll && Array.isArray(dtAll)
      ? dtAll.filter((event) => {
          return event.student_name === (selectedUser || currentUser.username);
        })
      : [];

  const eventsByDate = Object.values(
    filteredEvents.reduce((acc, event) => {
      const date = event.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {})
  ).map((eventList) =>
    eventList.sort((a, b) => {
      return (
        new Date(`1970-01-01T${a.startTime}`) -
        new Date(`1970-01-01T${b.startTime}`)
      );
    })
  );

  const myfilteredData = eventsByDate
    .sort((a, b) => {
      const dateA = new Date(`${a[0].date}T${a[0].startTime}`);
      const dateB = new Date(`${b[0].date}T${b[0].startTime}`);
      return dateA - dateB;
    })
    .flat();
  return (
    <div className="card mt-2">
      <div className="card-header">
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Select Swimmer</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={(event) => setSelectedUser(event.target.value)}
          >
            <option value={""}>--Select Swimmer--</option>
            {children && children ? (
              children.map((child) => (
                <option value={child.username} key={child.id}>
                  {child.username}
                </option>
              ))
            ) : (
              <ClipLoader />
            )}
          </select>
        </div>
      </div>
      <div className="card-body px-0">
        <div className="table-responsive">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Event ID
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Trainer
                </th>

                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Students
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {eventsLoading ? (
                <ClipLoader />
              ) : (
                myfilteredData.map((event) => (
                  <DailyEventTR event={event} key={event.id} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
